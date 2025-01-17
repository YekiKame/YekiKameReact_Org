import React from "react";
import { useNavigate } from "react-router-dom";
import "/global.css";
import styles from "./featuresection.module.css";
import FeatureCard from "./featureCard.jsx";

import ClockIcon from "../../../../assets/icons/ClockIcon.svg";
import LinkIcon from "../../../../assets/icons/LinkIcon.svg";
import StarIcon from "../../../../assets/icons/StarIcon.svg";
import FreeIcon from "../../../../assets/icons/FreeIcon.svg";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const handleMoreClick = () => {
    navigate("/aboutus");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles["feature-section"]}>
      <div
        className={`${styles["container"]} ${styles["feature-container"]} ${styles["grid"]} ${styles["grid--2-cols-3fr-5fr"]} ${styles["grid--center-v"]}`}
      >
        <div className={styles["features-section"]}>
          <div className={styles["features-header"]}></div>
          <div className={styles["features-grid"]}>
            {/* second card */}
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>
                <img
                  src={LinkIcon}
                  alt="Link Icon"
                  className={styles["svg-icon"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>
                ارتباط آسان و مستقیم با شرکت‌کنندگان
              </h3>
              <p className={styles["feature-description"]}>
                با ابزارهای ارتباطی می‌توانی به راحتی با اعضای تیم و
                شرکت‌کنندگان گفتگو کنی و هماهنگی‌ها را انجام دهی.
              </p>
            </div>
            {/* end of the second card */}
            {/* first card */}
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>
                <img
                  src={ClockIcon}
                  alt="clock Icon"
                  className={styles["svg-icon"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>
                پیدا کردن افراد مناسب در کمترین زمان
              </h3>
              <p className={styles["feature-description"]}>
                در چند دقیقه، افراد مورد نظر برای رویدادت را پیدا کن و وقتت را
                کامل کن! نیازی به جستجوی طولانی نیست، ما اینجا هستیم تا کار را
                برایت ساده کنیم.
              </p>
            </div>
            {/* end of the first card */}

            {/* fourth card */}
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>
                <img
                  src={FreeIcon}
                  alt="divercity Icon"
                  className={styles["svg-icon"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>
                کاملاً رایگان و بدون پیچیدگی
              </h3>
              <p className={styles["feature-description"]}>
                رویدادت را بدون هیچ هزینه‌ای ایجاد کن و از امکانات ساده و
                کاربردی ما استفاده کن.
              </p>
            </div>
            {/* end of the fourth card */}
            {/* third card */}
            <div className={styles["feature-card"]}>
              <div className={styles["feature-icon"]}>
                <img
                  src={StarIcon}
                  alt="divercity Icon"
                  className={styles["svg-icon"]}
                />
              </div>
              <h3 className={styles["feature-title"]}>
                مناسب برای هر نوع رویداد
              </h3>
              <p className={styles["feature-description"]}>
                چه به دنبال یک تیم فوتبال باشی، چه گروه مطالعه، یا هر چیز دیگر،
                'یکی کمه' با امکانات متنوع خود در خدمت توست.
              </p>
            </div>
            {/* end of the third card */}
          </div>
        </div>
        <div>
          <h2 className={styles["features-title"]}>ویژگی‌های یکی کمه</h2>
          <p className={styles["features-subtitle"]}>
            ما تمام سعی خود را می‌کنیم تا بهترین خدمات را به مشتریان ارائه دهیم.
          </p>
          <button
            onClick={handleMoreClick}
            className={styles["features-button"]}
          >
            مشاهده بیشتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
