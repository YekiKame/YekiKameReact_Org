import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./userdropdown.module.css";

const UserDropdown = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("userPhone");
    sessionStorage.removeItem("isLoggedIn");

    if (location.pathname === "/dashboard") {
      navigate("/login");
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    onClose();
  };

  const handleCreateEvent = () => {
    navigate("/dashboard", { state: { activeTab: "createEvent" } });
    onClose();
  };

  return (
    <div className={styles["user-dropdown"]}>
      <div className={styles["dropdown-item"]} onClick={handleDashboard}>
        پنل کاربری
      </div>
      <div className={styles["dropdown-item"]} onClick={handleCreateEvent}>
        ثبت رویداد
      </div>
      <div className={styles["dropdown-item"]} onClick={handleLogout}>
        خروج
      </div>
    </div>
  );
};

export default UserDropdown;
