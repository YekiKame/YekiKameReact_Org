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

  const categories = [
    { id: 1, name: "ورزشی", icon: sportIcon },
    { id: 2, name: "فرهنگی", icon: cultureIcon },
    { id: 3, name: "آموزشی", icon: educationIcon },
    { id: 4, name: "تفریحی", icon: leisureIcon },
  ];

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
  };

  const locations = ["تهران", "اصفهان", "شیراز", "مشهد", "تبریز"];

  return (
    <div className={styles["filter-container"]}>
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
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      <div className={styles["location"]}>
        <label>محل</label>
        <input
          list="locations"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="تعیین محل"
        />
        <datalist id="locations">
          {locations.map((loc, index) => (
            <option key={index} value={loc} />
          ))}
        </datalist>
      </div>

      <div className={styles["event-status"]}>
        <label>وضعیت رویداد</label>
        <div className={styles["toggle"]}>
          <input type="checkbox" id="hasImage" />
          <label htmlFor="hasImage">عکس دار</label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
