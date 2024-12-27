import React from "react";
import "./eventsidebar.module.css";
import sportIcon from "../../../../assets/icons/sport.svg";
import TimerIcon from "../../../../assets/icons/timer.svg";

const SideBar = () => {
  return (
    <div className="event-card">
      <h1 className="event-title">بازی تنیس</h1>

      <div className="event-details">
        <div className="event-detail">
          <span className="event-icon">
            <img src={sportIcon}></img>
          </span>
          <span className="event-text">ورزشی</span>
        </div>

        <div className="event-detail">
          <span className="event-icon">
            <img src={TimerIcon}></img>
          </span>
          <span className="event-text">دوشنبه ۲۲ بهمن ۱۴۰۳ - ساعت ۲۲:۳۰</span>
        </div>
        {/* <a href="#" className="add-to-calendar">
          اضافه به تقویم
        </a> */}

        <div className="event-detail">
          <span className="event-icon">📍</span>
          <span className="event-text">
            تهران میدان رسالت خیابان هنگام خیابان دانشگاه علم و صنعت پلاک ۳۵
            واحد ۳
          </span>
        </div>
      </div>

      <button className="event-button">شرکت در رویداد</button>
    </div>
  );
};

export default SideBar;
