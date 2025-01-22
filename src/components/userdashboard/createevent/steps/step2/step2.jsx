import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice.js";
import Stepper from "../../../../common/stepper/stepper.jsx";
import { Navigate } from "react-router-dom"; // اگر بخواهید ریدایرکت کنید

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

import styles from "./step2.module.css";

const Step2 = () => {
  // ابتدا می‌گیریم کل استیت اسلایس createEvent
  const createEventState = useSelector((state) => state.createEvent);

  // اگر به دلایلی اسلایس پاک شده است:
  if (!createEventState) {
    return <p>اطلاعات ساخت رویداد در دسترس نیست!</p>;
    // یا می‌توانید return <Navigate to="/dashboard/create-event" />;
  }

  const { currentStep, formData } = createEventState;
  const dispatch = useDispatch();

  // اگر ترجیح می‌دهید کاربر حتماً از Step1 عبور کرده باشد،
  // بررسی کنید اگر currentStep < 2، ریدایرکت کنید یا پیغامی بدهید:
  // if (currentStep < 2) {
  //   return <Navigate to="/dashboard/create-event/step1" />;
  // }

  /**
   * اگر استرینگ ورودی (ایزویی) نامعتبر باشد یا خالی، null برمی‌گردانیم تا DatePicker کرش نکند.
   */
  const parseToDateObject = (isoString) => {
    if (!isoString) return null;
    try {
      const dateObj = new DateObject({
        date: isoString,
        calendar: persian,
        locale: persian_fa,
      });
      return dateObj.isValid ? dateObj : null;
    } catch (error) {
      console.warn("Error parsing date to DateObject:", isoString, error);
      return null;
    }
  };

  /**
   * تبدیل DateObject شمسی به فرمت ایزویی
   */
  const toIsoString = (val) => {
    if (!val) return "";
    return val.toDate().toISOString();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      startDateTime: parseToDateObject(formData.startDate),
      endDateTime: parseToDateObject(formData.endDate),
      registrationStartDateTime: parseToDateObject(formData.registrationStartDate),
      registrationEndDateTime: parseToDateObject(formData.registrationEndDate),
    },
    validationSchema: Yup.object({
      startDateTime: Yup.mixed().required("تاریخ و زمان شروع رویداد الزامی است"),
      endDateTime: Yup.mixed().required("تاریخ و زمان پایان رویداد الزامی است"),
      registrationStartDateTime: Yup.mixed().required(
        "تاریخ و زمان شروع ثبت‌نام الزامی است"
      ),
      registrationEndDateTime: Yup.mixed().required(
        "تاریخ و زمان پایان ثبت‌نام الزامی است"
      ),
    }),
    onSubmit: (values) => {
      const updatedData = {
        startDate: toIsoString(values.startDateTime),
        endDate: toIsoString(values.endDateTime),
        registrationStartDate: toIsoString(values.registrationStartDateTime),
        registrationEndDate: toIsoString(values.registrationEndDateTime),
      };
      dispatch(updateFormData(updatedData));
      console.log("Form Submitted (Step2):", updatedData);
    },
  });

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>زمان‌بندی رویداد</h2>

      <form id="step2Form" onSubmit={formik.handleSubmit}>
        {/* تاریخ و زمان شروع رویداد */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ و زمان شروع رویداد:</label>
            <DatePicker
              value={
                formik.values.startDateTime instanceof DateObject &&
                formik.values.startDateTime.isValid
                  ? formik.values.startDateTime
                  : null
              }
              onChange={(val) => formik.setFieldValue("startDateTime", val)}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD HH:mm"
              plugins={[<TimePicker position="bottom" />]}
              placeholder="انتخاب تاریخ و زمان"
            />
            {formik.touched.startDateTime && formik.errors.startDateTime ? (
              <div className={styles.error}>{formik.errors.startDateTime}</div>
            ) : null}
          </div>
        </div>

        {/* تاریخ و زمان پایان رویداد */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ و زمان پایان رویداد:</label>
            <DatePicker
              value={
                formik.values.endDateTime instanceof DateObject &&
                formik.values.endDateTime.isValid
                  ? formik.values.endDateTime
                  : null
              }
              onChange={(val) => formik.setFieldValue("endDateTime", val)}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD HH:mm"
              plugins={[<TimePicker position="bottom" />]}
              placeholder="انتخاب تاریخ و زمان"
            />
            {formik.touched.endDateTime && formik.errors.endDateTime ? (
              <div className={styles.error}>{formik.errors.endDateTime}</div>
            ) : null}
          </div>
        </div>

        {/* تاریخ و زمان شروع ثبت‌نام */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ و زمان شروع ثبت‌نام:</label>
            <DatePicker
              value={
                formik.values.registrationStartDateTime instanceof DateObject &&
                formik.values.registrationStartDateTime.isValid
                  ? formik.values.registrationStartDateTime
                  : null
              }
              onChange={(val) =>
                formik.setFieldValue("registrationStartDateTime", val)
              }
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD HH:mm"
              plugins={[<TimePicker position="bottom" />]}
              placeholder="انتخاب تاریخ و زمان"
            />
            {formik.touched.registrationStartDateTime &&
            formik.errors.registrationStartDateTime ? (
              <div className={styles.error}>
                {formik.errors.registrationStartDateTime}
              </div>
            ) : null}
          </div>
        </div>

        {/* تاریخ و زمان پایان ثبت‌نام */}
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>تاریخ و زمان پایان ثبت‌نام:</label>
            <DatePicker
              value={
                formik.values.registrationEndDateTime instanceof DateObject &&
                formik.values.registrationEndDateTime.isValid
                  ? formik.values.registrationEndDateTime
                  : null
              }
              onChange={(val) =>
                formik.setFieldValue("registrationEndDateTime", val)
              }
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD HH:mm"
              plugins={[<TimePicker position="bottom" />]}
              placeholder="انتخاب تاریخ و زمان"
            />
            {formik.touched.registrationEndDateTime &&
            formik.errors.registrationEndDateTime ? (
              <div className={styles.error}>
                {formik.errors.registrationEndDateTime}
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step2;
