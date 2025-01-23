import React from "react";
import PropTypes from "prop-types";
import styles from "./eventcard.module.css";
import Button from "../../shared/button/button.jsx";

// آیکون‌ها
import NoPhoto from "../../../assets/images/noPhoto.jpg";
import TimerIcon from "../../../assets/icons/timer.svg";
import UserIcon from "../../../assets/icons/user2.svg";
import LocationIcon from "../../../assets/icons/location2.svg";
import leisureIcon from "../../../assets/icons/entertainment2.svg";
import sportIcon from "../../../assets/icons/sport.svg";
import cultureIcon from "../../../assets/icons/art.svg";
import educationIcon from "../../../assets/icons/education.svg";
import gameIcon from "../../../assets/icons/entertainment.svg";
import TrashIcon from "../../../assets/icons/trash.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import LeadingIcon from "../../../assets/icons/leading-icon.svg";

// دیکشنری برای آیکون‌های دسته‌بندی (نسخه انگلیسی)
const categoryIcons = {
  ENTERTAINMENT: leisureIcon,
  SPORT: sportIcon,
  SOCIAL: cultureIcon,
  EDUCATION: educationIcon,
  GAME: gameIcon,
};
// نام فارسی دسته‌بندی
const categoryNames = {
  ENTERTAINMENT: "تفریحی",
  SPORT: "ورزشی",
  SOCIAL: "فرهنگی",
  EDUCATION: "آموزشی",
  GAME: "بازی و سرگرمی",
};

/**
 * props:
 *   event: {id, title, eventCategory, subscriberCount, startDate, neighborhood, image}
 *   variant: "home" | "joined" | "myEvents"
 *   onJoin?: func  (وقتی مثلاً در حالت home/joined خواستید عمل «عضو شدن» یا «مشاهده جزییات» کنید)
 *   onEdit?: func  (حالت myEvents)
 *   onDelete?: func
 */
const EventCard = ({ event, variant, onJoin, onEdit, onDelete }) => {
  // استخراج فیلدها
  const {
    id,
    title,
    eventCategory,
    subscriberCount,
    startDate,
    neighborhood,
    image,
  } = event || {};

  // اگر خالی باشد
  const safeTitle = title || "بدون نام";
  const safeCategory = eventCategory || "ENTERTAINMENT";
  const safeImage = image || NoPhoto; // عکس پیشفرض
  const safeNeighborhood = neighborhood || "نامشخص";
  const safeCount = subscriberCount ?? 0;

  const categoryFa = categoryNames[safeCategory] || "سایر";
  const categoryIcon = categoryIcons[safeCategory] || leisureIcon;

  // فرمت تاریخ/ساعت
  let weekdayFa = "نامشخص";
  let timeFa = "--:--";
  if (startDate) {
    const dateObj = new Date(startDate);
    weekdayFa = dateObj.toLocaleDateString("fa-IR", { weekday: "long" });
    timeFa = dateObj.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // هندلرهای دکمه‌ها
  const handleDeleteClick = () => {
    if (typeof onDelete === "function") onDelete(id);
  };
  const handleEditClick = () => {
    if (typeof onEdit === "function") onEdit(id);
  };
  const handleJoinClick = () => {
    if (typeof onJoin === "function") onJoin(id);
  };

  return (
    <div className={styles.eventCard}>
      {/* عکس بالای کارت */}
      <div className={styles.picture}>
        <img src={safeImage} alt={"تصویر رویداد"} className={styles.image} />
      </div>

      {/* محتوای اصلی */}
      <div className={styles.content}>
        {/* نام رویداد */}
        <div className={styles.eventName}>{safeTitle}</div>

        {/* زمان رویداد */}
        <div className={styles.eventTime}>
          <img src={TimerIcon} alt="زمان" className={styles.icon} />
          <span>{`${weekdayFa} ساعت ${timeFa}`}</span>
        </div>

        {/* بخش اطلاعات */}
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <img src={UserIcon} alt="اعضا" className={styles.icon} />
            <span>{`${safeCount} نفر`}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={LocationIcon} alt="مکان" className={styles.icon} />
            <span>{safeNeighborhood}</span>
          </div>
          <div className={styles.infoItem}>
            <img src={categoryIcon} alt={categoryFa} className={styles.icon} />
            <span>{categoryFa}</span>
          </div>
        </div>

        {/* بخش پایینی کارت */}
        {variant === "home" && (
          <Button
            text="مشاهده جزئیات رویداد"
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
        )}

        {variant === "joined" && (
          <Button
            text="مشاهده جزئیات رویداد"
            customStyles={{ width: "100%" }}
            onClick={handleJoinClick}
          />
        )}

        {variant === "myEvents" && (
          <div className={styles.buttonsRow}>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={handleDeleteClick}
            >
              <img src={TrashIcon} alt="حذف" className={styles.btnIcon} />
            </button>
            <Button
              text="ویرایش جزئیات"
              customStyles={{ width: "20rem", height: "4rem" }}
              onClick={handleEditClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    eventCategory: PropTypes.string,
    subscriberCount: PropTypes.number,
    startDate: PropTypes.string,
    neighborhood: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(["home", "joined", "myEvents"]),
  onJoin: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

EventCard.defaultProps = {
  variant: "home",
};

export default EventCard;
