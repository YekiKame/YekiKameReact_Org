import React, { useState } from "react";
import "../styles/Signup.css";

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارد.");
      return;
    }
    console.log("Form submitted:", { phoneNumber, password });
    // ارسال اطلاعات ثبت‌نام به سرور
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <h1>یکی کمه</h1>
        <nav>
          <a href="/">صفحه اصلی</a>
          <a href="/events">رویدادها</a>
          <a href="/about">درباره ما</a>
        </nav>
      </header>

      <div className="signup-container">
        {/* تصویر سمت چپ */}
        <div className="signup-image">
          <img src="../assets/images/signupimage.jpg" alt="Sign Up" />
        </div>

        {/* فرم ثبت‌نام */}
        <div className="signup-form">
          <h2 className="signup-title">ثبت نام در یکی کمه</h2>
          <p className="signup-subtitle">
            خوشحالیم که می‌خواهی به کمپین یکی کمه بپیوندی :)
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phoneNumber">شماره همراه</label>
              <div className="input-wrapper">
                <span className="input-prefix">+98</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="شماره تلفن خود را وارد کنید"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">لطفا رمز عبور خود را انتخاب نمایید:</label>
              <input
                type="password"
                id="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">تکرار رمز عبور</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="تکرار رمز عبور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <p className="terms">
              شرایط استفاده از خدمات و حریم خصوصی یکی کمه را می‌پذیرم.
            </p>

            <button type="submit" className="btn btn-primary">
              تایید و دریافت کد
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
