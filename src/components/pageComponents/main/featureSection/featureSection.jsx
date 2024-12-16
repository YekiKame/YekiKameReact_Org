import React from "react";
import "/global.css";
import "./featureSection.css";
import FeatureCard from "./featureCard.jsx";

import ClockIcon from "../../../../assets/icons/ClockIcon.svg";
import LinkIcon from "../../../../assets/icons/LinkIcon.svg";
import StarIcon from "../../../../assets/icons/StarIcon.svg";
import FreeIcon from "../../../../assets/icons/FreeIcon.svg";

const FeaturesSection = () => {
  return (
    <div className="feature-section">
      <div className="container feature-container grid grid--2-cols-3fr-5fr grid--center-v">
        <div className="features-section">
          <div className="features-header"></div>
          <div className="features-grid">
            {/* second card */}
            <div className="feature-card">
              <div className="feature-icon">
                <img src={LinkIcon} alt="Link Icon" className="svg-icon" />
              </div>
              <h3 className="feature-title">
                ارتباط آسان و مستقیم با شرکت‌کنندگان
              </h3>
              <p className="feature-description">
                با ابزارهای ارتباطی می‌توانی به راحتی با اعضای تیم و
                شرکت‌کنندگان گفتگو کنی و هماهنگی‌ها را انجام دهی.
              </p>
            </div>
            {/* end of the second card */}
            {/* first card */}
            <div className="feature-card">
              <div className="feature-icon">
                <img src={ClockIcon} alt="clock Icon" className="svg-icon" />
              </div>
              <h3 className="feature-title">
                پیدا کردن افراد مناسب در کمترین زمان
              </h3>
              <p className="feature-description">
                در چند دقیقه، افراد مورد نظر برای رویدادت را پیدا کن و وقتت را
                کامل کن! نیازی به جستجوی طولانی نیست، ما اینجا هستیم تا کار را
                برایت ساده کنیم.
              </p>
            </div>
            {/* end of the first card */}

            {/* fourth card */}
            <div className="feature-card">
              <div className="feature-icon">
                <img src={FreeIcon} alt="divercity Icon" className="svg-icon" />
              </div>
              <h3 className="feature-title">کاملاً رایگان و بدون پیچیدگی</h3>
              <p className="feature-description">
                رویدادت را بدون هیچ هزینه‌ای ایجاد کن و از امکانات ساده و
                کاربردی ما استفاده کن.
              </p>
            </div>
            {/* end of the fourth card */}
            {/* third card */}
            <div className="feature-card">
              <div className="feature-icon">
                <img src={StarIcon} alt="divercity Icon" className="svg-icon" />
              </div>
              <h3 className="feature-title">مناسب برای هر نوع رویداد</h3>
              <p className="feature-description">
                چه به دنبال یک تیم فوتبال باشی، چه گروه مطالعه، یا هر چیز دیگر،
                'یکی کمه' با امکانات متنوع خود در خدمت توست.
              </p>
            </div>
            {/* end of the third card */}
          </div>
        </div>
        <div>
          <h2 className="features-title">ویژگی‌های یکی کمه</h2>
          <p className="features-subtitle">
            ما تمام سعی خود را می‌کنیم تا بهترین خدمات را به مشتریان ارائه دهیم.
          </p>
          <button className="features-button">مشاهده بیشتر</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
