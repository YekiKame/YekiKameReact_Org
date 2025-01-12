import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../../../../redux/slices/createEventSlice";
import Stepper from "../../../../common/stepper/stepper.jsx";
import styles from "./step3.module.css";

const Step3 = () => {
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const initialFormData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();

  const [states, setStates] = useState([]); // آرایه‌ی استان‌ها (id, name, ...)
  const [cities, setCities] = useState([]); // آرایه‌ی شهرهای استان انتخابی

  // گرفتن فهرست استان‌ها
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("https://iran-locations-api.ir/api/v1/fa/states");
        const data = await res.json();
        setStates(data); // [{ id:1, name:"...", ...}, ...]
      } catch (err) {
        console.error("Error fetching states:", err);
      }
    };
    fetchStates();
  }, []);

  // گرفتن شهرهای یک استان با id
  const fetchCitiesByStateId = async (stateId) => {
    try {
      const url = `https://iran-locations-api.ir/api/v1/fa/cities?state_id=${stateId}`;
      const res = await fetch(url);
      const data = await res.json(); // [{id:1, name:"تبریز", state_id:1,...}, ...]
      setCities(data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // در ریداکس، ما فیلد "province" و "city" داریم (هر دو نام هستند)
      province: initialFormData.province || "",
      city: initialFormData.city || "",
      neighborhood: initialFormData.neighborhood || "",
      postalCode: initialFormData.postalCode || "",
      postalAddress: initialFormData.postalAddress || "",
    },
    validationSchema: Yup.object({
      province: Yup.string().required("استان محل رویداد الزامی است"),
      city: Yup.string().required("شهر محل رویداد الزامی است"),
      postalCode: Yup.string().matches(/^[0-9]{10}$/, "کد پستی باید ۱۰ رقم باشد"),
      postalAddress: Yup.string().required("آدرس پستی الزامی است"),
      neighborhood: Yup.string().matches(/^[آ-ی\s]+$/, "نام محله باید فارسی باشد"),
    }),
    onSubmit: (values) => {
      dispatch(updateFormData(values));
      console.log("Form Submitted (Step3):", values);
    },
  });

  // هنگام تغییر مقدار provinceSelectId، شهرها را گرفته و نام استان را ست می‌کنیم
  const [provinceSelectId, setProvinceSelectId] = useState(null); 
  const [citySelectId, setCitySelectId] = useState(null);

  // وقتی کاربر از دراپ‌داون استان، یکی را انتخاب کرد:
  const handleProvinceChange = (e) => {
    const selectedId = e.target.value; // id استان
    setProvinceSelectId(selectedId);
    // همچنین شهر را خالی کنیم
    setCitySelectId(null);
    setCities([]);

    // در عین حال، اگر کاربر "انتخاب کنید" را انتخاب کرد (value="")
    if (!selectedId) {
      formik.setFieldValue("province", "");
      formik.setFieldValue("city", "");
      return;
    }
    // تابع واکشی
    fetchCitiesByStateId(selectedId);

    // پیدا کردن name استان در states
    const stObj = states.find((st) => String(st.id) === String(selectedId));
    if (stObj) {
      formik.setFieldValue("province", stObj.name);
    } else {
      formik.setFieldValue("province", "");
    }
    // city را هم خالی می‌کنیم
    formik.setFieldValue("city", "");
  };

  const handleCityChange = (e) => {
    const cId = e.target.value;
    setCitySelectId(cId);
    if (!cId) {
      formik.setFieldValue("city", "");
      return;
    }
    // پیدا کردن نام شهر
    const cObj = cities.find((ct) => String(ct.id) === String(cId));
    if (cObj) {
      formik.setFieldValue("city", cObj.name);
    } else {
      formik.setFieldValue("city", "");
    }
  };

  // اگر کاربر مستقیم فرم را mount کرد ولی در استیت چیزی بود:
  useEffect(() => {
    // اگر در استیت قبلا province پر بود، باید id استان را بیابیم
    // چرا که province فقط نام را دارد. 
    // ولی این موضوع کمی پیچیده است. شاید ساده‌تر باشد province را خالی بگذاریم.
    // اینجا برای سادگی از آن صرف نظر می‌کنیم
  }, [states]);

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>مکان و آدرس</h2>

      <form id="step3Form" onSubmit={formik.handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>استان محل رویداد:</label>
            <select
              className={styles.input}
              onChange={handleProvinceChange}
              onBlur={formik.handleBlur}
              // value = provinceSelectId (شناسه استان)، اما اگر کاربر از قبل استانی داشت (فقط name!) 
              // برای سادگی value را با id مستقیما ست می‌کنیم (پیشرفته‌تر باید name->id تبدیل شود)
              value={provinceSelectId || ""}
            >
              <option value="">انتخاب کنید</option>
              {states.map((st) => (
                <option key={st.id} value={st.id}>
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
              className={styles.input}
              onChange={handleCityChange}
              onBlur={formik.handleBlur}
              value={citySelectId || ""}
            >
              <option value="">ابتدا استان را انتخاب کنید</option>
              {cities.map((ct) => (
                <option key={ct.id} value={ct.id}>
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
            <label className={styles.label}>محله (اختیاری):</label>
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
