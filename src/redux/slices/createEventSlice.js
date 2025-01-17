import { createSlice } from "@reduxjs/toolkit";

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

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 5);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },
    updateFormData: (state, action) => {
      // عمل ذخیره در formData
      state.formData = { ...state.formData, ...action.payload };
    },

    // اگر مرحله‌ای خواستید به صورت دلخواه بپرید (با validateSteps)
    setStepIfValid: (state, action) => {
      const desiredStep = action.payload;

      const validateSteps = (stepNum, formData) => {
        // گام 1
        if (stepNum >= 1) {
          if (!formData.title || !formData.eventCategory || !formData.aboutEvent) {
            return false;
          }
        }
        // گام 2: تاریخ شروع/پایان
        if (stepNum >= 2) {
          if (!formData.startDate || !formData.endDate) {
            return false;
          }
        }
        // گام 3: ... 
        if (stepNum >= 3) {
          if (!formData.province || !formData.city || !formData.postalAddress) {
            return false;
          }
        }
        // گام 4:
        if (stepNum >= 4) {
          if (!formData.maxSubscribers) {
            return false;
          }
        }
        return true;
      };

      for (let i = 1; i < desiredStep; i++) {
        if (!validateSteps(i, state.formData)) {
          return;
        }
      }
      state.currentStep = desiredStep;
    },
  },
});

export const { nextStep, prevStep, updateFormData, setStepIfValid } =
  createEventSlice.actions;
export default createEventSlice.reducer;
