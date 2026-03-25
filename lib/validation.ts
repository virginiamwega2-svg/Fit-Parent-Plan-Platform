import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80, "Name is too long."),
  email: z.string().trim().email("A valid email is required.").max(120),
  password: z.string().min(8, "Password must be at least 8 characters.").max(200),
});

export const loginSchema = z.object({
  email: z.string().trim().email("A valid email is required.").max(120),
  password: z.string().min(1, "Password is required.").max(200),
});

const looseRecord = z.record(z.string(), z.unknown());

export const userStatePatchSchema = z
  .object({
    plannerDraft: looseRecord.optional(),
    groceryState: looseRecord.optional(),
    accountabilityState: looseRecord.optional(),
  })
  .refine(
    (value) =>
      value.plannerDraft !== undefined ||
      value.groceryState !== undefined ||
      value.accountabilityState !== undefined,
    { message: "At least one state field must be provided." },
  );

export const leadGoalSchema = z.enum([
  "fat-loss",
  "strength",
  "mobility",
  "energy",
]);

export const leadTimePerDaySchema = z.enum(["10", "15", "20"]);

export const leadCaptureSchema = z.object({
  name: z.string().trim().min(2, "Please provide a valid name.").max(80),
  email: z.string().trim().email("Please provide a valid email address.").max(120),
  challenge: z
    .string()
    .trim()
    .min(10, "Please share a short challenge description (10-500 characters).")
    .max(500, "Please keep your challenge summary under 500 characters."),
  goal: leadGoalSchema,
  timePerDay: leadTimePerDaySchema,
  company: z.string().trim().max(200).optional().default(""),
  formStartedAt: z.string().trim().min(1),
  turnstileToken: z.string().trim().optional().default(""),
});
