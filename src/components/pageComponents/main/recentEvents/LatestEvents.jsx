import React, { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../../events/eventcard/EventCard";
import styles from "./LatestEvents.module.css";
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

const LatestEvents = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // حرکت به کارت بعدی
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= dummyEvents.length ? 0 : prevIndex + 1
      );
    };
  
    // حرکت به کارت قبلی
    const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? dummyEvents.length - 1 : prevIndex - 1
      );
    };
  
    return (
        <div className={styles.latestEvents}>
          <h2 className={styles.title}>آخرین رویدادها</h2>
    
          {/* کروسل */}
          <div className={styles.carousel}>
            <button className={styles.arrowButton} onClick={handlePrev}>
              <img src={RightArrow} alt="قبلی" />
            </button>
    
            <div className={styles.cardsWrapper}>
              <div
                className={styles.cardsContainer}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {dummyEvents.map((event) => (
                  <div key={event.id} className={styles.card}>
                    <EventCard {...event} />
                  </div>
                ))}
              </div>
            </div>
    
            <button className={styles.arrowButton} onClick={handleNext}>
              <img src={LeftArrow} alt="بعدی" />
            </button>
          </div>
        </div>
      );
    };
    
    export default LatestEvents;