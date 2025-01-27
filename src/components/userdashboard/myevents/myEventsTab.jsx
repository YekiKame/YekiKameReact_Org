import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./myeventstab.module.css";

import EventCard from "../../events/eventcard/eventCard.jsx";
import Pagination from "../../common/pagination/pagination.jsx";
import EditEventModal from "../../modals/editEventModal/editEventModal.jsx";
import JoinRequestsModal from "../../modals/joinRequestModal/joinRequestModal.jsx";
import DeleteEventModal from "../../modals/deleteEventModal/deleteEventModal.jsx";

// تصاویر برای شرایط خالی
import notCreatedImg from "/assets/images/notcreatedevent.png";
import notJoinedImg from "/assets/images/eventnotjoined.jpg";
import notPassedImg from "/assets/images/eventsnotpassed.png";

// دیکشنری تبدیل دسته‌بندی انگلیسی به فارسی (فقط برای تب سوم)
const categoryNames = {
  ENTERTAINMENT: "تفریحی",
  SPORT: "ورزشی",
  SOCIAL: "فرهنگی",
  EDUCATION: "آموزشی",
  GAME: "بازی و سرگرمی",
};

// دیکشنری تبدیل نقش انگلیسی به فارسی (فقط برای تب سوم)
const roleNames = {
  owner: "مالک",
  admin: "ادمین",
  regular: "کاربر عادی",
};

// تابع کمکی برای فرمت تاریخ شمسی (فقط برای تب سوم - past)
const formatDateToPersian = (dateString) => {
  if (!dateString) return "اختیاری";
  const date = new Date(dateString);
  const persianDate = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const weekDay = date.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${persianDate}، ${weekDay} ساعت ${time}`;
};

const MyEventsTab = () => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "09123456789";
  const navigate = useNavigate();

  // تب فعال
  const [activeTab, setActiveTab] = useState("owner");

  // لیست رویدادها
  const [events, setEvents] = useState([]);

  // وضعیت بارگذاری و خطا
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // صفحه فعلی و تعداد آیتم‌ها در هر صفحه (برای owner و approved)
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // کنترل مودال‌ها و رویداد انتخاب‌شده
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [joinRequestsModalOpen, setJoinRequestsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // تابع مشترک برای فرستادن query
  const fetchEvents = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `http://127.0.0.1:8000/graphql/?query=${encodedQuery}`;
      const response = await axios.get(url);
      const data = response.data?.data || {};
      return data;
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("خطایی در دریافت اطلاعات رخ داد.");
      return {};
    } finally {
      setLoading(false);
    }
  };

  // رویدادهای مالک + ادمین
  const fetchOwnerEvents = async () => {
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
    const data = await fetchEvents(query);
    const ownerEvents = data.eventsByOwner || [];
    const adminEvents = data.adminEvents || [];
    setEvents([...ownerEvents, ...adminEvents]);
  };

  // رویدادهایی که شرکت می‌کنم
  const fetchApprovedEvents = async () => {
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
    const data = await fetchEvents(query);
    setEvents(data.userEvents || []);
  };

  // رویدادهایی که شرکت کرده‌ام (گذشته)
  const fetchPastEvents = async () => {
    const query = `
      query {
        pastEvents(phone: "${storedPhoneNumber}") {
          id
          title
          startDate
          endDate
          eventCategory
          neighborhood
          city
          role
        }
      }
    `;
    const data = await fetchEvents(query);
    setEvents(data.pastEvents || []);
  };

  // هنگام تغییر تب
  useEffect(() => {
    setCurrentPage(1); // هر بار تب تغییر می‌کند، صفحه را به ۱ برمی‌گردانیم
    if (activeTab === "owner") {
      fetchOwnerEvents();
    } else if (activeTab === "approved") {
      fetchApprovedEvents();
    } else if (activeTab === "past") {
      fetchPastEvents();
    }
  }, [activeTab]);

  // متدهای هندل کلیک در کارت
  const handleEditClick = (event, role) => {
    setSelectedEvent(event);
    setUserRole(role);
    setEditModalOpen(true);
  };

  const handleJoinRequestsClick = (event) => {
    setSelectedEvent(event);
    setJoinRequestsModalOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  const handleEventDetailRedirect = (eventId) => {
    navigate(`/eventDetail/${eventId}`);
  };

  // نمایش وقتی رویدادی نداریم
  const renderNoEventsMessage = () => {
    let imgSrc = notCreatedImg;
    let message = "شما میزبان یا ادمین هیچ رویدادی نیستید.";
    if (activeTab === "approved") {
      imgSrc = notJoinedImg;
      message = "شما در هیچ رویدادی شرکت نکرده‌اید.";
    } else if (activeTab === "past") {
      imgSrc = notPassedImg;
      message = "شما تاکنون در هیچ رویدادی شرکت نکرده‌اید.";
    }

    return (
      <div className={styles.noEvents}>
        <img src={imgSrc} alt="No Events" className={styles.noEventsImg} />
        <p className={styles.noEventsText}>{message}</p>
      </div>
    );
  };

  // رندر تب owner + approved (بدون تبدیل تاریخ/دسته‌بندی)
  const renderEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!events.length) return renderNoEventsMessage();

    // محاسبه تعداد صفحات
    const totalPages = Math.ceil(events.length / eventsPerPage);

    // رویدادهای صفحه فعلی
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <>
        <div className={styles.eventsContainer}>
          {currentEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev} // داده‌ها را همان‌طور که آمده ارسال می‌کنیم
              variant={activeTab === "approved" ? "joined" : "myEvents"}
              onJoin={
                activeTab === "approved"
                  ? () => handleEventDetailRedirect(ev.id)
                  : undefined
              }
              onEdit={() => handleEditClick(ev, "owner")}
              onDelete={() => handleDeleteClick(ev)}
              onJoinRequests={() => handleJoinRequestsClick(ev)}
            />
          ))}
        </div>

        {/* اگر بیشتر از یک صفحه داریم، Pagination را نشان بده */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </>
    );
  };

  // رندر تب past (تاریخ و دسته‌بندی را به فرمت شمسی/فارسی تبدیل می‌کنیم)
  const renderPastEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!events.length) return renderNoEventsMessage();

    return (
      <div className={styles.pastEventsContainer}>
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>عنوان رویداد</th>
              <th>دسته‌بندی</th>
              <th>شهر</th>
              <th>محله</th>
              <th>تاریخ شروع</th>
              <th>تاریخ پایان</th>
              <th>نقش</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, index) => (
              <tr key={ev.id}>
                <td>{index + 1}</td>
                <td>{ev.title}</td>
                <td>{categoryNames[ev.eventCategory] || ev.eventCategory}</td>
                <td>{ev.city}</td>
                <td>{ev.neighborhood}</td>
                <td>{formatDateToPersian(ev.startDate)}</td>
                <td>{formatDateToPersian(ev.endDate)}</td>
                <td>{roleNames[ev.role] || ev.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
        {activeTab === "past" ? renderPastEvents() : renderEvents()}
      </div>

      {/* مودال‌های ویرایش، درخواست عضویت، حذف */}
      {editModalOpen && (
        <EditEventModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          eventId={selectedEvent?.id}
          role={userRole}
          phone={storedPhoneNumber}
          onEventUpdated={() => {
            if (activeTab === "owner") {
              fetchOwnerEvents();
            }
          }}
        />
      )}

      {joinRequestsModalOpen && (
        <JoinRequestsModal
          isOpen={joinRequestsModalOpen}
          onClose={() => setJoinRequestsModalOpen(false)}
          eventId={selectedEvent?.id}
        />
      )}

      {deleteModalOpen && (
        <DeleteEventModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          eventId={selectedEvent?.id}
          ownerPhone={storedPhoneNumber}
          onEventDeleted={() => {
            if (activeTab === "owner") {
              fetchOwnerEvents();
            }
          }}
        />
      )}
    </div>
  );
};

export default MyEventsTab;
