import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import { generatePlan, parsePlan } from "./adapter";
import { aiConfig, estimateCostUsd, hasApiKey } from "./config";
import { COACH_AGENT_SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { coachTools, runCoachTool } from "./tools";
import type { CheckIn, PlanResult } from "./types";

let cachedClient: Anthropic | null = null;
function getClient() {
  if (!cachedClient) {
    cachedClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return cachedClient;
}

/**
 * The "Plan my window" coach as a real tool-calling agent: it queries an
 * exercise library, checks the time of day, and does its timing maths via
 * tools before returning the plan — instead of a single one-shot completion.
 *
 * Degrades in three tiers so the demo never breaks:
 *   tool-calling loop  →  single-shot generatePlan()  →  mock plan
 * Any failure (no key, API error, parse failure, step-limit) falls through to
 * the next tier. The other AI skills (workout/adapt/pantry) are unchanged.
 */
export async function generatePlanWithTools(checkin: CheckIn): Promise<PlanResult> {
  const start = Date.now();

  // No key locally/in preview → the single-shot path already mocks cleanly.
  if (!hasApiKey()) {
    return generatePlan(checkin);
  }

  try {
    const client = getClient();
    const messages: Anthropic.MessageParam[] = [
      { role: "user", content: buildUserPrompt(checkin.text, checkin.minutesAvailable) },
    ];
    const toolsUsed: string[] = [];
    let inputTokens = 0;
    let outputTokens = 0;

    for (let step = 0; step < aiConfig.agentMaxSteps; step++) {
      const response = await client.messages.create({
        model: aiConfig.model,
        max_tokens: aiConfig.agentMaxTokens,
        system: COACH_AGENT_SYSTEM_PROMPT,
        tools: coachTools,
        messages,
      });
      inputTokens += response.usage.input_tokens;
      outputTokens += response.usage.output_tokens;

      if (response.stop_reason === "tool_use") {
        const toolResults: Anthropic.ToolResultBlockParam[] = [];
        for (const block of response.content) {
          if (block.type === "tool_use") {
            toolsUsed.push(block.name);
            const result = runCoachTool(block.name, block.input);
            toolResults.push({
              type: "tool_result",
              tool_use_id: block.id,
              content: JSON.stringify(result),
            });
          }
        }
        // Echo the assistant turn (with its tool_use blocks) then the results.
        messages.push({ role: "assistant", content: response.content });
        messages.push({ role: "user", content: toolResults });
        continue;
      }

      // Terminal turn — extract the JSON plan from the final text block.
      const textBlock = response.content.find((b) => b.type === "text");
      const raw = textBlock && "text" in textBlock ? textBlock.text : "";
      const plan = parsePlan(raw); // throws on malformed JSON → caught below
      return {
        plan,
        source: "live",
        inputTokens,
        outputTokens,
        costUsd: estimateCostUsd(inputTokens, outputTokens),
        latencyMs: Date.now() - start,
        toolsUsed: [...new Set(toolsUsed)],
      };
    }

    // Ran out of tool-call rounds without a final plan — degrade gracefully.
    console.warn("Coach agent hit step limit without a plan; falling back to single-shot.");
    return generatePlan(checkin);
  } catch (err) {
    console.warn("Coach agent failed, falling back to single-shot:", err);
    return generatePlan(checkin);
  }
}
