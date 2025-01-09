import React from "react";
import PropTypes from "prop-types";
import styles from "./main.module.css";
import img from "../../../../assets/images/eventDetailMainPicture.png";
import RelatedEvents from "../relatedevent/relatedEvents.jsx";

const Main = () => {
  return (
    <div className={styles["event-page"]}>
      <div className={styles["main-content"]}>
        {/* تصویر بالای صفحه */}
        <div className={styles["event-image"]}>
          <img src={img} alt="Event" className={styles["event-img"]} />
        </div>

        {/* توضیحات */}
        <div className={styles["event-description"]}>
          <h2 className={styles["section-title"]}>توضیحات</h2>
          <p className={styles["event-text"]}>
            زندگی سفری است که هر روز آن پر از ناشناخته‌ها و فرصت‌های جدید است.
            انسان‌ها در این مسیر با چالش‌ها، موفقیت‌ها و گاهی شکست‌ها روبرو
            می‌شوند. اما همین مسیر پرپیچ‌وخم است که به زندگی معنا می‌بخشد. اگر
            به لحظات کوچک و ساده زندگی توجه کنیم، متوجه می‌شویم که زیبایی واقعی
            در همین لحظات نهفته است. یک لبخند، یک طلوع آفتاب یا حتی یک گفتگوی
            ساده می‌تواند روز ما را روشن کند. در دنیای امروز، سرعت زندگی به قدری
            زیاد شده که گاهی فراموش می‌کنیم لحظه‌ای توقف کنیم و از آنچه داریم
            لذت ببریم. تکنولوژی و پیشرفت‌های مدرن، اگرچه زندگی را آسان‌تر
            کرده‌اند، اما گاهی ما را از ارتباطات انسانی دور کرده‌اند. شاید بهتر
            باشد گاهی گوشی‌های خود را کنار بگذاریم و زمانی را با خانواده و
            دوستان خود سپری کنیم. این لحظات ناب، ارزشمندتر از هر چیزی هستند. یکی
            از مهم‌ترین درس‌هایی که زندگی به ما می‌آموزد، اهمیت پذیرش تغییر است.
            تغییر بخشی جدایی‌ناپذیر از زندگی است و مقاومت در برابر آن تنها باعث
            سخت‌تر شدن مسیر می‌شود. اگر یاد بگیریم که تغییرات را بپذیریم و از
            آنها به عنوان فرصتی برای رشد استفاده کنیم، زندگی برایمان آسان‌تر و
            لذت‌بخش‌تر خواهد شد. هر پایان می‌تواند آغازی جدید باشد، اگر با دید
            مثبت به آن نگاه کنیم. همچنین، نباید فراموش کنیم که هر فردی در این
            دنیا داستانی منحصر به فرد دارد. قضاوت کردن دیگران بدون شناخت کامل از
            شرایط آنها، تنها باعث ایجاد فاصله می‌شود. بهتر است به جای قضاوت، سعی
            کنیم با همدلی و درک متقابل به دیگران نزدیک شویم. دنیا جای بهتری
            خواهد شد اگر همه ما کمی مهربان‌تر و صبورتر باشیم. در نهایت، زندگی
            فرصتی است که نباید آن را هدر داد. هر روز، هر لحظه و هر تجربه‌ای
            می‌تواند به ما چیزی بیاموزد. اگر با عشق، امید و شکرگزاری به زندگی
            نگاه کنیم، حتی در سخت‌ترین شرایط نیز می‌توانیم آرامش و شادی را پیدا
            کنیم. زندگی کوتاه است، پس بهتر است آن را با تمام وجود زندگی کنیم و
            از هر لحظه‌اش لذت ببریم.
          </p>
        </div>

        {/* شرکت کنندگان */}
        <div className={styles["participants"]}>
          <h2 className={styles["section-title"]}>شرکت کنندگان (۳۲)</h2>
        </div>
        <div>
          <h2 className={styles["section-title"]}>رویدادهای مرتبط:</h2>
          <RelatedEvents />
          <button className={styles["custom-button"]}>مشاهده همه</button>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    aboutEvent: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    neighborhood: PropTypes.string.isRequired,
    postalAddress: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
    registrationStartDate: PropTypes.string.isRequired,
    registrationEndDate: PropTypes.string.isRequired,
    fullDescription: PropTypes.string.isRequired,
    maxSubscribers: PropTypes.number.isRequired,
    eventOwner: PropTypes.shape({
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default Main;
