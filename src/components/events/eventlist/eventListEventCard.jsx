import React from "react";
import PropTypes from "prop-types";
import Button from "../../shared/button/button.jsx";
import styles from "./eventlisteventcard.module.css";
import { useNavigate } from "react-router-dom";

import NoPhoto from "../../../assets/images/noPhoto.jpg";

import TimerIcon from "../../../assets/icons/timer.svg";
import UserIcon from "../../../assets/icons/user2.svg";
import LocationIcon from "../../../assets/icons/location2.svg";
import LeadingIcon from "../../../assets/icons/leading-icon.svg";
import leisureIcon from "../../../assets/icons/entertainment2.svg";
import sportIcon from "../../../assets/icons/sport.svg";
import cultureIcon from "../../../assets/icons/art.svg";
import educationIcon from "../../../assets/icons/education.svg";
import gameIcon from "../../../assets/icons/entertainment.svg";
const EventListEventCard = ({
  id,
  title,
  eventCategory,
  subscriberCount,
  startDate,
  neighborhood,
  image,
}) => {
  const navigate = useNavigate();
  const categoryIcons = {
    //   تفریحی: leisureIcon,
    //   ورزشی: sportIcon,
    //   فرهنگی: cultureIcon,
    //   آموزشی: educationIcon,
    // };
    ENTERTAINMENT: leisureIcon,
    SPORT: sportIcon,
    SOCIAL: cultureIcon,
    EDUCATION: educationIcon,
    GAME: gameIcon,
  };
  const categoryNames = {
    ENTERTAINMENT: "تفریحی",
    SPORT: "ورزشی",
    SOCIAL: "فرهنگی",
    EDUCATION: "آموزشی",
    GAME: "بازی و سرگرمی",
  };
  const eventDate = new Date(startDate);
  const formattedDate = eventDate.toLocaleDateString("fa-IR", {
    weekday: "long",
  });
  const formattedTime = eventDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const handleJoinClick = () => {
    navigate(`/eventdetail/${id}`);
  };

  return (
    <div className={styles["event-card"]}>
      <div className={styles["event-info"]}>
        <div className={styles["event-info-text"]}>
          <div className={styles["enent-card-title"]}>{title}</div>
          <div className={styles["eventTime"]}>
            <img src={TimerIcon} alt="زمان" className={styles["icon"]} />
            <span>{`${formattedDate} ساعت ${formattedTime}`}</span>
          </div>
          <div className={styles["infoItem"]}>
            <img
              src={categoryIcons[eventCategory]} // انتخاب آیکون بر اساس دسته‌بندی
              alt={eventCategory}
              className={styles["icon"]}
            />
            <div>{categoryNames[eventCategory]}</div>
          </div>
          <div className={styles["event-card-info-subinfo"]}>
            <div className={styles["infoItem"]}>
              <img src={LocationIcon} alt="مکان" className={styles["icon"]} />
              <span>{neighborhood}</span>
            </div>
            <div className={styles["infoItem"]}>
              <img src={UserIcon} alt="اعضا" className={styles["icon"]} />
              <span>{`${subscriberCount} نفر`}</span>
            </div>
          </div>
        </div>

        <div className={styles["event-info-image"]}>
          <img src={image || NoPhoto} alt="Event" className={styles["image"]} />
        </div>
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
        onClick={handleJoinClick}
      />
    </div>
  );
};

EventListEventCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  eventCategory: PropTypes.string.isRequired,
  subscriberCount: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  neighborhood: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default EventListEventCard;
