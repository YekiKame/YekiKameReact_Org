import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./herosection.module.css";
import SearchIcon from "../../../assets/icons/search.svg";
import { iranCities } from "../../../assets/iran/cities";

export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchAllCities = async () => {
  //     try {
  //       const url = `https://iran-locations-api.ir/api/v1/fa/cities`;
  //       const res = await fetch(url);
  //       const data = await res.json();
  //       const cityNames = data.map((city) => city.name);
  //       setCities(cityNames);
  //     } catch (err) {
  //       console.error("Error fetching cities:", err);
  //     }
  //   };
  //   fetchAllCities();
  // }, []);

  // useEffect(() => {
  //   if (searchTerm) {
  //     const filtered = cities.filter((city) =>
  //       city.replace(/\s/g, "").startsWith(searchTerm.replace(/\s/g, ""))
  //     );
  //     setFilteredCities(filtered.slice(0, 10));
  //   } else {
  //     setFilteredCities([]);
  //   }
  // }, [searchTerm, cities]);
  useEffect(() => {
    if (searchTerm && searchTerm !== "تهران") {
      const filtered = iranCities
        .filter((city) =>
          city.name.replace(/\s/g, "").startsWith(searchTerm.replace(/\s/g, ""))
        )
        .map((city) => city.name); // فقط نام شهرها رو می‌گیریم
      setFilteredCities(filtered.slice(0, 10));
    } else {
      setFilteredCities([]);
    }
  }, [searchTerm]);

  const defaultCities = [
    "اصفهان",
    "شیراز",
    "کرج",
    "مشهد",
    "تهران",
    "رشت",
    "قم",
    "کرمانشاه",
    "تبریز",
    "اهواز",
  ];

  // هندلر برای ارسال فرم (وقتی اینتر زده میشه)
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/eventList/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // هندلر برای کلیک روی شهرها
  const handleCityClick = (city) => {
    navigate(`/eventList/${encodeURIComponent(city)}`);
  };

  // هندلر برای تغییر متن جستجو
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{"فقط یکی کمه"}</h1>
        </div>
        <p className={styles.description}>
          {
            "اگه تیمت برای تشکیل یک رویداد، کامل نیست و دنبال یک نفر می‌گردی که تیمتو تکمیل کنی جای درستی اومدی :)"
          }
        </p>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <div className={styles.searchContainer}>
            <img
              src={SearchIcon}
              alt="search icon"
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="جستجوی شهر"
              value={searchTerm}
              onChange={handleInputChange}
              className={styles.searchInput}
              list="city-list"
              autoComplete="off"
            />
            <datalist id="city-list">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>
        </form>

        <div className={styles.citiesSection}>
          <h2 className={styles.citiesTitle}>شهرهای پربازدید</h2>
          <div className={styles.citiesContainer}>
            {defaultCities.map((city, index) => (
              <button
                key={index}
                className={styles.cityButton}
                onClick={() => handleCityClick(city)}
              >
                <div className={styles.buttonContent}>
                  <div className={styles.cityName}>{city}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
