import React from "react";
import "./EventListEventCard.css";

const EventListEventCard = () => {
  return (
    <div className="event-card">
      <div className="event-card__image">
        <img
          src="https://via.placeholder.com/150" // لینک عکس را جایگزین کنید
          alt="Event"
        />
      </div>
      <div className="event-card__content">
        <h3 className="event-card__title">نام رویداد</h3>
        <ul className="event-card__details">
          <li>
            <span></span> دوشنبه ساعت 10:30
          </li>
          <li>
            <span></span> دسته‌بندی
          </li>
          <li>
            <span></span> مکان
          </li>
          <li>
            <span></span> 23 نفر
          </li>
        </ul>
        <button className="event-card__button">عضو شدن</button>
      </div>
    </div>
  );
};

export default EventListEventCard;
