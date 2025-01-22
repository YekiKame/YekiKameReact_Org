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
      state.formData = { ...state.formData, ...action.payload };
    },

    setStepIfValid: (state, action) => {
      const desiredStep = action.payload;

      /**
       * چک می‌کنیم در هر گام، کدام فیلدهای ضروری باید پر باشند.
       */
      const validateSteps = (stepNum, formData) => {
        // گام 1: title, eventCategory, aboutEvent
        if (stepNum >= 1) {
          if (!formData.title || !formData.eventCategory || !formData.aboutEvent) {
            return false;
          }
        }
        // گام 2: startDate, endDate, registrationStartDate, registrationEndDate
        if (stepNum >= 2) {
          if (
            !formData.startDate ||
            !formData.endDate ||
            !formData.registrationStartDate ||
            !formData.registrationEndDate
          ) {
            return false;
          }
        }
        // گام 3: province, city, postalAddress
        if (stepNum >= 3) {
          if (!formData.province || !formData.city || !formData.postalAddress) {
            return false;
          }
        }
        // گام 4: maxSubscribers (الزامی)
        if (stepNum >= 4) {
          if (!formData.maxSubscribers) {
            return false;
          }
        }
        return true;
      };

      // مثلاً اگر می‌خواهیم به step=3 برویم،
      // باید step=1 و step=2 معتبر باشند.
      for (let i = 1; i < desiredStep; i++) {
        if (!validateSteps(i, state.formData)) {
          return; // اجازه نمیدهیم گام عوض شود
        }
      }
      state.currentStep = desiredStep;
    },
  },
});

export const { nextStep, prevStep, updateFormData, setStepIfValid } =
  createEventSlice.actions;
export default createEventSlice.reducer;
