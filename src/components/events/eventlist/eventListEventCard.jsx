import React from "react";
import PropTypes from "prop-types";
import Button from "../../shared/button/button.jsx";
import styles from "./eventlisteventcard.module.css";

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
    <div className={styles["event-card"]}>
      <div className={styles["event-info"]}>
        <div className="event-info-text"></div>
        <div className="event-info-image"></div>
      </div>
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
