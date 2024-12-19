import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./OTPModal.module.css";

const OTPModal = ({ isOpen, onClose, onSubmit, phoneNumber }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(119); // شروع تایمر از 1:59
  const [resendEnabled, setResendEnabled] = useState(false);

  // مدیریت تغییر مقدار هر خانه OTP
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // مدیریت کلید Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-input-${index - 1}`).focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // تأیید کد OTP
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    setError("");

    if (otpValue.length !== 5) {
      setError("کد تأیید باید ۵ رقم باشد.");
      return;
    }

    const query = `
      mutation VerifyOtp($phone: String!, $otp: Int!) {
        verifyLoginOtp(phone: $phone, otp: $otp) {
          success
        }
      }
    `;

    const variables = {
      phone: phoneNumber,
      otp: parseInt(otpValue, 10),
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/graphql/",
        { query, variables },
        { headers: { "Content-Type": "application/json" } }
      );

      const success = response.data?.data?.verifyLoginOtp?.success;
      console.log("GraphQL Response: ", response.data);

      if (success) {
        alert("شما وارد شدید.");
        onSubmit(otpValue);
      } else {
        setError("کد تأیید نادرست است. لطفاً دوباره تلاش کنید.");
      }
    } catch (err) {
      setError("مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  // تایمر برای دریافت مجدد کد
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // ارسال مجدد کد OTP
  const handleResendCode = async () => {
    setError("");
    setTimer(119); // ریست تایمر
    setResendEnabled(false);

    const query = `
      mutation RequestOtp($phone: String!) {
        requestLoginOtp(phone: $phone) {
          success
        }
      }
    `;

    const variables = {
      phone: phoneNumber,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/graphql/",
        { query, variables },
        { headers: { "Content-Type": "application/json" } }
      );

      const success = response.data?.data?.requestLoginOtp?.success;

      if (!success) {
        setError("ارسال مجدد کد با مشکل مواجه شد.");
      }
    } catch (err) {
      setError("مشکلی در ارتباط با سرور رخ داد.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles["modal-title"]}>کد تأیید</h2>
        <p className={styles["modal-subtitle"]}>
          کد ارسال‌شده به {phoneNumber} را وارد کنید
        </p>
        <button
          className={styles["edit-phone-link"]}
          onClick={onClose}
        >
          ویرایش شماره موبایل
        </button>

        {/* ورودی OTP */}
        <div className={styles["otp-input-container"]}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={styles["otp-input"]}
              style={{ direction: "ltr", textAlign: "center" }}
            />
          ))}
        </div>

        {/* تایمر و ارسال مجدد */}
        <div className={styles["resend-container"]}>
          {resendEnabled ? (
            <button
              onClick={handleResendCode}
              className={styles["resend-button"]}
            >
              ارسال مجدد کد
            </button>
          ) : (
            <span>تا دریافت مجدد کد: {formatTimer()}</span>
          )}
        </div>

        {/* نمایش خطا */}
        {error && <div className={styles["error-message"]}>{error}</div>}

        {/* دکمه تأیید */}
        <button className={styles["submit-button"]} onClick={handleVerifyOtp}>
          تأیید
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
