import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { prevStep } from "../../../../../redux/slices/createEventSlice.js";
import axios from "axios";
import styles from "./step5.module.css";
import Stepper from "../../../../common/stepper/stepper.jsx";
import Button from "../../../../shared/button/button.jsx";
import DateObject from "react-date-object";

const isoToShamsi = (val) => {
  if (!val) return "اختیاری";

  let isoStr = "";
  // اگر در Redux یک آبجکت { date: "...", ... } گذاشتیم:
  if (typeof val === "object" && val.date) {
    isoStr = val.date;
  } else if (typeof val === "string") {
    isoStr = val;
  } else {
    return "اختیاری";
  }

  // اکنون isoStr یک رشته‌ی ISO است
  const dateObj = new DateObject({
    date: isoStr,
    calendar: "persian",
    locale: "fa",
  });
  return dateObj.format("YYYY/MM/DD HH:mm");
};

/**
 * هنگام ارسال به سرور، اگر در Redux شیء داشتیم، باید رشته ISO خالص را بیرون بکشیم.
 */
const parseToIso = (val) => {
  if (!val) return "";
  if (typeof val === "object" && val.date) {
    // اگر فرمت آبجکت داریم
    return val.date;
  }
  if (typeof val === "string") {
    return val; // فرض می‌کنیم خود مقدار ISO است
  }
  return "";
};

const Step5 = () => {
  const formData = useSelector((state) => state.createEvent.formData);
  const dispatch = useDispatch();

  // اگر کاربر لاگین کرده باشد
  const eventOwnerPhone = sessionStorage.getItem("userPhone") || "09123456789";

  const handleSubmit = async () => {
    const startDateIso = parseToIso(formData.startDate);
    const endDateIso = parseToIso(formData.endDate);
    const regStartIso = parseToIso(formData.registrationStartDate);
    const regEndIso = parseToIso(formData.registrationEndDate);

    const formDataObj = new FormData();

    // تبدیل Base64 به File
    if (formData.image && formData.image.startsWith("data:image")) {
      try {
        // جدا کردن نوع و داده‌های Base64
        const arr = formData.image.split(",");
        const mime = arr[0].match(/:(.*?);/)[1]; // گرفتن نوع فایل
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        // ساخت File object
        const file = new File([u8arr], "event-image.jpg", { type: mime });
        formDataObj.append("0", file);

        console.log("File created successfully:", file);
      } catch (error) {
        console.error("Error converting Base64 to File:", error);
      }
    }

    // تنظیم operations برای GraphQL
    const operations = {
      query: `
        mutation CreateEvent($title: String!, $eventCategory: String!, $aboutEvent: String!, 
                            $startDate: DateTime!, $endDate: DateTime!, $province: String!, 
                            $city: String!, $neighborhood: String, $postalAddress: String, 
                            $postalCode: String, $registrationStartDate: DateTime!, 
                            $registrationEndDate: DateTime!, $maxSubscribers: Int!, 
                            $fullDescription: String, $eventOwnerPhone: String!, $image: Upload) {
          createEvent(
            title: $title,
            eventCategory: $eventCategory,
            aboutEvent: $aboutEvent,
            startDate: $startDate,
            endDate: $endDate,
            province: $province,
            city: $city,
            neighborhood: $neighborhood,
            postalAddress: $postalAddress,
            postalCode: $postalCode,
            registrationStartDate: $registrationStartDate,
            registrationEndDate: $registrationEndDate,
            maxSubscribers: $maxSubscribers,
            fullDescription: $fullDescription,
            eventOwnerPhone: $eventOwnerPhone,
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
      `,
      variables: {
        title: formData.title,
        eventCategory: formData.eventCategory,
        aboutEvent: formData.aboutEvent,
        startDate: startDateIso,
        endDate: endDateIso,
        province: formData.province,
        city: formData.city,
        neighborhood: formData.neighborhood || "",
        postalAddress: formData.postalAddress || "",
        postalCode: formData.postalCode || "",
        registrationStartDate: regStartIso,
        registrationEndDate: regEndIso,
        maxSubscribers: parseInt(formData.maxSubscribers) || 0,
        fullDescription: formData.fullDescription || "",
        eventOwnerPhone: eventOwnerPhone,
        image: null, // این مقدار با فایل واقعی جایگزین خواهد شد
      },
    };
    formDataObj.append("operations", JSON.stringify(operations));

    // تنظیم map
    const map = {
      0: ["variables.image"],
    };
    formDataObj.append("map", JSON.stringify(map));

    // چاپ محتویات FormData برای اطمینان
    console.log("FormData contents:");
    for (let pair of formDataObj.entries()) {
      console.log(pair[0], typeof pair[1], pair[1]);
    }

    try {
      const response = await axios({
        method: "post",
        url: "http://95.217.8.192:8000/graphql/",
        data: formDataObj,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response:", response.data);

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      console.log("Event created:", response.data);
      alert("رویداد با موفقیت ثبت شد!");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("خطا در ثبت رویداد: " + error.message);
    }
  };
  const handleEdit = () => {
    dispatch(prevStep());
  };

  return (
    <div className={styles.container}>
      <Stepper
        currentStep={useSelector((state) => state.createEvent.currentStep)}
      />
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

        {/* نمایش شمسی + ساعت برای کاربر */}
        <p>
          <strong>زمان شروع رویداد:</strong> {isoToShamsi(formData.startDate)}
        </p>
        <p>
          <strong>زمان پایان رویداد:</strong> {isoToShamsi(formData.endDate)}
        </p>
        <p>
          <strong>زمان شروع ثبت‌نام:</strong>{" "}
          {isoToShamsi(formData.registrationStartDate)}
        </p>
        <p>
          <strong>زمان پایان ثبت‌نام:</strong>{" "}
          {isoToShamsi(formData.registrationEndDate)}
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
          <strong>کد پستی:</strong> {formData.postalCode || "اختیاری"}
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
