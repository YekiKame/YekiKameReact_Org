import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./myeventstab.module.css";

import EventCard from "../../events/eventcard/eventCard.jsx";
import Pagination from "../../common/pagination/pagination.jsx";

// تصویر جایگزین وقتی هیچ رویدادی یافت نشد
import notCreatedImg from "/assets/images/notcreatedevent.png";

const MyEventsTab = () => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "09123456789";

  const [activeTab, setActiveTab] = useState("owner"); // "owner", "approved", "past"
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // هندلرهای دکمه حذف و ویرایش
  const handleDeleteEvent = (eventId) => {
    console.log("User wants to delete event with ID =", eventId);
    // TODO: نمایش مودال تأیید یا Mutation حذف
  };

  const handleEditEvent = (eventId) => {
    console.log("User wants to edit event with ID =", eventId);
    // TODO: نمایش مودال یا ریدایرکت به صفحه ویرایش
  };

  // هندلر دکمه «مشاهده جزئیات رویداد» در تب approved
  const handleJoinEvent = (eventId) => {
    console.log("User wants to see event detail for ID =", eventId);
    // TODO: navigate(`/eventDetail/${eventId}`) یا چیزی مشابه
  };

  // گرفتن رویدادهای «رویدادهای من» (میزبان + ادمین)
  const fetchOwnerEvents = async () => {
    setLoading(true);
    setError(null);

    const query = `
      query {
        eventsByOwner(phone: "${storedPhoneNumber}") {
          id
          title
          image
          startDate
          eventCategory
          neighborhood
          subscriberCount
        }
        adminEvents(phone: "${storedPhoneNumber}") {
          id
          title
          image
          startDate
          eventCategory
          neighborhood
          subscriberCount
        }
      }
    `;
    const encodedQuery = encodeURIComponent(query);
    const url = `http://127.0.0.1:8000/graphql/?query=${encodedQuery}`;

    try {
      const response = await axios.get(url);
      const data = response.data?.data || {};
      const ownerEvents = data.eventsByOwner || [];
      const adminEvents = data.adminEvents || [];
      const combinedEvents = [...ownerEvents, ...adminEvents];
      setEvents(combinedEvents);
    } catch (err) {
      console.error("Error fetching owner/admin events:", err);
      setError("خطایی در دریافت اطلاعات رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  // گرفتن رویدادهایی که کاربر در آن‌ها به عنوان عضو عادی شرکت می‌کند
  const fetchApprovedEvents = async () => {
    setLoading(true);
    setError(null);

    const query = `
      query {
        userEvents(phone: "${storedPhoneNumber}") {
          id
          title
          image
          startDate
          eventCategory
          neighborhood
          subscriberCount
        }
      }
    `;
    const encodedQuery = encodeURIComponent(query);
    const url = `http://127.0.0.1:8000/graphql/?query=${encodedQuery}`;

    try {
      const response = await axios.get(url);
      const data = response.data?.data || {};
      const userEvts = data.userEvents || [];
      setEvents(userEvts);
    } catch (err) {
      console.error("Error fetching userEvents:", err);
      setError("خطایی در دریافت اطلاعات رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  // تب "past" هنوز پیاده نشده
  const fetchPastEvents = async () => {
    // TODO: کوئری مناسب برای رویدادهایی که تاریخشان گذشته و کاربر در آن شرکت کرده
    setEvents([]);
  };

  useEffect(() => {
    setCurrentPage(1); // هر بار تغییر تب، صفحه را 1 بگذار
    if (activeTab === "owner") {
      fetchOwnerEvents();
    } else if (activeTab === "approved") {
      fetchApprovedEvents();
    } else if (activeTab === "past") {
      fetchPastEvents();
    }
  }, [activeTab]);

  // رندر تب owner
  const renderOwnerEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    if (!events.length) {
      return (
        <div className={styles.noEvents}>
          <img src={notCreatedImg} alt="No Events" className={styles.noEventsImg} />
          <p className={styles.noEventsText}>شما میزبان یا ادمین هیچ رویدادی نیستید.</p>
        </div>
      );
    }

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <>
        <div className={styles.eventsContainer}>
          {currentEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              variant="myEvents"         // ← تفاوت اصلی برای تب owner
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>
        <Pagination
          totalItems={events.length}
          itemsPerPage={eventsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    );
  };

  // رندر تب approved
  const renderApprovedEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    if (!events.length) {
      return (
        <div className={styles.noEvents}>
          <img src={notCreatedImg} alt="No Events" className={styles.noEventsImg} />
          <p className={styles.noEventsText}>هیچ رویدادی یافت نشد.</p>
        </div>
      );
    }

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <>
        <div className={styles.eventsContainer}>
          {currentEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              variant="joined"         // ← برای تب «رویدادهایی که شرکت می‌کنم»
              onJoin={handleJoinEvent} // ← اگر دکمه بخواهد جایی هدایت کند
            />
          ))}
        </div>
        <Pagination
          totalItems={events.length}
          itemsPerPage={eventsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    );
  };

  // رندر تب past
  const renderPastEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    // فرضاً تا زمانی که کوئری را پیاده نکرده‌اید:
    return <p>هنوز پیاده‌سازی نشده است.</p>;
  };

  return (
    <div className={styles.myEventsTab}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "owner" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("owner")}
        >
          رویدادهای من
        </button>
        <button
          className={`${styles.tab} ${activeTab === "approved" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          رویدادهایی که شرکت می‌کنم
        </button>
        <button
          className={`${styles.tab} ${activeTab === "past" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("past")}
        >
          رویدادهایی که شرکت کرده‌ام
        </button>
      </div>

      <div className={styles.eventsContent}>
        {activeTab === "owner" && renderOwnerEvents()}
        {activeTab === "approved" && renderApprovedEvents()}
        {activeTab === "past" && renderPastEvents()}
      </div>
    </div>
  );
};

export default MyEventsTab;
