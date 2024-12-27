import React, { useState } from "react";
import styles from "./userdashboard.module.css";
import EditProfileTab from "../../components/userdashboard/editprofile/editProfileTab.jsx";
import MyEventsTab from "../../components/userdashboard/myevents/myEventsTab.jsx";
import CreateEventTab from "../../components/userdashboard/createevent/createEvent.jsx";
import Notifications from "../../components/userdashboard/notifications/notifications.jsx";

import profileCircle from "../../assets/icons/profile-circle.svg";
import editIcon from "../../assets/icons/info.svg";
import myEventsIcon from "../../assets/icons/events.svg";
import addEventIcon from "../../assets/icons/newevent.svg";
import commentsIcon from "../../assets/icons/messages.svg";
import notificationsIcon from "../../assets/icons/notification.svg";
import logoutIcon from "../../assets/icons/logout.svg";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("editProfile");

  const renderContent = () => {
    switch (activeTab) {
      case "editProfile":
        return <EditProfileTab />;
      case "myEvents":
        return <MyEventsTab />;
      case "createEvent":
        return <CreateEventTab />;
      case "myComments":
        return <Comments />;
      case "notifications":
        return <Notifications />;
      default:
        return <EditProfileTab />;
    }
  };

  return (
    <div className={styles.dashboardcontainer}>
      <div className={styles["profile-menu"]}>
        {/* پروفایل */}
        <div className={styles.profile}>
          <div className={styles.name}>
            <img
              className={styles["vuesax-bold-profile"]}
              alt="Profile Icon"
              src={profileCircle}
            />
            <div className={styles.text}>
              <div className={styles["text-wrapper"]}>نام کاربر</div>
            </div>
          </div>
        </div>

        {/* آیتم‌های منو */}
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
                id: "myComments",
                label: "نظرات و کامنت‌ها",
                icon: commentsIcon,
              },
              {
                id: "notifications",
                label: "اطلاعیه‌ها",
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

            <div
              className={styles["profile-data-3"]}
              onClick={() => alert("خروج از حساب")}
            >
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
      {/* محتوای اصلی */}
      <main className={styles["main-content"]}>{renderContent()}</main>
    </div>
  );
};

export default UserDashboard;
