import React from "react";
import PropTypes from "prop-types";
import styles from "./eventsidebar.module.css";
import sportIcon from "../../../../assets/icons/sport.svg";
import TimerIcon from "../../../../assets/icons/timer.svg";
import LocationIcon from "../../../../assets/icons/location2.svg";

const SideBar = () => {
  return (
    <div className={styles["event-card"]}>
      <h1 className={styles["event-title"]}>بازی تنیس</h1>
      <p className={styles["event-short-des"]}>
        بازی تنیس مهیجی که ما برگزار میکنیم.
      </p>
      <div className={styles["event-details"]}>
        <div className={styles["event-detail"]}>
          <span className={styles["event-icon"]}>
            <img
              src={sportIcon}
              alt="Sport Icon"
              className={styles["event-image"]}
            ></img>
          </span>
          <span className={styles["event-text"]}>ورزشی</span>
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
            دوشنبه ۲۲ بهمن ۱۴۰۳ - ساعت ۲۲:۳۰
          </span>
        </div>
        {/* <a href="#" className={styles["add-to-calendar"]}>
          اضافه به تقویم
        </a> */}

        <div className={styles["event-detail"]}>
          <span className={styles["event-icon"]}>
            <img
              src={LocationIcon}
              alt="Location Icon"
              className={styles["event-image"]}
            ></img>
          </span>
          <span className={styles["event-text"]}>
            تهران میدان رسالت خیابان هنگام خیابان دانشگاه علم و صنعت پلاک ۳۵
            واحد ۳
          </span>
        </div>
      </div>

      <button className={styles["event-button"]}>شرکت در رویداد</button>
    </div>
  );
};

SideBar.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
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
