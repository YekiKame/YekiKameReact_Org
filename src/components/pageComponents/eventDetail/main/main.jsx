import React from "react";
import PropTypes from "prop-types";
import styles from "./main.module.css";
import img from "../../../../assets/images/eventDetailMainPicture.png";
import RelatedEvents from "../relatedevent/relatedEvents.jsx";

const Main = ({ event }) => {
  console.log("main event sis ");
  console.log(event);
  return (
    <div className={styles["event-page"]}>
      <div className={styles["main-content"]}>
        {/* تصویر بالای صفحه */}
        <div className={styles["event-image"]}>
          <img src={img} alt="Event" className={styles["event-img"]} />
        </div>

        {/* توضیحات */}
        <div className={styles["event-description"]}>
          <h2 className={styles["section-title"]}>توضیحات</h2>
          <p className={styles["event-text"]}>{event.fullDescription}</p>
        </div>

        {/* شرکت کنندگان */}
        <div className={styles["participants"]}>
          <h2 className={styles["section-title"]}>شرکت کنندگان ({event.subscriberCount})</h2>
        </div>
        <div>
          <h2 className={styles["section-title"]}>رویدادهای مرتبط:</h2>
          <RelatedEvents />
          <button className={styles["custom-button"]}>مشاهده همه</button>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subscriberCount: PropTypes.number.isRequired,
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
export default Main;
