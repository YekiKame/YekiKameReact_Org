import React from "react";
import { useState } from "react";
import "../../styles/Header.css"; // فایل استایل برای تنظیمات CSS
import Button from "../shared/Button"; // کامپوننت دکمه
import SearchIcon from "../../assets/icons/search.svg"; // آیکون جستجو
import LocationIcon from "../../assets/icons/location.svg"; // آیکون لوکیشن
import UserIcon from "../../assets/icons/user-square.svg"; // آیکون کاربر
import LoginIcon from "../../assets/icons/login.svg";
import Logo from "../../assets/icons/logo.svg";
import LoginModal from "../modals/LoginModal";

const Header = ({ isLoggedIn, city = "تهران" }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        {/* لوگو */}
        <div className="header__logo">
          <img src={Logo} alt="Logo" />
          <span>یکی کمه</span>
        </div>

        {/* بخش جستجو */}
        <div className="header__search">
          <div className="header__search-city">
            <input
              type="text"
              placeholder="جستجوی شهر"
              value={city}
              readOnly
              className="header__input"
            />
            <img src={LocationIcon} alt="Location" className="header__icon" />
          </div>
          <div className="header__search-event">
            <input
              type="text"
              placeholder="جستجوی رویداد"
              className="header__input"
            />
            <img src={SearchIcon} alt="Search" className="header__icon" />
          </div>
        </div>

        {/* منو */}
        <nav className="header__menu">
          <a href="/" className="header__link">
            صفحه اصلی
          </a>
          <a href="/about" className="header__link">
            درباره ما
          </a>
          <a href="/events" className="header__link">
            رویدادها
          </a>
        </nav>

        {/* دکمه‌ها */}
        <div className="header__actions">
          {isLoggedIn ? (
            <>
              <Button className="header__btn header__btn--primary" text="ثبت رویداد" />
              <Button
                className="header__btn header__btn--secondary"
                text="پنل من"
                icon={UserIcon}
              />
            </>
          ) : (
            <Button
              className="header__btn header__btn--primary"
              text="ورود / ثبت نام"
              icon={LoginIcon}
              onClick={openModal}
            />
          )}
        </div>
      </div>
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
