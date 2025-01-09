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

    // مرحله جدید: تعیین مرحله فعلی به شرط تکمیل مراحل قبلی
    setStepIfValid: (state, action) => {
      const desiredStep = action.payload;

      // تابع کمکی ساده برای چک‌کردن حداقل‌ها تا مرحله X
      const validateSteps = (stepNum, formData) => {
        // اینجا فقط به شکل ساده چک می‌کنیم فیلدهای ضروری هر مرحله پر باشند:
        // گام 1: title, eventCategory, aboutEvent
        if (stepNum >= 1) {
          if (!formData.title || !formData.eventCategory || !formData.aboutEvent) {
            return false;
          }
        }
        // گام 2: startDate, endDate (فیلدهای اجباری)
        if (stepNum >= 2) {
          if (!formData.startDate || !formData.endDate) {
            return false;
          }
        }
        // گام 3: province, city, postalAddress (بر اساس درخواست، کدپستی حذف الزام)
        if (stepNum >= 3) {
          if (!formData.province || !formData.city || !formData.postalAddress) {
            return false;
          }
        }
        // گام 4: maxSubscribers (fullDescription دیگر اجباری نیست)
        if (stepNum >= 4) {
          if (!formData.maxSubscribers) {
            return false;
          }
        }
        // اگر به اینجا برسیم یعنی مراحل قبل درست بوده
        return true;
      };

      // ابتدا بررسی می‌کنیم که آیا مراحل قبل از desiredStep معتبر هستند یا خیر
      // برای مثال اگر desiredStep=3 است، باید مرحله 1 و 2 پر شده باشند
      for (let i = 1; i < desiredStep; i++) {
        if (!validateSteps(i, state.formData)) {
          return; // اگر یکی از مراحل قبلی ناقص بود، کاری نکن
        }
      }
      // اگر اوکی بود، برو به desiredStep
      state.currentStep = desiredStep;
    },
  },
});

export const { nextStep, prevStep, updateFormData, setStepIfValid } =
  createEventSlice.actions;
export default createEventSlice.reducer;
