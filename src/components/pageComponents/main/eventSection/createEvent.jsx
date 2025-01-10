import React from "react";
import styles from "./createevent.module.css";
import boywithphone from "../../../../assets/images/createevent.png";
const EventSection = () => {
  return (
    <div className={styles["event-section"]}>
      <div
        className={`${styles["container"]} ${styles["event-container"]} ${styles["grid"]} ${styles["grid--2-cols"]} ${styles["grid--center-v"]}`}
      >
        <div className={styles["event-text"]}>
          <h2 className={styles["event-title"]}>
            به دنبال پیدا کردن افراد برای شرکت در رویدادت هستی؟
          </h2>
          <div className={styles["event-blue-border"]}></div>
          <p className={styles["event-description"]}>
            با چند کلیک، به راحتی رویدادت رو ایجاد کن و جمع خودت رو کامل کن! چه
            برای فوتبال، کلاس گروهی یا یک دورهمی دوستانه، می‌تونی آگهی بسازی و
            افرادی که به دنبال چنین فرصتی هستن رو جذب کنی. سیستم ما طوری طراحی
            شده که بهت کمک کنه در کمترین زمان افراد مناسب رو پیدا کنی.
          </p>
          <button className={styles["event-button"]}>ایجاد رویداد</button>
        </div>
        <div className={styles["event-image"]}>
          <img
            src={boywithphone}
            alt="Person using a phone"
            className={styles["event-image"]}
          />
        </div>
      </div>
    </div>
  );
};

export default EventSection;
