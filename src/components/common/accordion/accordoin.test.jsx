import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./accordion";

describe("Accordion Component", () => {
  const mockFaqs = [
    { questionTitle: "What is React?", questionAnswer: "A JavaScript library for building user interfaces." },
    { questionTitle: "What is Vitest?", questionAnswer: "A fast unit test framework powered by Vite." },
  ];

  test("should render all accordion items with correct numbers and titles", () => {
    render(<Accordion faqs={mockFaqs} startNumber={1} />);

    // Check if all items render with correct titles and numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("What is React?")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("What is Vitest?")).toBeInTheDocument();
  });

  test("should toggle accordion item on click", () => {
    render(<Accordion faqs={mockFaqs} startNumber={1} />);

    // Select the first item
    const firstItem = screen.getByText("What is React?");
    expect(firstItem).toBeInTheDocument();

    // Initially, the answer should not be visible
    expect(screen.queryByText("A JavaScript library for building user interfaces.")).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(firstItem);
    expect(screen.getByText("A JavaScript library for building user interfaces.")).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(firstItem);
    expect(screen.queryByText("A JavaScript library for building user interfaces.")).not.toBeInTheDocument();
  });

  test("should not show multiple answers at the same time", () => {
    render(<Accordion faqs={mockFaqs} startNumber={1} />);

    // Open the first item
    fireEvent.click(screen.getByText("What is React?"));
    expect(screen.getByText("A JavaScript library for building user interfaces.")).toBeInTheDocument();

    // Open the second item
    fireEvent.click(screen.getByText("What is Vitest?"));
    expect(screen.getByText("A fast unit test framework powered by Vite.")).toBeInTheDocument();

    // Ensure the first item's answer is still visible (items open independently)
    expect(screen.getByText("A JavaScript library for building user interfaces.")).toBeInTheDocument();
  });
});
