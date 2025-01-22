import React, { useState, useEffect, useRef } from "react";

import "./header.css";
import Button from "../../shared/button/button.jsx";
import SearchIcon from "../../../assets/icons/search.svg";
import LocationIcon from "../../../assets/icons/location.svg";
import LoginIcon from "../../../assets/icons/login.svg";
import Logo from "../../../assets/icons/logo.svg";
import LoginModal from "../../modals/login/loginModal.jsx";
import UserDropdown from "../userDropdown/UserDropdown";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("تهران");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null); // اضافه کردن ref
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("sessionToken");
    const phone = sessionStorage.getItem("userPhone");
    if (token && phone) {
      setIsLoggedIn(true);
      setUserName(phone);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  // اضافه کردن event listener برای کلیک خارج از دراپ‌داون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        const url = "https://iran-locations-api.ir/api/v1/fa/cities";
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

  const handleEventsClick = () => {
    navigate(`/eventList/${encodeURIComponent(searchTerm)}`);
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
          <Link to="/" className="header__link">
            صفحه اصلی
          </Link>
          <Link to="/aboutUs" className="header__link">
            درباره ما
          </Link>
          <div
            onClick={handleEventsClick}
            className="header__link"
            style={{ cursor: "pointer" }}
          >
            رویدادها
          </div>
        </nav>

        <div className="header__actions">
          {isLoggedIn ? (
            <div
              ref={dropdownRef}
              className="header__user-container"
              style={{ position: "relative" }}
            >
              <Button
                className="header__btn header__btn--secondary"
                text={userName}
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <UserDropdown onClose={() => setShowDropdown(false)} />
              )}
            </div>
          ) : (
            <Button
              className="header__btn header__btn--primary"
              text="ورود / ثبت نام"
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
