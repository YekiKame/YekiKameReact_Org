import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { prevStep } from "../../../../../redux/slices/createEventSlice.js";
import axios from "axios";
import styles from "./step5.module.css";
import Stepper from "../../../../common/stepper/stepper.jsx";
import Button from "../../../../shared/button/button.jsx";

const Step5 = () => {
  const formData = useSelector((state) => state.createEvent.formData);
  const currentStep = useSelector((state) => state.createEvent.currentStep);
  const dispatch = useDispatch();

  // تلفن صاحب رویداد
  const eventOwnerPhone = sessionStorage.getItem("userPhone") || "09123456789";

  const handleSubmit = async  () => {
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
      const response = await axios.post("http://127.0.0.1:8000/graphql/", {
        query,
        variables: {
          image: null,
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
          <strong>زمان شروع ثبت‌نام:</strong> {formData.registrationStartDate || "اختیاری"}
        </p>
        <p>
          <strong>زمان پایان ثبت‌نام:</strong> {formData.registrationEndDate || "اختیاری"}
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
          <strong>کد پستی:</strong> {formData.postalCode ? formData.postalCode : "اختیاری"}
        </p>
        <p>
          <strong>آدرس:</strong> {formData.postalAddress}
        </p>
        <p>
          <strong>حداکثر افراد:</strong> {formData.maxSubscribers}
        </p>
        <p>
          <strong>توضیحات تکمیلی:</strong> {formData.fullDescription || "بدون توضیحات اضافه"}
        </p>
      </div>
      <div className={styles.buttons}>
        <Button
          text={"تأیید نهایی و ساخت رویداد"}
          size="large"
          variant="primary"
          onClick={handleSubmit}
          customStyles={{ width: "100%" }}
        />
        <Button
          text={"اصلاح و برگشت به عقب"}
          size="large"
          variant="outline"
          onClick={handleEdit}
          customStyles={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Step5;
