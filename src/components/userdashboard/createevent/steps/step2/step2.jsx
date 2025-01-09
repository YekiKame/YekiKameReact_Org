import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice";
import Stepper from "../../../../common/stepper/stepper.jsx";
import styles from "./step2.module.css";

// توابع کمکی ساده و نمایشی برای تبدیل تاریخ شمسی به میلادی:
const convertShamsiToGregorian = (shamsiDate) => {
  // اینجا می‌توانید از کتابخانه JalaliMoment یا هر کتابخانه دیگر استفاده کنید
  // یا خودتان منطق تبدیل را بنویسید.
  // فعلاً برای نمونه، همان مقدار را برمی‌گردانیم یا یک تبدیل الکی:
  if (!shamsiDate) return "";
  // مثلاً "۱۴۰۲/۱۰/۰۳" -> "2024-12-24"
  return "2024-12-24"; // نمونه تمثیلی
};

// تبدیل اعداد فارسی در زمان به انگلیسی
const convertPersianNumbersToEnglish = (input) => {
  if (!input) return "";
  const persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let str = input;
  for (let i = 0; i < 10; i++) {
    str = str.replace(persianNumbers[i], englishNumbers[i]);
  }
  return str;
};

const Step2 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      startDate: initialFormData.startDate || "",
      startTime: initialFormData.startTime || "",
      endDate: initialFormData.endDate || "",
      endTime: initialFormData.endTime || "",
      registrationStartDate: initialFormData.registrationStartDate || "",
      registrationEndDate: initialFormData.registrationEndDate || "",
    },
    validationSchema: Yup.object({
      startDate: Yup.string().required("تاریخ شروع رویداد الزامی است"),
      endDate: Yup.string().required("تاریخ پایان رویداد الزامی است"),
      // startTime, endTime, registrationStartDate, registrationEndDate اختیاری هستند
    }),
    onSubmit: (values) => {
      // تبدیل تاریخ و زمان از شمسی به میلادی و فارسی به انگلیسی
      const fixedValues = {
        startDate: convertShamsiToGregorian(values.startDate),
        endDate: convertShamsiToGregorian(values.endDate),
        startTime: convertPersianNumbersToEnglish(values.startTime),
        endTime: convertPersianNumbersToEnglish(values.endTime),
        registrationStartDate: values.registrationStartDate
          ? convertShamsiToGregorian(values.registrationStartDate)
          : "",
        registrationEndDate: values.registrationEndDate
          ? convertShamsiToGregorian(values.registrationEndDate)
          : "",
      };
      dispatch(updateFormData(fixedValues));
      console.log("Form Submitted (Step2):", fixedValues);
    },
  });

  // برای باز شدن مودال انتخاب زمان/تاریخ، کافی است در onFocus فراخوانی کنیم
  const handleDateFocus = () => {
    // نمایش پاپ‌آپ یا فراخوانی کتابخانه تاریخ شمسی
    console.log("Show date picker modal (jalali)...");
  };

  const handleTimeFocus = () => {
    // نمایش پاپ‌آپ یا فراخوانی کتابخانه انتخاب زمان فارسی
    console.log("Show time picker modal (persian)...");
  };

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>زمان‌بندی</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ شروع رویداد:</label>
            <input
              type="text"
              name="startDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
              onFocus={handleDateFocus}
              placeholder="مثلاً ۱۴۰۲/۱۰/۰۳"
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <div className={styles.error}>{formik.errors.startDate}</div>
            ) : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>زمان شروع رویداد:</label>
            <input
              type="text"
              name="startTime"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              onFocus={handleTimeFocus}
              placeholder="مثلاً ۱۰:۳۰"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ پایان رویداد:</label>
            <input
              type="text"
              name="endDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
              onFocus={handleDateFocus}
              placeholder="مثلاً ۱۴۰۲/۱۰/۰۳"
            />
            {formik.touched.endDate && formik.errors.endDate ? (
              <div className={styles.error}>{formik.errors.endDate}</div>
            ) : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>زمان پایان رویداد:</label>
            <input
              type="text"
              name="endTime"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              onFocus={handleTimeFocus}
              placeholder="مثلاً ۱۸:۰۰"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>
              تاریخ شروع ثبت‌نام (اختیاری):
            </label>
            <input
              type="text"
              name="registrationStartDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationStartDate}
              onFocus={handleDateFocus}
              placeholder="مثلاً ۱۴۰۲/۱۰/۰۱"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              تاریخ پایان ثبت‌نام (اختیاری):
            </label>
            <input
              type="text"
              name="registrationEndDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationEndDate}
              onFocus={handleDateFocus}
              placeholder="مثلاً ۱۴۰۲/۱۰/۰۲"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
