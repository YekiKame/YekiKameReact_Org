import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../../events/eventcard/eventCard.jsx";
import styles from "./relatedevents.module.css";
import LeftArrow from "../../../../assets/icons/leftarrow.svg";
import RightArrow from "../../../../assets/icons/rightarrow.svg";

// داده‌های فیک برای نمایش ۵ کارت رویداد
const dummyEvents = [
  {
    id: 1,
    title: "پیاده‌روی گروهی",
    eventCategory: "تفریحی",
    subscriberCount: 23,
    startDate: "2024-12-01T10:30:00",
    neighborhood: "پارک ملت",
    image: "/assets/images/Card.jpg",
  },
  {
    id: 2,
    title: "مسابقه دوچرخه‌سواری",
    eventCategory: "ورزشی",
    subscriberCount: 18,
    startDate: "2024-12-02T11:00:00",
    neighborhood: "ورزشگاه آزادی",
    image: "/assets/images/card2.jpg",
  },
  {
    id: 3,
    title: "نمایشگاه کتاب",
    eventCategory: "فرهنگی",
    subscriberCount: 30,
    startDate: "2024-12-03T14:00:00",
    neighborhood: "نمایشگاه بین‌المللی",
    image: "/assets/images/card3.jpg",
  },
  {
    id: 4,
    title: "مسابقه فوتبال محلی",
    eventCategory: "ورزشی",
    subscriberCount: 40,
    startDate: "2024-12-04T16:30:00",
    neighborhood: "زمین چمن محله",
    image: "/assets/images/card4.jpg",
  },
  {
    id: 5,
    title: "کلاس آموزشی نقاشی",
    eventCategory: "آموزشی",
    subscriberCount: 15,
    startDate: "2024-12-05T09:00:00",
    neighborhood: "فرهنگسرای هنر",
    image: "/assets/images/card5.jpg",
  },
  {
    id: 6,
    title: "پیاده‌روی گروهی",
    eventCategory: "تفریحی",
    subscriberCount: 23,
    startDate: "2024-12-01T10:30:00",
    neighborhood: "پارک ملت",
    image: "/assets/images/Card.jpg",
  },
  {
    id: 7,
    title: "مسابقه دوچرخه‌سواری",
    eventCategory: "ورزشی",
    subscriberCount: 18,
    startDate: "2024-12-02T11:00:00",
    neighborhood: "ورزشگاه آزادی",
    image: "/assets/images/card2.jpg",
  },
  {
    id: 8,
    title: "نمایشگاه کتاب",
    eventCategory: "فرهنگی",
    subscriberCount: 30,
    startDate: "2024-12-03T14:00:00",
    neighborhood: "نمایشگاه بین‌المللی",
    image: "/assets/images/card3.jpg",
  },
  {
    id: 9,
    title: "مسابقه فوتبال محلی",
    eventCategory: "ورزشی",
    subscriberCount: 40,
    startDate: "2024-12-04T16:30:00",
    neighborhood: "زمین چمن محله",
    image: "/assets/images/card4.jpg",
  },
  {
    id: 10,
    title: "کلاس آموزشی نقاشی",
    eventCategory: "آموزشی",
    subscriberCount: 15,
    startDate: "2024-12-05T09:00:00",
    neighborhood: "فرهنگسرای هنر",
    image: "/assets/images/card5.jpg",
  },
];
//   const [events, setEvents] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     // درخواست API GraphQL برای رویدادها
//     const query = `
//       query {
//         recentEvents {
//           id
//           title
//           eventCategory
//           subscriberCount
//           startDate
//           neighborhood
//           image
//         }
//       }
//     `;

//     axios
//       .post("http://127.0.0.1:8000/graphql/", { query })
//       .then((response) => {
//         setEvents(response.data?.data?.recentEvents);
//       })
//       .catch((error) => {
//         console.error("Error fetching events:", error);
//       });
//   }, []);

const RelatedEvents = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 4.5; // تعداد کارت‌های قابل نمایش
  const totalCards = dummyEvents.length;
  const maxIndex = Math.ceil(totalCards - visibleCards); // حداکثر مقدار currentIndex با یک کلیک اضافی

  // دکمه‌ای که در سمت چپ صفحه است (حرکت به کارت‌های بعدی - سمت راست)
  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // دکمه‌ای که در سمت راست صفحه است (حرکت به کارت‌های قبلی - سمت چپ)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.latestEvents}>
      <div className={styles.carousel}>
        {/* دکمه راست (حرکت به راست صفحه - نشان دادن کارت‌های قبلی) */}
        <button
          className={styles.arrowButton}
          onClick={handlePrev}
          disabled={currentIndex === 0} // غیرفعال زمانی که در ابتدای لیست هستیم
        >
          <img src={RightArrow} alt="قبلی" />
        </button>

        <div className={styles.cardsWrapper}>
          <div
            className={styles.cardsContainer}
            style={{
              transform: `translateX(${currentIndex * 36}%)`, // حرکت به راست برای کارت‌های بعدی
            }}
          >
            {dummyEvents.map((event, index) => (
              <div key={index} className={styles.card}>
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>

        {/* دکمه چپ (حرکت به چپ صفحه - نشان دادن کارت‌های بعدی) */}
        <button
          className={styles.arrowButton}
          onClick={handleNext}
          disabled={currentIndex >= maxIndex} // غیرفعال زمانی که به انتهای لیست رسیده‌ایم
        >
          <img src={LeftArrow} alt="بعدی" />
        </button>
      </div>
    </div>
  );
};

export default RelatedEvents;
