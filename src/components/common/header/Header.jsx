import React, { useState } from "react";
import "./header.css"; // فایل استایل برای تنظیمات CSS
import Button from "../../shared/button/Button"; // کامپوننت دکمه
import SearchIcon from "../../../assets/icons/search.svg"; // آیکون جستجو
import LocationIcon from "../../../assets/icons/location.svg"; // آیکون لوکیشن
import UserIcon from "../../../assets/icons/user-square.svg"; // آیکون کاربر
import LoginIcon from "../../../assets/icons/login.svg";
import Logo from "../../../assets/icons/logo.svg";
import LoginModal from "../../modals/login/LoginModal";

const Header = ({ isLoggedIn, city = "تهران", pageState = "home" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle color state change for buttons based on the page state
  const getButtonClass = (page) => {
    if (pageState === page) {
      return "header__btn--active";  // Class for active button
    }
    return "header__btn--default";  // Default button color (non-active)
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* لوگو */}
        <div className="header__logo">
          <img src={Logo} alt="Logo" />
        </div>

        {/* بخش جستجو */}
        <div className="header__search">
          <div className="header__search-event">
            <input
              type="text"
              placeholder="جستجوی رویداد"
              className="header__input"
            />
            <img src={SearchIcon} alt="Search" className="header__icon" />
          </div>
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
        </div>

        {/* منو */}
        <nav className="header__menu">
          <a href="/" className={`header__link ${getButtonClass("home")}`}>
            صفحه اصلی
          </a>
          <a href="/about" className={`header__link ${getButtonClass("about")}`}>
            درباره ما
          </a>
          <a href="/events" className={`header__link ${getButtonClass("events")}`}>
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
              onClick={openModal}
            >
              <img src={LoginIcon} alt="Login" className="header__icon" />
            </Button>
          )}
        </div>
      </div>
      {isModalOpen && <LoginModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
