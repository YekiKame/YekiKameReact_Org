import React, { useState } from "react";
import axios from "axios";
import styles from "./OTPModal.module.css";

const OTPModal = ({ isOpen, onClose, onSubmit, phoneNumber }) => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(119);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // حرکت به خانه بعدی
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

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

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    setError("");

    if (otpValue.length !== 5) {
      setError("کد تأیید باید ۵ رقم باشد.");
      return;
    }

    const query = `
      mutation {
        verifyOtp(phone: "${phoneNumber}", otp: ${otpValue}) {
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

      const success = response.data?.data?.verifyOtp?.success;

      if (success) {
        onSubmit(otpValue);
      } else {
        setError("کد تأیید نادرست است. لطفاً دوباره تلاش کنید.");
      }
    } catch (err) {
      setError("مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h2 className={styles["modal-title"]}>کد تأیید</h2>
        <p className={styles["modal-subtitle"]}>
          کد ارسال‌شده به {phoneNumber} را وارد کنید
        </p>
        <a href="#" className={styles["edit-phone-link"]} onClick={onClose}>
          ویرایش شماره موبایل
        </a>

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
              style={{ direction: "ltr", textAlign: "center" }} // تنظیم جهت چپ به راست
            />
          ))}
        </div>

        <div className={styles["resend-container"]}>
          <span>تا دریافت مجدد کد</span>
          <span className={styles["timer"]}>{formatTimer()}</span>
        </div>
        {error && <div className={styles["error-message"]}>{error}</div>}

        <button className={styles["submit-button"]} onClick={handleVerifyOtp}>
          تأیید
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
