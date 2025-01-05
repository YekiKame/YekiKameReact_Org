// step5.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { prevStep } from "../../../../../redux/slices/createEventSlice.js";
import axios from "axios";
import styles from "./step5.module.css";
import Stepper from "../../../../common/stepper/stepper.jsx"; // نمایش استپر

const Step5 = () => {
  const formData = useSelector((state) => state.createEvent.formData);
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const dispatch = useDispatch();

  // تلفن صاحب رویداد، مثلاً از sessionStorage:
  const eventOwnerPhone = sessionStorage.getItem("userPhone") || "09123456789";

  const handleSubmit = async () => {
    // بر اساس مستندات جدید:
    // اگر از آپلود اسکالر واقعی استفاده کنید، باید با فرستادن فایل در قالب FormData باشد.
    // اینجا ما فقط شکل نمونه را نشان می‌دهیم (بدون آپلود واقعی).
    const query = `
      mutation CreateEvent($image: Upload) {
        createEvent(
          title: "${formData.title}",
          eventCategory: "${formData.eventCategory}",
          aboutEvent: "${formData.aboutEvent}",
          startDate: "${formData.startDate}",
          endDate: "${formData.endDate}",
          province: "${formData.province}",
          city: "${formData.city}",
          neighborhood: "${formData.neighborhood}",
          postalAddress: "${formData.postalAddress}",
          postalCode: "${formData.postalCode}",
          registrationStartDate: "${formData.registrationStartDate}",
          registrationEndDate: "${formData.registrationEndDate}",
          maxSubscribers: ${formData.maxSubscribers || 0},
          fullDescription: "${formData.fullDescription || ""}",
          eventOwnerPhone: "${eventOwnerPhone}",
          image: $image
        ) {
          event {
            id
            title
            eventCategory
            city
            startDate
            neighborhood
            maxSubscribers
            image
          }
        }
      }
    `;

    try {
      // در عمل باید از یک روش آپلود فایل استفاده کنید، مثلاً:
      // const formDataToSend = new FormData();
      // formDataToSend.append("operations", JSON.stringify({ query, variables }));
      // formDataToSend.append("map", JSON.stringify({ "0": ["variables.image"] }));
      // formDataToSend.append("0", theFile);
      // سپس با axios.post(..., formDataToSend, { headers: ... }) ارسال کنید.
      // برای سادگی و حداقل تغییر، اینجا صرفاً یک پست ساده می‌گذاریم.
      const response = await axios.post("http://127.0.0.1:8000/graphql/", {
        query,
        variables: {
          image: null, // درصورت نیاز
        },
      });
      console.log("Event created:", response.data);
      alert("رویداد با موفقیت ثبت شد!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("خطا در ثبت رویداد.");
    }
  };

  const handleEdit = () => {
    dispatch(prevStep()); // بازگشت به مرحله ۴
  };

  return (
    <div className={styles.container}>
      <Stepper currentStep={currentStep} />
      <h2 className={styles.title}>تایید نهایی</h2>
      <div className={styles.details}>
        {/* اگر تصویر ندارد، عبارت رویداد بدون تصویر */}
        {formData.image ? (
          <img src={formData.image} alt="Event" className={styles.eventImage} />
        ) : (
          <p className={styles.noImage}>رویداد بدون تصویر</p>
        )}

        <p>
          <strong>عنوان رویداد:</strong> {formData.title}
        </p>
        <p>
          <strong>دسته‌بندی:</strong> {formData.eventCategory}
        </p>
        <p>
          <strong>توضیحات:</strong> {formData.aboutEvent}
        </p>
        <p>
          <strong>زمان شروع:</strong> {formData.startDate}
        </p>
        <p>
          <strong>زمان پایان:</strong> {formData.endDate}
        </p>
        <p>
          <strong>زمان شروع ثبت‌نام:</strong>{" "}
          {formData.registrationStartDate || "اختیاری"}
        </p>
        <p>
          <strong>زمان پایان ثبت‌نام:</strong>{" "}
          {formData.registrationEndDate || "اختیاری"}
        </p>
        <p>
          <strong>استان:</strong> {formData.province}
        </p>
        <p>
          <strong>شهر:</strong> {formData.city}
        </p>
        <p>
          <strong>محله:</strong> {formData.neighborhood}
        </p>
        <p>
          <strong>کد پستی:</strong>{" "}
          {formData.postalCode ? formData.postalCode : "اختیاری"}
        </p>
        <p>
          <strong>آدرس:</strong> {formData.postalAddress}
        </p>
        <p>
          <strong>حداکثر افراد:</strong> {formData.maxSubscribers}
        </p>
        <p>
          <strong>توضیحات تکمیلی:</strong>{" "}
          {formData.fullDescription || "بدون توضیحات اضافه"}
        </p>
      </div>
      <div className={styles.buttons}>
        {/* (13) دکمه اول: تایید نهایی و ساخت رویداد */}
        <button onClick={handleSubmit} className={styles.submitButton}>
          تأیید نهایی و ساخت رویداد
        </button>

        {/* دکمه دوم: اصلاح و برگشت به عقب (variant outline) */}
        <button
          onClick={handleEdit}
          className={styles.outlineButton}
          style={{ border: "1px solid #ccc" }}
        >
          اصلاح و برگشت به عقب
        </button>
      </div>
    </div>
  );
};

export default Step5;
