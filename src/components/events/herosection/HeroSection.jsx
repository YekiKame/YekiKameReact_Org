// HeroSection.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HeroSection.module.css";

export const HeroSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // لیست ده شهر پیش‌فرض
    const defaultCities = [
        'اصفهان',
        'شیراز',
        'کرج',
        'مشهد',
        'تهران',
        'رشت',
        'قم',
        'کرمانشاه',
        'تبریز',
        'اهواز',
    ];
    
    // هندلر برای ارسال جستجو
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/events?city=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    // هندلر برای کلیک روی دکمه‌های شهر پیش‌فرض
    const handleCityClick = (city) => {
        navigate(`/events?city=${encodeURIComponent(city)}`);
    };

    return (
        <section className={styles.heroSection}>
            <div className={styles.container}>
                <h1 className={styles.title}>فقط یکی کمه</h1>

                <p className={styles.description}>
                    اگه تیمت برای تشکیل یک رویداد، کامل نیست و دنبال یک نفر می‌گردی که
                    تیمتو تکمیل کنی جای درستی اومدی :)
                </p>

                <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="جستجوی شهر یا رویداد"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        جستجو
                    </button>
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
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;