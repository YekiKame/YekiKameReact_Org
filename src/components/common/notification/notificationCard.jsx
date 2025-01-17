import React from "react";
import styles from "./notificationcard.module.css";

const NotificationCard = ({ type, title, description, date, time, buttonText, onClick }) => {
  const cardStyles = {
    admin: styles.adminCard,
    accepted: styles.acceptedCard,
    rejected: styles.rejectedCard,
  };

  return (
    <div className={`${styles.card} ${cardStyles[type]}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.dateContainer}>
          <span className={styles.date}>{date}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.title}>{type === "admin" ? "ادمین یکی کمه" : title}</div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.mainTitle}>{type === "admin" ? "عنوان" : title}</div>
        <div className={styles.description}>{description}</div>
        {buttonText && (
          <button className={styles.actionButton} onClick={onClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;
