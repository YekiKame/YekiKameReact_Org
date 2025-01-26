import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // برای هدایت کاربر
import styles from "./userdashboard.module.css";
import EditProfileTab from "../../components/userdashboard/editprofile/editProfileTab.jsx";
import MyEventsTab from "../../components/userdashboard/myevents/myEventsTab.jsx";
import CreateEventTab from "../../components/userdashboard/createevent/createEvent.jsx";
import Notifications from "../../components/userdashboard/notifications/notifications.jsx";

import profileCircle from "../../assets/icons/profile-circle.svg";
import editIcon from "../../assets/icons/info.svg";
import myEventsIcon from "../../assets/icons/events.svg";
import addEventIcon from "../../assets/icons/newevent.svg";
import notificationsIcon from "../../assets/icons/notification.svg";
import logoutIcon from "../../assets/icons/logout.svg";

const UserDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "myEvents"
  );
  const [userName, setUserName] = useState("نام کاربر");
  const storedPhoneNumber = sessionStorage.getItem("userPhone");
  const storedToken = sessionStorage.getItem("sessionToken");
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت کاربر

  useEffect(() => {
    const fetchUserName = async () => {
      if (!storedPhoneNumber) {
        setUserName("کاربر ناشناس");
        return;
      }

      const query = `
        query {
          user(phone: "${storedPhoneNumber}") {
            fullname
          }
        }
      `;

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/graphql/",
          { query },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const userData = response.data?.data?.user;
        if (userData && userData.fullname) {
          setUserName(userData.fullname);
        } else {
          setUserName("کاربر ناشناس");
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName("خطا در واکشی نام کاربر");
      }
    };

    fetchUserName();
  }, [storedPhoneNumber]);
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleLogout = () => {
    // حذف اطلاعات از sessionStorage
    sessionStorage.removeItem("userPhone");
    sessionStorage.removeItem("sessionToken");

    // هدایت کاربر به صفحه ورود
    navigate("/login");
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "editProfile":
        return <EditProfileTab />;
      case "myEvents":
        return <MyEventsTab />;
      case "createEvent":
        return <CreateEventTab />;
      case "notifications":
        return <Notifications />;
      default:
        return <MyEventsTab />;
    }
  };

  return (
    <div className={styles.dashboardcontainer}>
      <div className={styles["profile-menu"]}>
        <div className={styles.profile}>
          <div className={styles.name}>
            <img
              className={styles["vuesax-bold-profile"]}
              alt="Profile Icon"
              src={profileCircle}
            />
            <div className={styles.text}>
              <div className={styles["text-wrapper"]}>{userName}</div>
            </div>
          </div>
        </div>

        <div className={styles["menu-items"]}>
          <div className={styles.items}>
            {[
              { id: "editProfile", label: "ویرایش اطلاعات", icon: editIcon },
              { id: "myEvents", label: "رویدادهای من", icon: myEventsIcon },
              {
                id: "createEvent",
                label: "ثبت رویداد جدید",
                icon: addEventIcon,
              },
              {
                id: "notifications",
                label: "اعلانات",
                icon: notificationsIcon,
              },
            ].map((tab) => (
              <div
                key={tab.id}
                className={`${styles["profile-data"]} ${
                  activeTab === tab.id ? styles.active : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <img
                  src={tab.icon}
                  className={styles["icon-instance-node"]}
                  alt={tab.label}
                />
                <div className={styles.div}>{tab.label}</div>
              </div>
            ))}

            <div className={styles["profile-data-3"]} onClick={handleLogout}>
              <img
                src={logoutIcon}
                className={styles["icon-instance-node"]}
                alt="خروج"
              />
              <div className={styles["text-wrapper-3"]}>خروج</div>
            </div>
          </div>
        </div>
      </div>
      <main className={styles["main-content"]}>{renderContent()}</main>
    </div>
  );
};

export default UserDashboard;
