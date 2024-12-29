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
  const [activeCategory, setActiveCategory] = useState(null);
  const [location, setLocation] = useState("");
  const [hasImage, setHasImage] = useState(false); // State for toggle

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

  const handleToggleChange = () => {
    setHasImage((prev) => !prev);
  };

  return (
    <div className={styles["filter-container"]}>
      {/* Categories Section */}
      <div className={styles["categories"]}>
        {categories.map((category) => (
          <div
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
          </div>
        ))}
      </div>

      {/* Location Section */}
      <div className={styles["location"]}>
        
        <label htmlFor="location-input" className={styles["label"]}>
          محل
        </label>
        <div className={styles["location-input-wrapper"]}>
          <img
            src={LocationIcon}
            alt="Location Icon"
            className={styles["input-icon"]}
          />
          <input
            type="text"
            id="location-input"
            list="locations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="تعیین محل"
            className={styles["location-input"]}
          />
          <datalist id="locations">
            {locations.map((loc, index) => (
              <option key={index} value={loc} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Event Status Toggle */}
      <div className={styles["event-status"]}>
        <label htmlFor="hasImage" className={styles["label"]}>
          وضعیت رویداد
        </label>
        <div className={styles["toggle"]}>
          <input
            type="checkbox"
            id="hasImage"
            checked={hasImage}
            onChange={handleToggleChange}
            className={styles["toggle-input"]}
          />
          <label htmlFor="hasImage" className={styles["toggle-label"]}>
            <span className={styles["slider"]}></span>
          </label>
          <span className={styles["toggle-text"]}>عکس دار</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
