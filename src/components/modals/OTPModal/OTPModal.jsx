import React, { useState } from "react";
import styles from "./OTPModal.module.css";

const OTPModal = ({ isOpen, onClose, onSubmit }) => {
  const [otp, setOtp] = useState("");

  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <h3>کد تأیید را وارد کنید</h3>
        <input
          type="text"
          placeholder="کد تأیید"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className={styles["otp-input"]}
        />
        <div className={styles["modal-buttons"]}>
          <button onClick={() => onSubmit(otp)} className={styles["submit-button"]}>
            تأیید
          </button>
          <button onClick={onClose} className={styles["cancel-button"]}>
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
