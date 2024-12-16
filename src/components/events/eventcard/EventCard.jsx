import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import styles from "./EventCard.module.css";

// ایمپورت آیکون‌ها از مسیر مشخص
import TimerIcon from "../../../assets/icons/timer.svg";
import UserIcon from "../../../assets/icons/user2.svg";
import LocationIcon from "../../../assets/icons/location2.svg";
import CategoryIcon from "../../../assets/icons/sport.svg";
import LeadingIcon from "../../../assets/icons/leading-icon.svg";

const EventCard = () => {
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // درخواست GraphQL برای دریافت اطلاعات رویداد
    const query = `
      query {
        event(id: "1") {
          name
          time
          day
          location
          members
          category
        }
      }
    `;

    axios
      .post(
        "http://127.0.0.1:8000/graphql/",
        { query },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setEventData(response.data?.data?.event);
      })
      .catch((err) => {
        console.error("Error fetching event data:", err);
        setError("مشکلی در بارگذاری اطلاعات رخ داد.");
      });
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!eventData) {
    return <div className={styles.loading}>در حال بارگذاری...</div>;
  }

  const { name, time, day, location, members, category } = eventData;

  return (
    <div className={styles.eventCard}>
      {/* تصویر */}
      <div className={styles.picture}>
        <img
          src="/assets/images/event-placeholder.jpg"
          alt="Event"
          className={styles.image}
        />
      </div>

      {/* محتوای کارت */}
      <div className={styles.content}>
        {/* نام رویداد */}
        <div className={styles.eventName}>{name}</div>

        {/* زمان و روز */}
        <div className={styles.eventTime}>
          <img src={TimerIcon} alt="زمان" className={styles.icon} />
          <span>{`${day} ساعت ${time}`}</span>
        </div>

        {/* اطلاعات رویداد */}
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <img src={UserIcon} alt="اعضا" className={styles.icon} />
            <span>{`${members} نفر`}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={LocationIcon} alt="مکان" className={styles.icon} />
            <span>{location}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={CategoryIcon} alt="دسته‌بندی" className={styles.icon} />
            <span>{category}</span>
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
  id: PropTypes.string,
};

export default EventCard;
