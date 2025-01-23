import React, { useState, useEffect } from "react";
import axios from "axios";

// نسخهٔ جدید سوئیپر (v11 یا بالاتر)
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import EventCard from "../../../events/eventcard/eventCard.jsx";
import styles from "./latestevents.module.css";

const LatestEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // فراخوانی API
  useEffect(() => {
    const fetchRecentEvents = async () => {
      setLoading(true);
      setError(null);
      const query = `
        query {
          recentEvents {
            id
            title
            eventCategory
            image
            startDate
            neighborhood
            subscriberCount
          }
        }
      `;
      try {
        const response = await axios.post("http://95.217.8.192:8000/graphql/", { query });
        const data = response.data?.data;
        const recEvents = data?.recentEvents || [];
        setEvents(recEvents);
      } catch (err) {
        console.error("Error fetching recent events:", err);
        setError("خطایی در دریافت لیست رویدادهای اخیر رخ داد.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecentEvents();
  }, []);

  if (loading) return <p>در حال بارگذاری رویدادهای اخیر...</p>;
  if (error)   return <p className={styles.error}>{error}</p>;

  // کلیک روی کارت برای رفتن به جزئیات رویداد
  const handleCardClick = (eventId) => {
    navigate(`/eventDetail/${eventId}`);
  };

  return (
    <div className={styles.latestEvents}>
      <h2 className={styles.title}>آخرین رویدادها</h2>

      <Swiper
        modules={[Navigation]}   // فعال‌سازی ماژول نویگیشن
        navigation              // نمایش دکمه‌های پیش‌فرض قبلی/بعدی
        slidesPerView={4.2}     // تعداد کارت‌های قابل نمایش همزمان
        spaceBetween={24}       // فاصلهٔ بین کارت‌ها
        style={{ width: "95%", margin: "0 auto" }}
      >
        {events.map((ev) => (
          <SwiperSlide key={ev.id}>
            {/* اگر مایلید کل کارت کلیک‌خور باشد: */}
            <div onClick={() => handleCardClick(ev.id)}>
              {/* استفاده از EventCard با variant="home" برای داشتن دکمهٔ «عضو شدن» */}
              <EventCard event={ev} variant="home" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestEvents;
