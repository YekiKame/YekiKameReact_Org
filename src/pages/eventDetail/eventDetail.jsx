import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./eventdetail.module.css";
import SideBar from "../../components/pageComponents/eventDetail/sidebar/eventSidebar.jsx";
import Main from "../../components/pageComponents/eventDetail/main/main.jsx";

const EventDetail = () => {
  // از پارامتر آدرس (/eventDetail/:eventId) گرفته می‌شود
  const { eventId } = useParams();
  console.log("Param eventId:", eventId);

  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const [event, setEvent]   = useState(null);

  useEffect(() => {
    // اگر به هر دلیل eventId در آدرس نبود، زودتر خطا بده
    if (!eventId) {
      setLoading(false);
      setError("هیچ شناسه‌ای در آدرس وجود ندارد!");
      return;
    }

    // تابعی برای فراخوانی GraphQL
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // توجه: حتماً query را با کلمهٔ "query" آغاز کنید
        // و نام فیلد را مطابق بک‌اند اصلاح کنید (در اینجا فرض شده eventDetails)
        const query = `
          query {
            eventDetails(eventId: "${eventId}") {
              event {
                id
                title
                image
                eventCategory
                aboutEvent
                startDate
                endDate
                province
                city
                neighborhood
                postalAddress
                postalCode
                registrationStartDate
                registrationEndDate
                fullDescription
                maxSubscribers
                subscriberCount
                eventOwner {
                  phone
                }
              }
              error
            }
          }
        `;

        // درخواست را به سرور GraphQL می‌فرستیم
        const response = await axios.post("http://95.217.8.192:8000/graphql/", { query });

        console.log("API Response:", response.data);

        // بررسی دادهٔ برگشتی
        const eventData = response.data?.data?.eventDetails;
        if (!eventData) {
          // یعنی فیلد eventDetails در پاسخ نبوده
          setError("خطا در پاسخ سرور یا فیلد eventDetails یافت نشد.");
        } else if (eventData.error) {
          // اگر سرور پیام خطا را درون error برگرداند
          setError(eventData.error);
        } else {
          // در نهایت شیء event را ذخیره می‌کنیم
          setEvent(eventData.event);
        }
      } catch (err) {
        console.error("Error fetching event detail:", err);
        setError("خطایی در ارتباط با سرور رخ داد: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    // فراخوانی
    fetchEventDetails();
  }, [eventId]);

  // کنترل‌های ساده برای وضعیت بارگذاری یا خطا
  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;

  // اگر رویداد از سرور گرفته نشد
  if (!event) return <p>Event not found!</p>;

  // در صورت موفقیت، کامپوننت اصلی را نمایش می‌دهیم
  return (
    <div className={`${styles.grid} ${styles["event-detail-container"]}`}>
      <Main event={event} />
      <SideBar event={event} />
    </div>
  );
};

export default EventDetail;
