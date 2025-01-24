import React from "react";
import PropTypes from "prop-types";
import styles from "./main.module.css";

import defaultImage from "../../../../assets/images/eventDetailMainPicture.png";
import RelatedEvents from "../relatedevent/relatedEvents.jsx";
import NoPhoto from "../../../../assets/images/noPhoto.jpg";
/**
 * این کامپوننت اطلاعات رویداد را دریافت کرده و نمایش می‌دهد.
 * همچنین رویدادهای مرتبط را در پایین صفحه نشان می‌دهد.
 *
 * @param {{ event: {...} }} props
 */
const Main = ({ event }) => {
  // اگر event.image داشتید از آن استفاده کنید، وگرنه defaultImage
  const mainImage = event.image || defaultImage;

  return (
    <div className={styles["event-page"]}>
      <div className={styles["main-content"]}>
        {/* تصویر بالای صفحه */}
        <div className={styles["event-image"]}>
          <img
            src={event.image ? `http://127.0.0.1:8000/${event.image}` : NoPhoto}
            alt="Event"
            className={styles["event-img"]}
          />
        </div>

        {/* توضیحات */}
        <div className={styles["event-description"]}>
          <h2 className={styles["section-title"]}>توضیحات</h2>
          <p className={styles["event-text"]}>
            {event.fullDescription || "بدون توضیحات"}
          </p>
        </div>

        {/* شرکت کنندگان */}
        <div className={styles["participants"]}>
          <h2 className={styles["section-title"]}>
            شرکت کنندگان ({event.subscriberCount || 0})
          </h2>
          {/* در صورت نیاز، لیستی از کاربران یا هر کامپوننت دیگری */}
        </div>

        {/* بخش رویدادهای مرتبط */}
        <div>
          <h2 className={styles["section-title"]}>رویدادهای مرتبط:</h2>
          {/* حتماً event.id را بفرستید */}
          <RelatedEvents eventId={event.id} />
        </div>
      </div>
    </div>
  );
};

// در صورت تمایل، PropTypes را ساده کنید یا مستقیماً حذف کنید.
// فیلدهایی را بگذارید که واقعا در سرور وجود دارد و قصد نمایش دارید.
Main.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    subscriberCount: PropTypes.number,
    fullDescription: PropTypes.string,
  }),
};

export default Main;
