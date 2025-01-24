import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice.js";
import Stepper from "../../../../common/stepper/stepper.jsx";
import styles from "./step4.module.css";

const Step4 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(
    initialFormData.image || null
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maxSubscribers: initialFormData.maxSubscribers || "",
      fullDescription: initialFormData.fullDescription || "",
      image: null,
    },
    validationSchema: Yup.object({
      maxSubscribers: Yup.number()
        .typeError("تعداد افراد باید عدد باشد")
        .min(1, "حداقل تعداد باید ۱ باشد")
        .required("تعداد افراد الزامی است"),
      fullDescription: Yup.string(),
    }),
    onSubmit: (values) => {
      dispatch(
        updateFormData({
          ...values,
          image: previewImage,
        })
      );
      console.log("Form Submitted (Step4):", values);
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // ذخیره فایل اصلی در Redux
      formik.setFieldValue("image", file);

      // نمایش پیش‌نمایش
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>جزئیات تکمیلی</h2>
      <form id="step4Form" onSubmit={formik.handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>حداکثر تعداد افراد رویداد:</label>
          <input
            type="number"
            name="maxSubscribers"
            placeholder={"تعداد افراد"}
            className={styles.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maxSubscribers}
          />
          {formik.touched.maxSubscribers && formik.errors.maxSubscribers ? (
            <div className={styles.error}>{formik.errors.maxSubscribers}</div>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>بارگذاری تصویر رویداد:</label>
          <div className={styles.uploadContainer}>
            <label htmlFor="imageUpload" className={styles.uploadBox}>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className={styles.previewImage}
                />
              ) : (
                <div className={styles.uploadPlaceholder}>
                  <span>بارگذاری تصویر</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <div className={styles.fieldFull}>
          <label className={styles.label}>توضیحات تکمیلی (اختیاری):</label>
          <textarea
            name="fullDescription"
            className={styles.textarea}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullDescription}
          />
          {formik.touched.fullDescription && formik.errors.fullDescription ? (
            <div className={styles.error}>{formik.errors.fullDescription}</div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Step4;
