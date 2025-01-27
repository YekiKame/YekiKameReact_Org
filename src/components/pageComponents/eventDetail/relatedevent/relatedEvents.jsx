import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Swiper 11 style:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import EventCard from "../../../events/eventcard/eventCard.jsx";
import styles from "./relatedevents.module.css";

const RelatedEvents = ({ eventId }) => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // اگر eventId خالی بود، کوئری را فراخوانی نکنیم
  useEffect(() => {
    if (!eventId) return;

    const fetchRelated = async () => {
      setLoading(true);
      setError(null);

      // کوئری GraphQL
      const query = `
        query {
          relatedEvents(eventId: "${eventId}") {
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
        const response = await axios.post("http://95.217.8.192:8000/graphql/", {
          query,
        });
        const data = response.data?.data;
        const relEvts = data?.relatedEvents || [];
        setEvents(relEvts);
      } catch (err) {
        console.error("Error fetching related events:", err);
        setError("خطایی در دریافت رویدادهای مرتبط رخ داد.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [eventId]);

  // تابع کلیک روی کارت => ناوبری به آدرس /eventDetail/:id
  const handleCardClick = (id) => {
    navigate(`/eventDetail/${id}`);
  };

  if (!eventId) return null; // یا یک متن ساده
  if (loading)
    return <p className={styles.loading}>در حال بارگذاری رویدادهای مرتبط...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!events.length) {
    return <p className={styles.error}>هیچ رویداد مرتبطی یافت نشد.</p>;
  }

  return (
    <div className={styles.relatedEventsWrapper}>
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
            slidesPerView={2.5}
            spaceBetween={8}
            className={styles.mySwiper}
          >
            {events.map((ev) => (
              <SwiperSlide key={ev.id}>
                <div onClick={() => handleCardClick(ev.id)}>
                  <EventCard event={ev} variant="home" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={`${styles.navigationButton} swiper-button-next-custom`}
        ></div>
      </div>
    </div>
  );
};

export default RelatedEvents;
