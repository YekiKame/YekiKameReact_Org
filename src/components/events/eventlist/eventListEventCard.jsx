import React from "react";
import PropTypes from "prop-types";
import Button from "../../shared/button/button.jsx";
import styles from "./eventlisteventcard.css";

// آیکون‌ها
import TimerIcon from "../../../assets/icons/timer.svg";
import UserIcon from "../../../assets/icons/user2.svg";
import LocationIcon from "../../../assets/icons/location2.svg";
import LeadingIcon from "../../../assets/icons/leading-icon.svg";

const EventListEventCard = ({
  title,
  eventCategory,
  subscriberCount,
  startDate,
  neighborhood,
  image,
}) => {
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
            <img
              src={eventCategory.icon}
              alt={eventCategory.name}
              className={styles.icon}
            />
            <span>{eventCategory.name}</span>
          </div>
        </div>

        {/* دکمه عضویت */}
        <Button
          text={"عضو شدن"}
          customStyles={{ width: "100%" }}
          icon={
            <img
              src={LeadingIcon}
              alt="آیکون عضویت"
              style={{ width: "4.8rem", height: "2.4rem" }}
            />
          }
        />
      </div>
    </div>
  );
};

EventListEventCard.propTypes = {
  title: PropTypes.string.isRequired,
  eventCategory: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  subscriberCount: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  neighborhood: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default EventListEventCard;
