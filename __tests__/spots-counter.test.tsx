import { render, screen, act } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { SpotsCounter } from "@/components/ui/spots-counter";

describe("SpotsCounter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("shows initial spot count of 8", () => {
    render(<SpotsCounter />);
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  test("shows 'spots open this month' label", () => {
    render(<SpotsCounter />);
    expect(screen.getByText(/spots open this month/i)).toBeInTheDocument();
  });

  test("decrements to 6 after 2.4s", async () => {
    vi.useFakeTimers();
    render(<SpotsCounter />);
    expect(screen.getByText("8")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  test("does not decrement before 2.4s", async () => {
    vi.useFakeTimers();
    render(<SpotsCounter />);
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  test("shows a last-claimed label", () => {
    render(<SpotsCounter />);
    const labels = [
      "James claimed one 3h ago",
      "Sarah claimed one yesterday",
      "Linda claimed one 6h ago",
    ];
    const found = labels.some((label) => screen.queryByText(label));
    expect(found).toBe(true);
  });
});
