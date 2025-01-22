import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  let onPageChangeMock;

  beforeEach(() => {
    onPageChangeMock = vi.fn();
  });

  it("renders the correct number of page links", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />);
    const pageLinks = screen.getAllByRole("link");
    expect(pageLinks).toHaveLength(5);
  });

//   it("applies the current page style to the active page link", () => {
//     render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
//     const activePage = screen.getByText("3");
//     expect(activePage).toHaveClass(expect.stringContaining("page-link--current"));
//   });

  it("calls onPageChange with the correct page when a page link is clicked", async () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />);
    const pageLink = screen.getByText("3");
    await userEvent.click(pageLink);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with the correct page when the next button is clicked", async () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />);
    const nextButton = screen.getAllByRole("button")[1]; // Assuming the second button is "Next"
    await userEvent.click(nextButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with the correct page when the previous button is clicked", async () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChangeMock} />);
    const prevButton = screen.getAllByRole("button")[0]; // Assuming the first button is "Previous"
    await userEvent.click(prevButton);
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it("does not call onPageChange if the next button is clicked on the last page", async () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChangeMock} />);
    const nextButton = screen.getAllByRole("button")[1];
    await userEvent.click(nextButton);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  it("does not call onPageChange if the previous button is clicked on the first page", async () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />);
    const prevButton = screen.getAllByRole("button")[0];
    await userEvent.click(prevButton);
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
