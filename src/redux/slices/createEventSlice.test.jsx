import React from 'react';
import { describe, it, expect } from "vitest";
import createEventReducer, {
  nextStep,
  prevStep,
  updateFormData,
  setStepIfValid,
} from "./createEventSlice";

describe("createEventSlice", () => {
  const initialState = {
    currentStep: 1,
    formData: {
      title: "",
      eventCategory: "",
      aboutEvent: "",
      startDate: "",
      endDate: "",
      province: "",
      city: "",
      neighborhood: "",
      postalAddress: "",
      postalCode: "",
      registrationStartDate: "",
      registrationEndDate: "",
      maxSubscribers: "",
      image: null,
      fullDescription: "",
    },
  };

  it("should handle nextStep", () => {
    const state = createEventReducer(initialState, nextStep());
    expect(state.currentStep).toBe(2);
  });

  it("should not exceed step 5 in nextStep", () => {
    const state = createEventReducer({ ...initialState, currentStep: 5 }, nextStep());
    expect(state.currentStep).toBe(5);
  });

  it("should handle prevStep", () => {
    const state = createEventReducer({ ...initialState, currentStep: 3 }, prevStep());
    expect(state.currentStep).toBe(2);
  });

  it("should not go below step 1 in prevStep", () => {
    const state = createEventReducer(initialState, prevStep());
    expect(state.currentStep).toBe(1);
  });

  it("should handle updateFormData", () => {
    const payload = { title: "Test Event", eventCategory: "Workshop" };
    const state = createEventReducer(initialState, updateFormData(payload));
    expect(state.formData.title).toBe("Test Event");
    expect(state.formData.eventCategory).toBe("Workshop");
  });

  it("should handle setStepIfValid with valid data", () => {
    const validState = {
      ...initialState,
      formData: {
        ...initialState.formData,
        title: "Valid Title",
        eventCategory: "Category",
        aboutEvent: "Description",
        startDate: "2025-01-01",
        endDate: "2025-01-02",
        province: "Province",
        city: "City",
        postalAddress: "Address",
        maxSubscribers: "100",
      },
    };
    const state = createEventReducer(validState, setStepIfValid(4));
    expect(state.currentStep).toBe(4);
  });

  it("should not change step in setStepIfValid with invalid data", () => {
    const invalidState = {
      ...initialState,
      formData: {
        ...initialState.formData,
        title: "Valid Title",
        eventCategory: "",
        aboutEvent: "Description",
      },
    };
    const state = createEventReducer(invalidState, setStepIfValid(2));
    expect(state.currentStep).toBe(1); // Step should remain unchanged
  });
});
