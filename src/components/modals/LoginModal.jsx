import React, { useState } from "react";
import "../../styles/LoginModal.css"; // فایل استایل
import { Link, useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone number submitted:", phoneNumber);
    // ارسال شماره به سرور یا نمایش مرحله بعد
  };

  const handleSignUp = () => {
    onClose(); // بسته شدن مودال
    navigate("/signup"); // روت به صفحه ثبت‌نام
  };

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal__title">ورود به حساب کاربری</h2>
        <p className="modal__subtitle">به یکی کمه خوش آمدید</p>
        <p className="modal__description">
          لطفاً برای ورود شماره تلفن همراه خود را وارد کنید:
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="phoneNumber">شماره همراه</label>
            <div className="input__wrapper">
              <span className="input__prefix">+98</span>
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

          <p className="terms">
            شرایط استفاده از خدمات و حریم خصوصی یکی کمه را می‌پذیرم.
          </p>

          <button type="submit" className="btn btn--primary">
            تایید و دریافت کد
          </button>
        </form>

        <p className="alternate__login">
          ورود از طریق <span className="link">رمز عبور</span>
        </p>
        <p className="register__link">
          <span className="link" onClick={handleSignUp}>
            ثبت نام نکرده‌اید؟ ثبت نام
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
