import React from "react";
import "/global.css";
import "./createEvent.css";

const EventSection = () => {
  return (
    <div className="event-section">
      <div className="container event-container grid grid--2-cols grid--center-v">
        <div className="event-text">
          <h2 className="event-title">
            به دنبال پیدا کردن افراد برای شرکت در رویدادت هستی؟
          </h2>
          <div className="event-blue-border"></div>
          <p className="event-description">
            با چند کلیک، به راحتی رویدادت رو ایجاد کن و جمع خودت رو کامل کن! چه
            برای فوتبال، کلاس گروهی یا یک دورهمی دوستانه، می‌تونی آگهی بسازی و
            افرادی که به دنبال چنین فرصتی هستن رو جذب کنی. سیستم ما طوری طراحی
            شده که بهت کمک کنه در کمترین زمان افراد مناسب رو پیدا کنی.
          </p>
          <button className="event-button">ایجاد رویداد</button>
        </div>
        <div className="event-image">
          <img
            src="../../../src/assets/images/createevent.png"
            alt="Person using phone"
            className="event-image"
          />
        </div>
      </div>
    </div>
  );
};

export default EventSection;
