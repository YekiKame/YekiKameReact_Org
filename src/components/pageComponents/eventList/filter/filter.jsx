// Filter.jsx
import React, { useState } from "react";
import styles from "./filter.module.css";

import TimerIcon from "../../../../assets/icons/timer.svg";
import UserIcon from "../../../../assets/icons/user2.svg";
import LocationIcon from "../../../../assets/icons/location2.svg";
import LeadingIcon from "../../../../assets/icons/leading-icon.svg";
import leisureIcon from "../../../../assets/icons/entertainment.svg";
import sportIcon from "../../../../assets/icons/sport.svg";
import cultureIcon from "../../../../assets/icons/art.svg";
import educationIcon from "../../../../assets/icons/education.svg";

const Filter = () => {
  // تنظیم حالت پیش‌فرض سوئیچ تاگل به روشن
  const [activeCategory, setActiveCategory] = useState(null);
  const [location, setLocation] = useState("");
  const [hasImage, setHasImage] = useState(true); // حالت پیش‌فرض روشن

  const categories = [
    { id: 1, name: "ورزشی", icon: sportIcon },
    { id: 2, name: "فرهنگی", icon: cultureIcon },
    { id: 3, name: "آموزشی", icon: educationIcon },
    { id: 4, name: "تفریحی", icon: leisureIcon },
  ];

  const handleCategoryClick = (id) => {
    setActiveCategory(id === activeCategory ? null : id);
  };

  const locations = ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز"];

  // فیلتر کردن مکان‌ها بر اساس ورودی کاربر
  const filteredLocations = locations.filter((loc) => loc.startsWith(location));

  const handleToggleChange = () => {
    setHasImage((prev) => !prev);
  };

  return (
    <div className={styles["filter-container"]}>
      {/* فیلتر دسته‌ها */}
      <div className={styles["filter-section"]}>
        <h3 className={styles["section-title"]}>دسته</h3>
        <div className={styles["categories"]}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles["category-item"]} ${
                activeCategory === category.id ? styles["active"] : ""
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className={styles["icon"]}>
                <img src={category.icon} alt={`${category.name} icon`} />
              </span>
              <span className={styles["category-name"]}>{category.name}</span>
            </button>
          ))}
        </div>
        <div className={styles["seperator-line"]}></div>
      </div>

      {/* فیلتر محل */}
      <div className={styles["filter-section"]}>
        <h3 className={styles["section-title"]}>محل</h3>
        <div className={styles["location-wrapper"]}>
          <img
            src={LocationIcon}
            alt="Location Icon"
            className={styles["location-icon"]}
          />
          <input
            type="text"
            list="filtered-locations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="تعیین محل"
            className={styles["location-input"]}
            id="location-input"
            autoComplete="off"
          />
        </div>
        <datalist id="filtered-locations">
          {filteredLocations.map((loc, index) => (
            <option key={index} value={loc} />
          ))}
        </datalist>
        <div className={styles["seperator-line"]}></div>
      </div>

      {/* فیلتر وضعیت رویداد */}
      <div className={styles["filter-section"]}>
        <h3 className={styles["section-title"]}>وضعیت رویداد</h3>
        <div className={styles["toggle-wrapper"]}>
          <span className={styles["toggle-text"]}>عکس دار</span>
          <label className={styles["toggle-label"]}>
            <input
              type="checkbox"
              id="hasImage"
              checked={hasImage}
              onChange={handleToggleChange}
              className={styles["toggle-input"]}
            />
            <span className={styles["toggle-switch"]}></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
