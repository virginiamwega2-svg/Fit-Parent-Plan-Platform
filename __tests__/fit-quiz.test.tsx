import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { FitQuiz } from "@/components/ui/fit-quiz";

describe("FitQuiz", () => {
  test("shows first question on load", () => {
    render(<FitQuiz />);
    expect(
      screen.getByText(/how many days a week can you realistically commit/i)
    ).toBeInTheDocument();
  });

  test("shows question counter", () => {
    render(<FitQuiz />);
    expect(screen.getByLabelText("Question 1 of 3")).toBeInTheDocument();
  });

  test("advances to question 2 after answering question 1", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "3 days" }));
    expect(screen.getByText(/what matters most/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Question 2 of 3")).toBeInTheDocument();
  });

  test("advances to question 3 after answering question 2", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "3 days" }));
    await user.click(screen.getByRole("button", { name: "Lose fat" }));
    expect(screen.getByText(/what's stopped you before/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Question 3 of 3")).toBeInTheDocument();
  });

  test("shows result after all 3 answers", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "3 days" }));
    await user.click(screen.getByRole("button", { name: "Lose fat" }));
    await user.click(screen.getByRole("button", { name: "Not enough time" }));
    expect(screen.getByText(/sounds like a strong fit/i)).toBeInTheDocument();
  });

  test("result copy changes based on days answer — 1-2 days", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "1–2 days" }));
    await user.click(screen.getByRole("button", { name: "Lose fat" }));
    await user.click(screen.getByRole("button", { name: "Not enough time" }));
    expect(screen.getByText(/we can work with 2 days/i)).toBeInTheDocument();
  });

  test("result copy changes based on goal — build strength", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "3 days" }));
    await user.click(screen.getByRole("button", { name: "Build strength" }));
    await user.click(screen.getByRole("button", { name: "Not enough time" }));
    expect(screen.getByText(/strength is the foundation/i)).toBeInTheDocument();
  });

  test("result copy changes based on blocker — starting over", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "3 days" }));
    await user.click(screen.getByRole("button", { name: "Lose fat" }));
    await user.click(screen.getByRole("button", { name: "Starting over after a bad week" }));
    expect(screen.getByText(/restart cycle/i)).toBeInTheDocument();
  });

  test("result shows form prompt", async () => {
    const user = userEvent.setup();
    render(<FitQuiz />);
    await user.click(screen.getByRole("button", { name: "3 days" }));
    await user.click(screen.getByRole("button", { name: "More energy" }));
    await user.click(screen.getByRole("button", { name: "No plan that fit my life" }));
    expect(screen.getByText(/fill in the form below/i)).toBeInTheDocument();
  });
});
