import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./header.css";
import Button from "../../shared/button/button.jsx";
import SearchIcon from "../../../assets/icons/search.svg";
import LocationIcon from "../../../assets/icons/location.svg";
import LoginIcon from "../../../assets/icons/login.svg";
import Logo from "../../../assets/icons/logo.svg";
import LoginModal from "../../modals/login/loginModal.jsx";
import UserDropdown from "../userDropdown/UserDropdown";
import { useNavigate, Link, useLocation, data } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("تهران");
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null); // اضافه کردن ref
  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showEventDropdown, setShowEventDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

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
  const handleHomeClick = (e) => {
    e.preventDefault(); // جلوگیری از رفتار پیش‌فرض لینک
    setEventSearchTerm(""); // خالی کردن جستجوی رویدادها
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  useEffect(() => {
    // چک کردن path فعلی
    if (location.pathname.startsWith("/eventList/")) {
      const cityFromUrl = decodeURIComponent(
        location.pathname.split("/eventList/")[1]
      );
      if (cityFromUrl) {
        setSearchTerm(cityFromUrl);
      }
    }
  }, [location.pathname]); // اجرا می‌شود هر وقت path تغییر کند
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
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  const handleAboutusClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEventsClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    navigate(`/eventList/${encodeURIComponent(searchTerm)}`);
    // اضافه کردن یک تایمر کوتاه برای اطمینان از اینکه navigate اول انجام شود
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const searchEvents = async (searchTerm) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/graphql/", {
        query: `
          query SearchEventsByTitle($title: String!) {
            searchEventsByTitle(title: $title) {
              id
              title
              eventCategory
              aboutEvent
              image
              startDate
              city
              neighborhood
            }
          }
        `,
        variables: {
          title: searchTerm,
        },
      });

      const events = response.data.data.searchEventsByTitle;
      setSearchResults(events);
      setShowEventDropdown(true);
    } catch (error) {
      console.error("Error searching events:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // اضافه کردن useEffect برای debounce کردن جستجو
  useEffect(() => {
    if (eventSearchTerm.trim()) {
      setIsSearching(true);
      // پاک کردن تایمر قبلی
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // ست کردن تایمر جدید
      searchTimeoutRef.current = setTimeout(() => {
        searchEvents(eventSearchTerm);
      }, 500); // تاخیر 500 میلی‌ثانیه
    } else {
      setSearchResults([]);
      setShowEventDropdown(false);
      setIsSearching(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [eventSearchTerm]);
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={handleLogoClick}>
          <img src={Logo} alt="Logo" />
        </Link>

        <div className="header__search">
          <div className="header__search-event">
            <div
              className="header__search-event-container"
              style={{ position: "relative" }}
            >
              <input
                type="text"
                placeholder="جستجوی رویداد"
                className="header__input"
                value={eventSearchTerm}
                onChange={(e) => setEventSearchTerm(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) {
                    setShowEventDropdown(true);
                  }
                }}
              />
              <img src={SearchIcon} alt="Search" className="header__icon" />

              {/* دراپ‌داون نتایج جستجو */}
              {showEventDropdown && (
                <div
                  className="header__search-dropdown"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 1000,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  {isSearching ? (
                    <div
                      className="header__search-loading"
                      style={{ padding: "10px", textAlign: "center" }}
                    >
                      در حال جستجو...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((event) => (
                      <div
                        key={event.id}
                        className="header__search-item"
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid #eee",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/eventdetail/${event.id}`);
                          setShowEventDropdown(false);
                          setEventSearchTerm("");
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f5f5f5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "white";
                        }}
                      >
                        <div style={{ fontWeight: "bold" }}>{event.title}</div>
                        <div style={{ fontSize: "0.9em", color: "#666" }}>
                          {event.city} - {event.neighborhood}
                        </div>
                      </div>
                    ))
                  ) : (
                    eventSearchTerm && (
                      <div
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          color: "#666",
                        }}
                      >
                        نتیجه‌ای یافت نشد
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
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
          <Link to="/" className="header__link" onClick={handleHomeClick}>
            صفحه اصلی
          </Link>
          <Link
            to="/aboutUs"
            className="header__link"
            onClick={handleAboutusClick}
          >
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
