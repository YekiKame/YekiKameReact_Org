import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice";
import Stepper from "../../../../common/stepper/stepper.jsx";
import styles from "./step2.module.css";

// (۱) تابع تمثیلی: تبدیل تاریخ شمسی به "YYYY-MM-DD"
const convertShamsiToGregorian = (shamsiDate) => {
  if (!shamsiDate) return "";
  // TODO: پیاده‌سازی تبدیل واقعی با کتابخانه یا منطق شمسی
  return "2024-12-24"; // نمونه
};

// (۲) تبدیل اعداد فارسی در زمان به انگلیسی (مثلاً "۱۰:۳۰" -> "10:30")
const convertPersianNumbersToEnglish = (input) => {
  if (!input) return "";
  const persianNumbers = [ /۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g ];
  const englishNumbers = [ "0","1","2","3","4","5","6","7","8","9" ];
  let str = input;
  for (let i = 0; i < 10; i++) {
    str = str.replace(persianNumbers[i], englishNumbers[i]);
  }
  return str;
};

// (۳) ترکیب تاریخ و زمان در فرمت ISO8601: "YYYY-MM-DDTHH:mm:00+00:00"
const toIsoString = (dateStr, timeStr) => {
  if (!dateStr) return "";
  const safeTime = timeStr || "00:00"; 
  // خروجی: "2024-12-24T10:30:00+00:00"
  return dateStr + "T" + safeTime + ":00+00:00";
};

const Step2 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
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
      registrationStartDate: Yup.string().required("تاریخ شروع ثبت‌نام الزامی است"),
      registrationEndDate: Yup.string().required("تاریخ پایان ثبت‌نام الزامی است"),
    }),
    onSubmit: (values) => {
      // (۱) تاریخ شمسی -> میلادی ساده:
      const sd = convertShamsiToGregorian(values.startDate); // "2024-12-24"
      const ed = convertShamsiToGregorian(values.endDate);
      const rsd = values.registrationStartDate
        ? convertShamsiToGregorian(values.registrationStartDate)
        : null;
      const red = values.registrationEndDate
        ? convertShamsiToGregorian(values.registrationEndDate)
        : null;

      // (۲) اعداد فارسی در زمان -> انگلیسی
      const st = convertPersianNumbersToEnglish(values.startTime); // "10:30"
      const et = convertPersianNumbersToEnglish(values.endTime);

      // (۳) تولید رشته‌ی ISO
      const finalStart = sd ? toIsoString(sd, st) : null; 
      const finalEnd = ed ? toIsoString(ed, et) : null;
      const finalRegStart = rsd ? toIsoString(rsd, "00:00") : null;
      const finalRegEnd = red ? toIsoString(red, "00:00") : null;

      // (۴) درج در Redux: هم ساعت خام را نگه می‌داریم (برای نمایش مجدد)، هم تاریخ ISO را
      const fixedValues = {
        // برای نمایش در فرم (مواقعی که کاربر برگردد)
        startTime: st,
        endTime: et,

        // برای سرور
        startDate: finalStart, 
        endDate: finalEnd,
        registrationStartDate: finalRegStart,
        registrationEndDate: finalRegEnd,
      };

      dispatch(updateFormData(fixedValues));
      console.log("Form Submitted (Step2):", fixedValues);
    },
  });

  // نمایش تقویم شمسی
  const handleDateFocus = (fieldId) => {
    if (!window.HaDateTimePicker) return;
    const dp = new window.HaDateTimePicker(fieldId, {
      isSolar: true,
      resultInSolar: true,
      forceSetTime: false,
      resultFormat: "{year}/{month}/{day}",
    });
    dp.show();
  };

  // نمایش انتخاب ساعت
  const handleTimeFocus = (fieldId) => {
    if (!window.HaDateTimePicker) return;
    const dp = new window.HaDateTimePicker(fieldId, {
      isSolar: true,
      resultInSolar: true,
      disableTime: false,
      resultFormat: "{t?{hour}:{minute} {ampm}}",
    });
    dp.show();
  };

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>زمان‌بندی</h2>

      <form id="step2Form" onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ شروع رویداد:</label>
            <input
              type="text"
              id="startDateField"
              name="startDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startDate}
              onFocus={() => handleDateFocus("#startDateField")}
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
              id="startTimeField"
              name="startTime"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.startTime}
              onFocus={() => handleTimeFocus("#startTimeField")}
              placeholder="مثلاً ۱۰:۳۰"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ پایان رویداد:</label>
            <input
              type="text"
              id="endDateField"
              name="endDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endDate}
              onFocus={() => handleDateFocus("#endDateField")}
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
              id="endTimeField"
              name="endTime"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endTime}
              onFocus={() => handleTimeFocus("#endTimeField")}
              placeholder="مثلاً ۱۸:۰۰"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ شروع ثبت‌نام (اختیاری):</label>
            <input
              type="text"
              id="regStartDateField"
              name="registrationStartDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationStartDate}
              onFocus={() => handleDateFocus("#regStartDateField")}
              placeholder="مثلاً ۱۴۰۲/۱۰/۰۱"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ پایان ثبت‌نام (اختیاری):</label>
            <input
              type="text"
              id="regEndDateField"
              name="registrationEndDate"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.registrationEndDate}
              onFocus={() => handleDateFocus("#regEndDateField")}
              placeholder="مثلاً ۱۴۰۲/۱۰/۰۲"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
