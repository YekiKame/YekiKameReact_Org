import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationCard from "../../common/notification/notificationCard.jsx";
import styles from "./notifications.module.css";

const Notifications = () => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "09123456789";
  const [activeTab, setActiveTab] = useState("events"); // تغییر تب پیش‌فرض به "events"
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
      const response = await axios.post("http://95.217.8.192:8000/graphql/", { query });
      const notices = response.data?.data?.activeNotices || [];
      setSystemNotices(notices);
    } catch (err) {
      console.error("خطایی در دریافت اعلان‌های سیستمی:", err);
      setError("خطایی در دریافت اعلان‌های سیستمی رخ داد.");
    }
  };

  // دریافت اعلان‌های رویداد
  const fetchEventNotices = async () => {
    try {
      setLoading(true);

      const query = `
        query {
          userNotifications(phone: "${storedPhoneNumber}") {
            eventTitle
            statusMessage
            role
            isApproved
            createdAt
            id
          }
        }
      `;

      const response = await axios.post("http://95.217.8.192:8000/graphql/", { query });

      if (response.data?.data) {
        const notifications = response.data.data.userNotifications || [];
        setEventNotices(notifications);
      } else {
        console.error("پاسخ غیرمنتظره:", response.data);
        setError("خطا در دریافت داده‌های اعلان‌های رویداد.");
      }
    } catch (err) {
      console.error("خطایی در دریافت اعلان‌های رویداد:", err.response?.data || err.message);
      setError("خطایی در دریافت اعلان‌های رویداد رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  // حذف اعلان رویداد
  const handleDeleteNotification = async (notificationId) => {
    try {
      const query = `
        mutation {
          markNotificationAsRead(userEventRoleId: "${notificationId}", phone: "${storedPhoneNumber}") {
            success
            message
          }
        }
      `;

      const response = await axios.post("http://95.217.8.192:8000/graphql/", { query });
      const result = response.data?.data?.markNotificationAsRead;

      if (result?.success) {
        // حذف اعلان از لیست
        setEventNotices((prev) =>
          prev.filter((notice) => notice.id !== notificationId)
        );
      } else {
        console.error("Failed to delete notification:", result.message);
      }
    } catch (err) {
      console.error("خطایی در حذف اعلان:", err);
    }
  };

  // گرفتن اعلان‌ها هنگام بارگذاری کامپوننت
  useEffect(() => {
    fetchSystemNotices();
    fetchEventNotices();
  }, []);

  // نمایش پیام خالی
  const renderEmptyState = (message) => (
    <div className={styles.emptyState}>{message}</div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>اعلانات</h1>

      {/* تب‌ها */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "events" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("events")}
        >
          اعلانات رویدادها ({eventNotices.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "system" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("system")}
        >
          پیام‌های سیستمی ({systemNotices.length})
        </button>
      </div>

      {/* لیست اعلان‌ها */}
      <div className={styles.notificationsList}>
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : activeTab === "events" ? (
          eventNotices.length > 0 ? (
            eventNotices.map((notice) => (
              <NotificationCard
                key={notice.id}
                type={notice.isApproved ? "accepted" : "rejected"}
                title={notice.eventTitle}
                description={notice.statusMessage}
                date={new Date(notice.createdAt).toLocaleDateString("fa-IR")}
                time={new Date(notice.createdAt).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                buttonText="مشاهده جزئیات رویداد"
                eventId={notice.id}
                onDelete={() => handleDeleteNotification(notice.id)}
              />
            ))
          ) : (
            renderEmptyState("هیچ اعلان رویدادی موجود نیست.")
          )
        ) : systemNotices.length > 0 ? (
          systemNotices.map((notice, index) => (
            <NotificationCard
              key={index}
              type="admin"
              title={notice.title || "بدون عنوان"}
              description={notice.content}
              date="--"
              time="--"
            />
          ))
        ) : (
          renderEmptyState("هیچ پیام سیستمی موجود نیست.")
        )}
      </div>
    </div>
  );
};

export default Notifications;
