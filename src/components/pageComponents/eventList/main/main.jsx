import React, { useState } from "react";
import styles from "./main.module.css";
import EventListEventCard from "../../../events/eventlist/eventListEventCard.jsx";
import Pagination from "../../../common/pagination/pagination.jsx";

const dummyEvents = [
  {
    id: 1,
    title: "پیاده‌روی گروهی",
    eventCategory: { name: "تفریحی", icon: "/assets/icons/tour.svg" },
    subscriberCount: 23,
    startDate: "2024-12-01T10:30:00",
    neighborhood: "پارک ملت",
    image: "/assets/images/Card.jpg",
  },
  {
    id: 2,
    title: "مسابقه دوچرخه‌سواری",
    eventCategory: { name: "ورزشی", icon: "/assets/icons/sport.svg" },
    subscriberCount: 18,
    startDate: "2024-12-02T11:00:00",
    neighborhood: "ورزشگاه آزادی",
    image: "/assets/images/card2.jpg",
  },
  // ... سایر رویدادها
  // فرض کنید تا 30 رویداد دارید برای مشاهده صفحه‌بندی
];

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 20;
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
