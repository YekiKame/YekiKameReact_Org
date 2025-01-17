import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice.js";
import Stepper from "../../../../common/stepper/stepper.jsx";

import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";

import styles from "./step2.module.css";

const Step2 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();
  const parseToDateObject = (isoString) => {
    if (!isoString) return null;
    return new DateObject({
      date: isoString,
      calendar: persian,
      locale: persian_fa,
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      startDateTime: parseToDateObject(initialFormData.startDate),
      endDateTime: parseToDateObject(initialFormData.endDate),
      registrationStartDateTime: parseToDateObject(initialFormData.registrationStartDate),
      registrationEndDateTime: parseToDateObject(initialFormData.registrationEndDate),
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
      // اینجا هر کدام را به استرینگ ISO تبدیل کرده و در کلیدهای
      // formData: { startDate, endDate, registrationStartDate, registrationEndDate }
      // ذخیره می‌کنیم.

      const toIsoString = (val) => {
        if (!val) return "";
        // val از نوع DateObject
        return val.toDate().toISOString(); 
      };

      const updatedData = {
        startDate: toIsoString(values.startDateTime),
        endDate: toIsoString(values.endDateTime),
        registrationStartDate: toIsoString(values.registrationStartDateTime),
        registrationEndDate: toIsoString(values.registrationEndDateTime),
      };

      dispatch(updateFormData(updatedData));
      console.log("Step2 => updatedData:", updatedData);
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
              value={formik.values.startDateTime}
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
              value={formik.values.endDateTime}
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
              value={formik.values.registrationStartDateTime}
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
              value={formik.values.registrationEndDateTime}
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
