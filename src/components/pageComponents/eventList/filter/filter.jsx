import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./filter.module.css";
import LocationIcon from "../../../../assets/icons/location2.svg";
import leisureIcon from "../../../../assets/icons/entertainment2.svg";
import sportIcon from "../../../../assets/icons/sport.svg";
import cultureIcon from "../../../../assets/icons/art.svg";
import educationIcon from "../../../../assets/icons/education.svg";
import gameIcon from "../../../../assets/icons/entertainment.svg";

const Filter = ({ onFiltersChange, currentFilters }) => {
  const [activeCategory, setActiveCategory] = useState(
    currentFilters.eventCategory
  );
  const [location, setLocation] = useState(currentFilters.neighborhood || "");
  const [hasImage, setHasImage] = useState(currentFilters.hasImage);

  const categories = [
    { id: "sport", name: "ورزشی", icon: sportIcon },
    { id: "culture", name: "فرهنگی", icon: cultureIcon },
    { id: "education", name: "آموزشی", icon: educationIcon },
    { id: "leisure", name: "تفریحی", icon: leisureIcon },
    { id: "game", name: "بازی و سرگرمی", icon: gameIcon },
  ];

  const handleCategoryClick = (id) => {
    const newCategory = id === activeCategory ? null : id;
    setActiveCategory(newCategory);
    onFiltersChange({ eventCategory: newCategory });
  };

  const handleLocationChange = (e) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    onFiltersChange({ neighborhood: newLocation });
  };

  const handleToggleChange = () => {
    const newHasImage = !hasImage;
    setHasImage(newHasImage);
    onFiltersChange({ hasImage: newHasImage });
  };

  return (
    <div className={styles["filter-container"]}>
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
            value={location}
            onChange={handleLocationChange}
            placeholder="تعیین محل"
            className={styles["location-input"]}
            autoComplete="off"
          />
        </div>
        <div className={styles["seperator-line"]}></div>
      </div>

      <div className={styles["filter-section"]}>
        <h3 className={styles["section-title"]}>وضعیت رویداد</h3>
        <div className={styles["toggle-wrapper"]}>
          <span className={styles["toggle-text"]}>عکس دار</span>
          <label className={styles["toggle-label"]}>
            <input
              type="checkbox"
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

Filter.propTypes = {
  onFiltersChange: PropTypes.func.isRequired,
  currentFilters: PropTypes.object.isRequired,
};

export default Filter;
