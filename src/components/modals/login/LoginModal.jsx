import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OTPModal from "../OTPModal/OTPModal"; // مسیر مودال OTP
import styles from "./loginmodal.module.css"; // ماژول CSS

const LoginModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); // وضعیت باز بودن OTP
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ارسال درخواست OTP به سرور
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const query = `
      mutation {
        requestLoginOtp(phone: "${phoneNumber}") {
          success
        }
      }
    `;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/graphql/", // آدرس API
        { query },
        { headers: { "Content-Type": "application/json" } }
      );

      const success = response.data?.data?.requestLoginOtp?.success;

      if (success) {
        // باز کردن مودال OTP
        setIsOtpModalOpen(true);
      } else {
        setError("ارسال کد تأیید با مشکل مواجه شد. لطفاً دوباره تلاش کنید.");
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setError("مشکلی در ارتباط با سرور رخ داد.");
    }
  };

  // هدایت به صفحه ورود با رمز عبور
  const handleLoginWithPassword = () => {
    navigate("/login"); // مسیر صفحه لاگین
    onClose();
  };

  // هدایت به صفحه ثبت‌نام
  const handleSignUp = () => {
    navigate("/signup");
    onClose();
  };

  return (
    <div className={styles["modal-overlay"]} onClick={onClose}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles["modal-title"]}>ورود به حساب کاربری</h2>
        <p className={styles["modal-subtitle"]}>به یکی کمه خوش آمدید</p>
        <p className={styles["modal-description"]}>
          لطفاً برای ورود شماره تلفن همراه خود را وارد کنید:
        </p>

        {/* فرم شماره تلفن */}
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="phoneNumber" className={styles["form-label"]}>
              شماره همراه
            </label>
            <div className={styles["input-wrapper"]}>
              <span className={styles["input-prefix"]}>+98</span>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="شماره تلفن خود را وارد کنید"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className={styles["input"]}
              />
            </div>
          </div>

          {/* شرایط استفاده */}
          <p className={styles["terms"]}>
            <span className={styles["link"]}>شرایط استفاده از خدمات و حریم خصوصی یکی کمه</span>{" "}
            را می‌پذیرم.
          </p>

          {/* دکمه تأیید */}
          <button type="submit" className={styles["btn-primary"]}>
            تایید و دریافت کد
          </button>
        </form>

        {/* لینک ورود با رمز عبور */}
        <p className={styles["alternate-login"]}>
          ورود از طریق{" "}
          <span
            className={styles["link-red"]}
            onClick={handleLoginWithPassword}
          >
            رمز عبور
          </span>
        </p>

        {/* لینک ثبت نام */}
        <p className={styles["register-link"]}>
          ثبت نام نکرده‌اید؟{" "}
          <span className={styles["link"]} onClick={handleSignUp}>
            ثبت نام
          </span>
        </p>
      </div>

      {/* نمایش مودال OTP */}
      {isOtpModalOpen && (
        <OTPModal
          isOpen={isOtpModalOpen}
          onClose={() => setIsOtpModalOpen(false)}
          onSubmit={() => console.log("OTP تایید شد")}
          phoneNumber={phoneNumber}
        />
      )}
    </div>
  );
};

export default LoginModal;
