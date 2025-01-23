import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./eventsidebar.module.css";
import axios from "axios";
import TimerIcon from "../../../../assets/icons/timer.svg";
import LocationIcon from "../../../../assets/icons/location2.svg";

import leisureIcon from "../../../../assets/icons/entertainment2.svg";
import sportIcon from "../../../../assets/icons/sport.svg";
import cultureIcon from "../../../../assets/icons/art.svg";
import educationIcon from "../../../../assets/icons/education.svg";
import gameIcon from "../../../../assets/icons/entertainment.svg";

const SideBar = ({ event }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // بررسی وضعیت لاگین کاربر
  const userPhone = sessionStorage.getItem("userPhone");
  const isLoggedIn = Boolean(userPhone);

  // چک کردن امکان عضویت در رویداد
  const canJoinEvent = () => {
    const now = new Date();
    const registrationEndDate = new Date(event.registrationEndDate);
    const registrationStartDate = new Date(event.registrationStartDate);

    return (
      isLoggedIn && // اضافه کردن شرط لاگین بودن
      event.subscriberCount < event.maxSubscribers &&
      now < registrationEndDate &&
      now >= registrationStartDate
    );
  };

  // درخواست عضویت در رویداد
  const handleJoinRequest = async () => {
    if (!isLoggedIn) {
      setError("لطفا ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/graphql/", {
        query: `
          mutation RequestJoinEvent($eventId: ID!, $phone: String!) {
            requestJoinEvent(eventId: $eventId, phone: $phone) {
              success
              message
            }
          }
        `,
        variables: {
          eventId: event.id,
          phone: userPhone, // استفاده از شماره تلفن کاربر لاگین شده
        },
      });

      const { success, message } = response.data.data.requestJoinEvent;

      if (success) {
        setSuccessMessage(message);
      } else {
        setError(message);
      }
    } catch (err) {
      setError(err.message || "خطا در ارسال درخواست");
    } finally {
      setIsLoading(false);
    }
  };

  // متن دکمه بر اساس وضعیت
  const getButtonText = () => {
    if (!isLoggedIn) return "لطفا وارد حساب کاربری خود شوید";
    if (isLoading) return "در حال ارسال درخواست...";
    if (!canJoinEvent()) {
      if (event.subscriberCount >= event.maxSubscribers) {
        return "ظرفیت تکمیل شده است";
      }
      return "مهلت ثبت‌نام به پایان رسیده است یا هنوز شروع نشده است.";
    }
    return "شرکت در رویداد";
  };
  const categoryIcons = {
    //   تفریحی: leisureIcon,
    //   ورزشی: sportIcon,
    //   فرهنگی: cultureIcon,
    //   آموزشی: educationIcon,
    // };
    entertainment: leisureIcon,
    sport: sportIcon,
    social: cultureIcon,
    education: educationIcon,
    game: gameIcon,
  };
  const categoryNames = {
    entertainment: "تفریحی",
    sport: "ورزشی",
    social: "فرهنگی",
    education: "آموزشی",
    game: "بازی و سرگرمی",
  };
  const eventStartDate = new Date(event.startDate);
  const formattedStartDate = eventStartDate.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const formattedStartTime = eventStartDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const persianStartDate = eventStartDate.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const eventEndDate = new Date(event.endDate);
  const formattedEndDate = eventEndDate.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const formattedEndTime = eventEndDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const persianEndDate = eventEndDate.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const eventStartRegDate = new Date(event.registrationStartDate);
  const formattedStartRegDate = eventStartRegDate.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const formattedStartRegTime = eventStartRegDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const persianStartRegDate = eventStartRegDate.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const eventEndRegDate = new Date(event.registrationEndDate);
  const formattedEndRegDate = eventEndRegDate.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const formattedEndRegTime = eventEndRegDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const persianEndRegDate = eventEndRegDate.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <div className={styles["event-card"]}>
      <h1 className={styles["event-title"]}>{event.title}</h1>
      <p className={styles["event-short-des"]}>{event.aboutEvent}</p>
      <div className={styles["event-details"]}>
        <div className={styles["event-detail"]}>
          <span className={styles["event-icon"]}>
            <img
              src={categoryIcons[event.eventCategory]}
              alt="Sport Icon"
              className={styles["event-image"]}
            ></img>
          </span>
          <span className={styles["event-text"]}>
            {categoryNames[event.eventCategory]}
          </span>
        </div>

        <div className={styles["event-detail"]}>
          <span className={styles["event-icon"]}>
            <img
              src={TimerIcon}
              alt="Timer Icon"
              className={styles["event-image"]}
            ></img>
          </span>
          <span className={styles["event-text"]}>
            <span>{`از ${persianStartDate}، ${formattedStartDate} ساعت ${formattedStartTime}`}</span>
            <span></span>
          </span>
        </div>

        <div className={styles["event-detail"]}>
          <span className={styles["event-icon"]}>
            <img
              src={TimerIcon}
              alt="Timer Icon"
              className={styles["event-image"]}
            ></img>
          </span>
          <span className={styles["event-text"]}>
            <span>{`تا ${persianEndDate}، ${formattedEndDate} ساعت ${formattedEndTime}`}</span>
            <span></span>
          </span>
        </div>

        <div className={styles["event-detail"]}>
          <span className={styles["event-icon"]}>
            <img
              src={LocationIcon}
              alt="Location Icon"
              className={styles["event-image"]}
            ></img>
          </span>
          <span
            className={styles["event-text"]}
          >{`${event.city} ${event.neighborhood} ${event.postalAddress} `}</span>
        </div>
      </div>

      <div className={styles["event-detail"]}>
        <span className={styles["event-icon"]}>
          <img
            src={TimerIcon}
            alt="Timer Icon"
            className={styles["event-image"]}
          ></img>
        </span>
        <span className={styles["event-text"]}>
          <span>{`${"تاریخ شروع ثبت نام:"} ${persianStartRegDate}، ${formattedStartRegDate} ساعت ${formattedStartRegTime}`}</span>
          <span></span>
        </span>
      </div>

      <div className={styles["event-detail"]}>
        <span className={styles["event-icon"]}>
          <img
            src={TimerIcon}
            alt="Timer Icon"
            className={styles["event-image"]}
          ></img>
        </span>
        <span className={styles["event-text"]}>
          <span>{`${"تاریخ پایان ثبت نام:"} ${persianEndRegDate}، ${formattedEndRegDate} ساعت ${formattedEndRegTime}`}</span>
          <span></span>
        </span>
      </div>
      {error && <p className={styles["error-message"]}>{error}</p>}
      {successMessage && (
        <p className={styles["success-message"]}>{successMessage}</p>
      )}
      <button
        className={`${styles["event-button"]} ${
          !canJoinEvent() ? styles["disabled"] : ""
        }`}
        onClick={handleJoinRequest}
        disabled={!canJoinEvent() || isLoading}
      >
        {getButtonText()}
      </button>

      {/* نمایش اطلاعات تکمیلی */}
      <div className={styles["event-stats"]}>
        <span>
          ظرفیت باقیمانده: {event.maxSubscribers - event.subscriberCount} نفر
        </span>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subscriberCount: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    eventCategory: PropTypes.string.isRequired,
    aboutEvent: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    neighborhood: PropTypes.string.isRequired,
    postalAddress: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    registrationStartDate: PropTypes.string.isRequired,
    registrationEndDate: PropTypes.string.isRequired,
    fullDescription: PropTypes.string.isRequired,
    maxSubscribers: PropTypes.number.isRequired,
    eventOwner: PropTypes.shape({
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SideBar;
