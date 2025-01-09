import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice";
import Stepper from "../../../../common/stepper/stepper.jsx";
import styles from "./step3.module.css";

// تابع کمکی برای یکسان‌سازی برخی حروف عربی به فارسی
const normalizePersianChars = (str = "") => {
  return str
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .trim();
};

const Step3 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();

  // برای گرفتن لیست استان‌ها و شهرها
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // واکشی استان‌ها:
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("https://iran-locations-api.ir/api/v1/fa/states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  // هروقت مقدار استان عوض شد، شهرهای مرتبط را واکشی کنیم
  const fetchCitiesByState = async (stateName) => {
    try {
      const url = `https://iran-locations-api.ir/api/v1/fa/cities?state=${encodeURIComponent(
        stateName
      )}`;
      const res = await fetch(url);
      const data = await res.json();
      setCities(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      province: initialFormData.province || "",
      city: initialFormData.city || "",
      neighborhood: initialFormData.neighborhood || "",
      postalCode: initialFormData.postalCode || "",
      postalAddress: initialFormData.postalAddress || "",
    },
    validationSchema: Yup.object({
      province: Yup.string().required("استان محل رویداد الزامی است"),
      city: Yup.string().required("شهر محل رویداد الزامی است"),
      postalCode: Yup.string().matches(
        /^[0-9]{10}$/,
        "کد پستی باید ۱۰ رقم باشد"
      ), // اختیاری
      postalAddress: Yup.string().required("آدرس پستی الزامی است"),
      neighborhood: Yup.string().matches(
        /^[آ-ی\s]+$/,
        "نام محله باید فارسی باشد"
      ),
    }),
    onSubmit: (values) => {
      dispatch(updateFormData(values));
      console.log("Form Submitted (Step3):", values);
    },
  });

  // وقتی province عوض شد:
  useEffect(() => {
    const normalizedProvince = normalizePersianChars(formik.values.province);
    if (normalizedProvince) {
      fetchCitiesByState(normalizedProvince);
    } else {
      setCities([]);
    }
    // eslint-disable-next-line
  }, [formik.values.province]);

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>مکان و آدرس</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>استان محل رویداد:</label>
            <select
              name="province"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.province}
            >
              <option value="">انتخاب کنید</option>
              {states.map((st) => (
                <option key={st.id} value={st.name}>
                  {st.name}
                </option>
              ))}
            </select>
            {formik.touched.province && formik.errors.province ? (
              <div className={styles.error}>{formik.errors.province}</div>
            ) : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>شهر محل رویداد:</label>
            <select
              name="city"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            >
              <option value="">ابتدا استان را انتخاب کنید</option>
              {cities.map((ct) => (
                <option key={ct.id} value={ct.name}>
                  {ct.name}
                </option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city ? (
              <div className={styles.error}>{formik.errors.city}</div>
            ) : null}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>محله:</label>
            <input
              type="text"
              name="neighborhood"
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.neighborhood}
            />
            {formik.touched.neighborhood && formik.errors.neighborhood ? (
              <div className={styles.error}>{formik.errors.neighborhood}</div>
            ) : null}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>کد پستی (اختیاری):</label>
            <input
              type="text"
              name="postalCode"
              placeholder={"مثلاً 1234567890"}
              className={styles.input}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postalCode}
              style={{ direction: "ltr" }}
            />
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <div className={styles.error}>{formik.errors.postalCode}</div>
            ) : null}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.fieldFull}>
            <label className={styles.label}>آدرس پستی:</label>
            <textarea
              name="postalAddress"
              placeholder={"آدرس دقیق محل رویداد را وارد کنید:"}
              className={styles.textarea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postalAddress}
            />
            {formik.touched.postalAddress && formik.errors.postalAddress ? (
              <div className={styles.error}>{formik.errors.postalAddress}</div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step3;
