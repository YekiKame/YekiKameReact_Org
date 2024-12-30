import React, { useState } from "react";
import styles from "./main.module.css";
import EventListEventCard from "../../../events/eventlist/eventListEventCard.jsx";
import Pagination from "../../../common/pagination/pagination.jsx";

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
  {
    id: 11,
    title: "مسابقه دوچرخه‌سواری",
    eventCategory: "ورزشی",
    subscriberCount: 18,
    startDate: "2024-12-02T11:00:00",
    neighborhood: "ورزشگاه آزادی",
    image: "/assets/images/card2.jpg",
  },
  {
    id: 12,
    title: "نمایشگاه کتاب",
    eventCategory: "فرهنگی",
    subscriberCount: 30,
    startDate: "2024-12-03T14:00:00",
    neighborhood: "نمایشگاه بین‌المللی",
    image: "/assets/images/card3.jpg",
  },
  {
    id: 13,
    title: "مسابقه فوتبال محلی",
    eventCategory: "ورزشی",
    subscriberCount: 40,
    startDate: "2024-12-04T16:30:00",
    neighborhood: "زمین چمن محله",
    image: "/assets/images/card4.jpg",
  },
  {
    id: 14,
    title: "کلاس آموزشی نقاشی",
    eventCategory: "آموزشی",
    subscriberCount: 15,
    startDate: "2024-12-05T09:00:00",
    neighborhood: "فرهنگسرای هنر",
    image: "/assets/images/card5.jpg",
  },
  {
    id: 15,
    title: "نمایشگاه کتاب",
    eventCategory: "فرهنگی",
    subscriberCount: 30,
    startDate: "2024-12-03T14:00:00",
    neighborhood: "نمایشگاه بین‌المللی",
    image: "/assets/images/card3.jpg",
  },
  {
    id: 16,
    title: "مسابقه فوتبال محلی",
    eventCategory: "ورزشی",
    subscriberCount: 40,
    startDate: "2024-12-04T16:30:00",
    neighborhood: "زمین چمن محله",
    image: "/assets/images/card4.jpg",
  },
  {
    id: 17,
    title: "کلاس آموزشی نقاشی",
    eventCategory: "آموزشی",
    subscriberCount: 15,
    startDate: "2024-12-05T09:00:00",
    neighborhood: "فرهنگسرای هنر",
    image: "/assets/images/card5.jpg",
  },
  {
    id: 18,
    title: "مسابقه دوچرخه‌سواری",
    eventCategory: "ورزشی",
    subscriberCount: 18,
    startDate: "2024-12-02T11:00:00",
    neighborhood: "ورزشگاه آزادی",
    image: "/assets/images/card2.jpg",
  },
  {
    id: 19,
    title: "نمایشگاه کتاب",
    eventCategory: "فرهنگی",
    subscriberCount: 30,
    startDate: "2024-12-03T14:00:00",
    neighborhood: "نمایشگاه بین‌المللی",
    image: "/assets/images/card3.jpg",
  },
  {
    id: 20,
    title: "مسابقه فوتبال محلی",
    eventCategory: "ورزشی",
    subscriberCount: 40,
    startDate: "2024-12-04T16:30:00",
    neighborhood: "زمین چمن محله",
    image: "/assets/images/card4.jpg",
  },
  {
    id: 21,
    title: "کلاس آموزشی نقاشی",
    eventCategory: "آموزشی",
    subscriberCount: 15,
    startDate: "2024-12-05T09:00:00",
    neighborhood: "فرهنگسرای هنر",
    image: "/assets/images/card5.jpg",
  },
];
const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 10;
  const totalPages = Math.ceil(dummyEvents.length / EVENTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIdx = (currentPage - 1) * EVENTS_PER_PAGE;
  const currentEvents = dummyEvents.slice(startIdx, startIdx + EVENTS_PER_PAGE);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventsContainer}>
        {currentEvents.map((event) => (
          <EventListEventCard key={event.id} {...event} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
