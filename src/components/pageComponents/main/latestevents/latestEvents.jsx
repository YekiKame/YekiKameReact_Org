import React, { useState, useEffect } from "react";
import axios from "axios";
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
        const response = await axios.post("http://127.0.0.1:8000/graphql/", {
          query,
        });
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

  // تابع ناوبری به صفحه‌ی جزییات
  const handleCardClick = (eventId) => {
    navigate(`/eventDetail/${eventId}`);
  };

  if (loading) return <p>در حال بارگذاری رویدادهای اخیر...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.latestEventsWrapper}>
        <h2 className={styles.title}>آخرین رویدادها</h2>

        <div className={styles.navigationContainer}>
          <div
            className={`${styles.navigationButton} swiper-button-prev-custom`}
          ></div>

          <div className={styles.swiperContainer}>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              slidesPerView={3.6}
              spaceBetween={18}
              className={styles.mySwiper}
            >
              {events.map((ev) => (
                <SwiperSlide key={ev.id}>
                  {/* از این به بعد کل کارت کلیک‌پذیر نیست. 
                      تنها دکمه‌ای که در خود EventCard داریم، 
                      از prop onJoin استفاده می‌کند */}
                  <EventCard
                    event={ev}
                    variant="home"
                    onJoin={() => handleCardClick(ev.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div
            className={`${styles.navigationButton} swiper-button-next-custom`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LatestEvents;
