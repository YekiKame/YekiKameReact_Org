import React, { useState, useEffect } from "react";
import "./header.css";
import Button from "../../shared/button/button.jsx";
import SearchIcon from "../../../assets/icons/search.svg";
import LocationIcon from "../../../assets/icons/location.svg";
import UserIcon from "../../../assets/icons/user-square.svg";
import LoginIcon from "../../../assets/icons/login.svg";
import Logo from "../../../assets/icons/logo.svg";
import LoginModal from "../../modals/login/loginModal.jsx";
import { useNavigate, Link } from "react-router-dom";

const Header = ({ isLoggedIn, pageState = "home" }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("تهران"); // مقدار پیش‌فرض تهران
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // دریافت لیست شهرها از API
  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const url = `https://iran-locations-api.ir/api/v1/fa/cities`;
        const res = await fetch(url);
        const data = await res.json();
        const cityNames = data.map((city) => city.name);
        setCities(cityNames);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchAllCities();
  }, []);

  // فیلتر کردن شهرها بر اساس متن جستجو
  useEffect(() => {
    if (searchTerm && searchTerm !== "تهران") {
      const filtered = cities.filter((city) =>
        city.replace(/\s/g, "").startsWith(searchTerm.replace(/\s/g, ""))
      );
      setFilteredCities(filtered.slice(0, 10));
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm, cities]);

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // هندلر برای انتخاب شهر
  const handleCitySelect = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // هندلر برای کلیک روی رویدادها
  const handleEventsClick = () => {
    navigate(`/eventList/${encodeURIComponent(searchTerm)}`);
  };

  const getButtonClass = (page) => {
    if (pageState === page) {
      return "header__btn--active";
    }
    return "header__btn--default";
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" />
        </Link>

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="header__input"
              list="header-city-list"
              autoComplete="off"
            />
            <img src={LocationIcon} alt="Location" className="header__icon" />
            <datalist id="header-city-list">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>
        </div>

        <nav className="header__menu">
          <Link to="/" className={`header__link ${getButtonClass("home")}`}>
            صفحه اصلی
          </Link>
          <Link
            to="/aboutUs"
            className={`header__link ${getButtonClass("about")}`}
          >
            درباره ما
          </Link>
          <div
            onClick={handleEventsClick}
            className={`header__link ${getButtonClass("events")}`}
            style={{ cursor: "pointer" }}
          >
            رویدادها
          </div>
        </nav>

        <div className="header__actions">
          {isLoggedIn ? (
            <>
              <Button
                className="header__btn header__btn--primary"
                text="ثبت رویداد"
              />
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
