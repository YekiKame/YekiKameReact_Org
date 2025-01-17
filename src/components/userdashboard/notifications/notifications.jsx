import React, { useState } from "react";
import NotificationCard from "../../common/notification/notificationCard.jsx";
import styles from "./notifications.module.css";

const Notifications = () => {
  // داده‌های فرضی (dummy data) برای تست
  const dummySystemNotices = [
    {
      content: "این یک اعلان سیستمی تستی است. لطفاً به آن توجه کنید.",
    },
    {
      content: "دومین پیام سیستمی برای بررسی تست.",
    },
  ];

  const dummyEventNotices = [
    {
      title: "رویداد اول",
      description: "درخواست شما برای عضویت در رویداد اول پذیرفته شد.",
      status: "accepted",
    },
    {
      title: "رویداد دوم",
      description: "درخواست شما برای عضویت در رویداد دوم رد شد.",
      status: "rejected",
    },
    {
      title: "رویداد سوم",
      description: "درخواست شما برای عضویت در رویداد سوم پذیرفته شد.",
      status: "accepted",
    },
  ];

  // مدیریت تب‌های فعال
  const [activeTab, setActiveTab] = useState("system");

  // نمایش پیام زمانی که لیست خالی است
  const renderEmptyState = (message) => (
    <div className={styles.emptyState}>{message}</div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>اعلانات</h1>

      {/* تب‌ها */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "system" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("system")}
        >
          پیام‌های سیستمی ({dummySystemNotices.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === "events" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("events")}
        >
          اعلانات رویدادها ({dummyEventNotices.length})
        </button>
      </div>

      {/* لیست اعلان‌ها */}
      <div className={styles.notificationsList}>
        {activeTab === "system" ? (
          dummySystemNotices.length > 0 ? (
            dummySystemNotices.map((notice, index) => (
              <NotificationCard
                key={index}
                type="admin"
                title="عنوان"
                description={notice.content}
                date="۱۴۰۳/۱۱/۱۲"
                time="۱۶:۱۶"
              />
            ))
          ) : (
            renderEmptyState("هیچ پیام سیستمی موجود نیست.")
          )
        ) : dummyEventNotices.length > 0 ? (
          dummyEventNotices.map((notice, index) => (
            <NotificationCard
              key={index}
              type={notice.status === "accepted" ? "accepted" : "rejected"}
              title={notice.title}
              description={notice.description}
              date="۱۴۰۳/۱۱/۱۲"
              time="۱۶:۱۶"
              buttonText="مشاهده جزئیات رویداد"
              onClick={() => alert("View Event Details!")}
            />
          ))
        ) : (
          renderEmptyState("هیچ اعلان رویدادی موجود نیست.")
        )}
      </div>
    </div>
  );
};

export default Notifications;
