import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./notificationcard.module.css";

const NotificationCard = ({ 
  type, 
  title, 
  description, 
  date, 
  time, 
  buttonText, 
  onClick, 
  eventId, 
  onDelete 
}) => {
  const navigate = useNavigate();

  const cardStyles = {
    admin: styles.adminCard,
    accepted: styles.acceptedCard,
    rejected: styles.rejectedCard,
  };

  // هندلر برای هدایت به صفحه جزئیات رویداد
  const handleViewEventDetails = () => {
    if (eventId) {
      navigate(`/eventDetail/${eventId}`);
    }
  };

  return (
    <div className={`${styles.card} ${cardStyles[type]}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.dateContainer}>
          <span className={styles.date}>{date}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.title}>{type === "admin" ? "پیام سیستمی" : title}</div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.mainTitle}>{type === "admin" ? "عنوان" : title}</div>
        <div className={styles.description}>{description}</div>

        {/* دکمه‌ها */}
        <div className={styles.buttonsRow}>
          {buttonText && (
            <button
              className={styles.actionButton}
              onClick={handleViewEventDetails}
            >
              {buttonText}
            </button>
          )}
          {onDelete && (
            <button
              className={styles.deleteButton}
              onClick={onDelete}
            >
              حذف اعلان
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

NotificationCard.propTypes = {
  type: PropTypes.oneOf(["admin", "accepted", "rejected"]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  buttonText: PropTypes.string,
  eventId: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

NotificationCard.defaultProps = {
  title: "بدون عنوان",
  description: "بدون توضیحات",
  date: "--",
  time: "--",
  buttonText: null,
  eventId: null,
  onClick: null,
  onDelete: null,
};

export default NotificationCard;
