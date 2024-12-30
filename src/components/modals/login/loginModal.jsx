import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import OTPModal from "../OTPModal/otpModal.jsx";
import styles from "./loginmodal.module.css";
 

import Button from "../../shared/button/button.jsx";

const LoginModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
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
        "http://127.0.0.1:8000/graphql/",
        { query },
        { headers: { "Content-Type": "application/json" } }
      );

      const { success, message } = response.data?.data?.requestLoginOtp || {};

      if (success) {
        // باز کردن مودال OTP
        setIsOtpModalOpen(true);
      } else {
        setError(
          message || "ارسال کد تأیید با مشکل مواجه شد. لطفاً دوباره تلاش کنید."
        );
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setError("مشکلی در ارتباط با سرور رخ داد.");
    }
  };

  // هدایت به صفحه ورود با رمز عبور
  const handleLoginWithPassword = () => {
    navigate("/login");
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
        <div className={styles["modal-text"]}>
          <h3 className={styles["modal-title"]}>ورود به حساب کاربری</h3>
          <p className={styles["modal-subtitle"]}>به یکی کمه خوش آمدید.</p>
          <p className={styles["modal-description"]}>
            لطفاً برای ورود شماره تلفن همراه خود را وارد کنید:
          </p>
        </div>

        {/* فرم شماره تلفن */}
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <div className={styles["input-wrapper"]}>
              <span className={styles["input-prefix"]}>{"۹۸+"}</span>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="شماره تلفن همراه"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className={styles["input"]}
              />
            </div>
          </div>

          {/* شرایط استفاده */}
          <div>
            <span className="form-subtitle">شرایط استفاده از </span>
            <span
              className="form-sublink"
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => (window.location.href = "/privacy-policy")}
            >
              خدمات و حریم خصوصی یکی کمه
            </span>
            <span className="form-subtitle"> را می‌پذیرم.</span>
          </div>

          {/* دکمه تایید */}
          <Button
            text={"تأیید و دریافت کد"}
            size="large"
            customStyles={{ width: "100%" }}
            onClick={handleSubmit}
          ></Button>
        </form>

        {/* نمایش پیام خطا */}
        {error && <p className={styles["error-message"]}>{error}</p>}

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
        <p className={styles["register-link"]}>ثبت نام نکرده‌اید؟ </p>
        <Button
          text={"ثبت نام"}
          variant="outline"
          size="large"
          customStyles={{ width: "100%" }}
          onClick={handleSignUp}
        ></Button>
      </div>

      {/* نمایش مودال OTP - با حالت login */}
      {isOtpModalOpen && (
        <OTPModal
          isOpen={isOtpModalOpen}
          onClose={() => {
            setIsOtpModalOpen(false);
            onClose();
          }}
          onSubmit={() => {
            // پس از تأیید موفقیت‌آمیز کد OTP، این تابع اجرا می‌شود
            setIsOtpModalOpen(false);
            navigate("/dashboard");
            onClose();
          }}
          phoneNumber={phoneNumber}
          mode="login"
        />
      )}
    </div>
  );
};

export default LoginModal;
