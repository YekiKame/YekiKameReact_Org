import React from "react";
import styles from "./aboutus.module.css"; // فایل CSS ماژول برای استایل‌دهی

import ClockIcon from "../../assets/icons/ClockIcon.svg";
import LinkIcon from "../../assets/icons/LinkIcon.svg";
import StarIcon from "../../assets/icons/StarIcon.svg";
import FreeIcon from "../../assets/icons/FreeIcon.svg";
import amirhossein from "../../assets/images/amirhoessein.jpg";
import ali from "../../assets/images/ali.jpg";
import erfan from "../../assets/images/erfan.jpg";
import amirmohammad from "../../assets/images/amirmohammad.jpg";
import banner from "../../assets/images/Yekikamebanner.png";

const AboutUs = () => {
  return (
    <div className={styles["page-container"]}>
      <div className={styles["about-container"]}>
        {/* بخش اول - معرفی */}
        <section className={styles["intro-section"]}>
          <div className={styles["introduction"]}>
            <img src={banner} alt="YekiKame banner" />
            <div className={styles["text"]}>
              <h1>درباره ما</h1>
              <p>
                در دنیای امروز، برقراری ارتباط و ایجاد تعاملات اجتماعی با دیگران
                اهمیت بیشتری از همیشه پیدا کرده است. ما با افتخار نرم‌افزار “یکی
                کمه” را به عنوان یک پلتفرم وب‌محور معرفی می‌کنیم که به کاربران
                این امکان را می‌دهد تا رویدادهای اجتماعی متنوعی را ایجاد، مدیریت
                و به اشتراک بگذارند. این نرم‌افزار به شما کمک می‌کند تا به راحتی
                افرادی را که به شرکت در رویدادهای مختلف علاقه‌مند هستند پیدا
                کنید و با هم تجربه‌های به یادماندنی بسازید.
              </p>
              <p>
                تصور کنید که می‌خواهید یک مسابقه فوتبال در آخر هفته برگزار کنید،
                یا یک سفر ماجراجویانه به دل طبیعت داشته باشید، یا حتی یک رویداد
                خیریه برای کمک به نیازمندان ترتیب دهید. با “یکی کمه”، تمام این
                رویدادها به سادگی قابل برنامه‌ریزی و مدیریت هستند. کاربران
                می‌توانند به راحتی رویدادهای خود را ایجاد کنند و جزئیات آن را با
                دیگران به اشتراک بگذارند. همچنین، آن‌ها می‌توانند از طریق این
                پلتفرم با افرادی که علاقه‌مند به شرکت در این رویدادها هستند،
                ارتباط برقرار کنند و به جمع‌های بزرگ‌تری بپیوندند.
              </p>
              <p>
                ما به امنیت و حریم خصوصی کاربران خود اهمیت می‌دهیم و تمام تلاش
                خود را می‌کنیم تا فضایی امن و دوستانه برای برقراری ارتباط و
                تعاملات اجتماعی فراهم کنیم. با “یکی کمه”، شما می‌توانید به راحتی
                رویدادهای خود را مدیریت کرده و از امکانات متنوع این پلتفرم
                بهره‌برداری کنید.
              </p>
            </div>
          </div>
        </section>

        {/* بخش دوم - ویژگی‌ها */}
        <section className={styles["features-section"]}>
          <div className={styles["features-section-header"]}>
            <h2>ویژگی‌های یکی کمه</h2>
          </div>

          {/* ردیف اول */}
          <div className={styles["feature-row"]}>
            <div className={styles["feature-content"]}>
              <h3>پیدا کردن افراد مناسب در کمترین زمان</h3>
              <p>
                در چند دقیقه، افراد مورد نظر برای رویدادت را پیدا کن و وقتت را
                کامل کن! نیازی به جستجوی طولانی نیست، ما اینجا هستیم تا کار را
                برایت ساده کنیم.
              </p>
            </div>
            <div className={styles["feature-image"]}>
              <img src={ClockIcon} alt="Feature 1" />
            </div>
          </div>

          {/* ردیف دوم */}
          <div className={`${styles["feature-row"]} ${styles["reverse"]}`}>
            <div className={styles["feature-image"]}>
              <img src={LinkIcon} alt="Feature 2" />
            </div>
            <div className={styles["feature-content"]}>
              <h3>ارتباط آسان و مستقیم با شرکت‌کنندگان</h3>
              <p>
                با ابزارهای ارتباطی می‌توانی به راحتی با اعضای تیم و
                شرکت‌کنندگان گفتگو کنی و هماهنگی‌ها را انجام دهی.
              </p>
            </div>
          </div>

          {/* ردیف سوم */}
          <div className={styles["feature-row"]}>
            <div className={styles["feature-content"]}>
              <h3>کاملاً رایگان و بدون پیچیدگی</h3>
              <p>
                رویدادت را بدون هیچ هزینه‌ای ایجاد کن و از امکانات ساده و
                کاربردی ما استفاده کن.
              </p>
            </div>
            <div className={styles["feature-image"]}>
              <img src={FreeIcon} alt="Feature 3" />
            </div>
          </div>

          {/* ردیف چهارم */}
          <div className={`${styles["feature-row"]} ${styles["reverse"]}`}>
            <div className={styles["feature-image"]}>
              <img src={StarIcon} alt="Feature 4" />
            </div>
            <div className={styles["feature-content"]}>
              <h3>مناسب برای هر نوع رویداد</h3>
              <p>
                چه به دنبال یک تیم فوتبال باشی، چه گروه مطالعه، یا هر چیز دیگر،
                'یکی کمه' با امکانات متنوع خود در خدمت توست.
              </p>
            </div>
          </div>
        </section>

        {/* بخش سوم - تیم */}
        <section className={styles["team-section"]}>
          <h2>تیم ما</h2>
          <div className={styles["team-grid"]}>
            <div className={styles["team-member"]}>
              <div className={styles["member-image"]}>
                <img src={amirhossein} alt="Member 1" />
              </div>
              <h3>امیرحسین امین مقدم</h3>
              <p>دولوپر فرانت / طراح سایت</p>
            </div>
            <div className={styles["team-member"]}>
              <div className={styles["member-image"]}>
                <img src={ali} alt="Member 2" />
              </div>
              <h3>علی احمدی</h3>
              <p>دولوپر بک</p>
            </div>
            <div className={styles["team-member"]}>
              <div className={styles["member-image"]}>
                <img src={amirmohammad} alt="Member 3" />
              </div>
              <h3>امیرمحمد سالمی</h3>
              <p>دوآپس / اسکرام مستر</p>
            </div>
            <div className={styles["team-member"]}>
              <div className={styles["member-image"]}>
                <img src={erfan} alt="Member 4" />
              </div>
              <h3>عرفان افتخاری</h3>
              <p>دولوپر فرانت</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
