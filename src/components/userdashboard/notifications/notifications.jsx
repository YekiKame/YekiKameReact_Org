import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationCard from "../../common/notification/notificationCard.jsx";
import styles from "./notifications.module.css";

const Notifications = () => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "09123456789";
  const [activeTab, setActiveTab] = useState("events");
  const [systemNotices, setSystemNotices] = useState([]);
  const [eventNotices, setEventNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // دریافت اعلان‌های سیستمی
  const fetchSystemNotices = async () => {
    try {
      const query = `
        query {
          activeNotices {
            title
            content
          }
        }
      `;
      const response = await axios.post(
        "http://95.217.8.192:8000/graphql/",
        { query },
        { headers: { "Content-Type": "application/json" } }
      );
      setSystemNotices(response.data?.data?.activeNotices || []);
    } catch (err) {
      console.error("خطای دریافت اعلان‌های سیستمی:", err);
      setError("خطا در دریافت اعلان‌های سیستمی");
    }
  };

  // دریافت اعلان‌های رویداد
  const fetchEventNotices = async () => {
    try {
      setLoading(true);
      const query = `
        query {
          userNotifications(phone: "${storedPhoneNumber}") {
            eventId
            eventTitle
            statusMessage
            createdAt
            role
            isApproved
            userEventRoleId
          }
        }
      `;
      const response = await axios.post(
        "http://95.217.8.192:8000/graphql/",
        { query },
        { headers: { "Content-Type": "application/json" } }
      );
      setEventNotices(response.data?.data?.userNotifications || []);
    } catch (err) {
      console.error("خطای دریافت اعلان‌های رویداد:", err.response?.data || err.message);
      setError("خطا در دریافت اعلان‌های رویداد");
    } finally {
      setLoading(false);
    }
  };

  // حذف اعلان رویداد
  const handleDeleteNotification = async (userEventRoleId) => {
    try {
      const query = `
        query {
          markNotificationAsRead(userEventRoleId: "${userEventRoleId}", phone: "${storedPhoneNumber}")
        }
      `;
      const response = await axios.post(
        "http://95.217.8.192:8000/graphql/",
        { query },
        { headers: { "Content-Type": "application/json" } }
      );
      const result = response.data?.data?.markNotificationAsRead;

      if (result) {
        setEventNotices((prev) =>
          prev.filter((notice) => notice.userEventRoleId !== userEventRoleId)
        );
      } else {
        console.error("Failed to delete notification: Response was false");
      }
    } catch (err) {
      console.error("خطای حذف اعلان:", err.response?.data || err.message);
    }
  };

  // دریافت داده‌ها هنگام بارگذاری
  useEffect(() => {
    fetchSystemNotices();
    fetchEventNotices();
  }, []);

  // پیام خالی
  const renderEmptyState = (message) => (
    <div className={styles.emptyState}>{message}</div>
  );

  // رندر اعلان‌ها
  const renderNotifications = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    const notices = activeTab === "events" ? eventNotices : systemNotices;

    if (notices.length === 0) {
      return renderEmptyState(
        activeTab === "events"
          ? "هیچ اعلان رویدادی موجود نیست."
          : "هیچ پیام سیستمی موجود نیست."
      );
    }

    return notices.map((notice) => (
      <NotificationCard
        key={notice.userEventRoleId || notice.title}
        type={
          activeTab === "events"
            ? notice.isApproved
              ? "accepted"
              : "rejected"
            : "admin"
        }
        title={notice.eventTitle || notice.title || "بدون عنوان"}
        description={notice.statusMessage || notice.content}
        date={
          activeTab === "events"
            ? new Date(notice.createdAt).toLocaleDateString("fa-IR")
            : "--"
        }
        time={
          activeTab === "events"
            ? new Date(notice.createdAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--"
        }
        {...(activeTab === "events" && {
          buttonText: "مشاهده جزئیات رویداد",
          eventId: notice.eventId,
          onDelete: () => handleDeleteNotification(notice.userEventRoleId),
        })}
      />
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>اعلانات</h1>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "events" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("events")}
        >
          اعلانات رویدادها ({eventNotices.length})
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "system" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("system")}
        >
          پیام‌های سیستمی ({systemNotices.length})
        </button>
      </div>
      <div className={styles.notificationsList}>{renderNotifications()}</div>
    </div>
  );
};

export default Notifications;