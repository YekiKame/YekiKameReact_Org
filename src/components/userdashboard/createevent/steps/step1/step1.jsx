import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFormData
} from "../../../../../redux/slices/createEventSlice.js";
import Stepper from "../../../../common/stepper/stepper.jsx";
import styles from "./step1.module.css";
import Button from "../../../../shared/button/button.jsx"; // برای دکمه انصراف

const Step1 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: initialFormData.title || "",
      eventCategory: initialFormData.eventCategory || "",
      aboutEvent: initialFormData.aboutEvent || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("عنوان رویداد الزامی است"),
      eventCategory: Yup.string().required("دسته‌بندی الزامی است"),
      aboutEvent: Yup.string()
        .required("توضیحات الزامی است")
        .max(500, "حداکثر ۵۰۰ کاراکتر مجاز است"),
    }),
    onSubmit: (values) => {
      dispatch(updateFormData(values));
      console.log("Form Submitted (Step1):", values);
    },
  });

  // برای ریست:
  const handleCancel = () => {
    formik.resetForm();
  };

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>مشخصات پایه رویداد</h2>
      <p className={styles.description}>لطفاً موارد زیر را تکمیل کنید:</p>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formfirstline}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">
              عنوان رویداد:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.input}
              placeholder="لطفاً عنوان رویداد را وارد کنید"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className={styles.error}>{formik.errors.title}</div>
            ) : null}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="eventCategory">
              دسته‌بندی:
            </label>
            <select
              id="eventCategory"
              name="eventCategory"
              className={styles.select}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventCategory}
            >
              <option value="">
                لطفاً دسته‌بندی مورد نظر خود را انتخاب کنید
              </option>
              <option value="education">آموزشی</option>
              <option value="sport">ورزشی</option>
              <option value="social">فرهنگی</option>
              <option value="entertainment">تفریحی</option>
              <option value="game">بازی</option>
            </select>
            {formik.touched.eventCategory && formik.errors.eventCategory ? (
              <div className={styles.error}>{formik.errors.eventCategory}</div>
            ) : null}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="aboutEvent">
            توضیحات:
          </label>
          <textarea
            id="aboutEvent"
            name="aboutEvent"
            className={styles.textarea}
            placeholder="برای رویداد خود توضیحاتی بنویسید"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.aboutEvent}
          />
          {formik.touched.aboutEvent && formik.errors.aboutEvent ? (
            <div className={styles.error}>{formik.errors.aboutEvent}</div>
          ) : null}
        </div>

        {/* دکمه انصراف */}
        <Button
          text="انصراف"
          variant="outline"
          onClick={handleCancel}
          style={{ marginTop: "16px" }}
        />
      </form>
    </div>
  );
};

export default Step1;
