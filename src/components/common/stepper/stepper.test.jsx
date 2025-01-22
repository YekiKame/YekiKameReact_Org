import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Provider } from "react-redux";
import Stepper from "./stepper";
import { setStepIfValid } from "../../../redux/slices/createEventSlice";

vi.mock("../../../redux/slices/createEventSlice", () => ({
  setStepIfValid: vi.fn(),
}));

const mockStore = {
  getState: () => ({ createEvent: { currentStep: 1 } }),
  subscribe: () => {},
  dispatch: vi.fn(),
};

describe("Stepper Component", () => {
  const renderWithRedux = (component) => {
    return render(<Provider store={mockStore}>{component}</Provider>);
  };

  it("renders all steps", () => {
    renderWithRedux(<Stepper currentStep={1} />);

    const steps = [
      "مشخصات پایه رویداد",
      "زمان‌بندی",
      "مکان و آدرس",
      "جزئیات تکمیلی",
      "تایید و ارسال",
    ];

    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it("dispatches setStepIfValid when a previous step is clicked", () => {
    renderWithRedux(<Stepper currentStep={3} />);

    const firstStep = screen.getByText("مشخصات پایه رویداد");
    fireEvent.click(firstStep);

    expect(setStepIfValid).toHaveBeenCalledWith(1);
  });

  it("prevents jumping to a future step", () => {
    renderWithRedux(<Stepper currentStep={2} />);

    const futureStep = screen.getByText("جزئیات تکمیلی");
    fireEvent.click(futureStep);

    expect(setStepIfValid).not.toHaveBeenCalled();
  });
});

