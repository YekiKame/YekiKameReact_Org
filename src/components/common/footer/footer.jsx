import React from "react";
import "./footer.css"; 
import TelegramIcon from "../../../assets/icons/telegram.svg"; // آیکون تلگرام
import InstagramIcon from "../../../assets/icons/Instagram.svg"; // آیکون اینستاگرام
import TwitterIcon from "../../../assets/icons/twitter.svg"; // آیکون توییتر
import Logo from "../../../assets/icons/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* لوگو و برند */}
        <div className="footer__logo">
          <img src={Logo} alt="Logo" />
        </div>

        {/* متن توضیحات */}
        <p className="footer__description">
          یکی کمه، با هدف ساده‌تر کردن ایجاد و مدیریت رویدادها طراحی شده است. به راحتی افراد مناسب برای فعالیت‌های خود را پیدا کنید و لحظاتی فراموش‌نشدنی بسازید. ما همواره در کنار شما هستیم!
        </p>

        {/* آیکون‌های شبکه‌های اجتماعی */}
        <div className="footer__social-icons">
          <a href="https://t.me/" target="_blank" rel="noreferrer">
            <img src={TelegramIcon} alt="تلگرام" />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <img src={InstagramIcon} alt="اینستاگرام" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer">
            <img src={TwitterIcon} alt="توییتر" />
          </a>
        </div>

        {/* لینک‌های ناوبری */}
        <div className="footer__menu">
          <a href="/" className="footer__link">صفحه اصلی</a>
          <a href="/eventList/تهران" className="footer__link">رویدادها</a>
          <a href="/aboutUs" className="footer__link">درباره ما</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
