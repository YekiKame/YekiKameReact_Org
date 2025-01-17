import React from "react";
import PropTypes from "prop-types";
import styles from "./eventsidebar.module.css";

import TimerIcon from "../../../../assets/icons/timer.svg";
import LocationIcon from "../../../../assets/icons/location2.svg";

import leisureIcon from "../../../../assets/icons/entertainment2.svg";
import sportIcon from "../../../../assets/icons/sport.svg";
import cultureIcon from "../../../../assets/icons/art.svg";
import educationIcon from "../../../../assets/icons/education.svg";
import gameIcon from "../../../../assets/icons/entertainment.svg";

0;
const SideBar = ({ event }) => {
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
      <button className={styles["event-button"]}>شرکت در رویداد</button>
    </div>
  );
};

SideBar.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
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
