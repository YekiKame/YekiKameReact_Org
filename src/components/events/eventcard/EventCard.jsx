import React from "react";
import PropTypes from "prop-types";
import styles from "./EventCard.module.css";

// آیکون‌ها
import TimerIcon from "../../../assets/icons/timer.svg";
import UserIcon from "../../../assets/icons/user2.svg";
import LocationIcon from "../../../assets/icons/location2.svg";
import CategoryIcon from "../../../assets/icons/sport.svg";
import LeadingIcon from "../../../assets/icons/leading-icon.svg";

const EventCard = ({ title, eventCategory, subscriberCount, startDate, neighborhood, image }) => {
  // فرمت کردن تاریخ و زمان
  const eventDate = new Date(startDate);
  const formattedDate = eventDate.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const formattedTime = eventDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.eventCard}>
      {/* تصویر */}
      <div className={styles.picture}>
        <img src={image} alt="Event" className={styles.image} />
      </div>

      {/* محتوای کارت */}
      <div className={styles.content}>
        {/* نام رویداد */}
        <div className={styles.eventName}>{title}</div>

        {/* زمان و روز */}
        <div className={styles.eventTime}>
          <img src={TimerIcon} alt="زمان" className={styles.icon} />
          <span>{`${formattedDate} ساعت ${formattedTime}`}</span>
        </div>

        {/* اطلاعات رویداد */}
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <img src={UserIcon} alt="اعضا" className={styles.icon} />
            <span>{`${subscriberCount} نفر`}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={LocationIcon} alt="مکان" className={styles.icon} />
            <span>{neighborhood}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={CategoryIcon} alt="دسته‌بندی" className={styles.icon} />
            <span>{eventCategory}</span>
          </div>
        </div>

        {/* دکمه عضویت */}
        <button className={styles.joinButton}>
          <img src={LeadingIcon} alt="آیکون عضویت" className={styles.buttonIcon} />
          عضو شدن
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  eventCategory: PropTypes.string.isRequired,
  subscriberCount: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  neighborhood: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default EventCard;
