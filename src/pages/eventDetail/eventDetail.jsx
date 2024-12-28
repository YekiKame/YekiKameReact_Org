import React from "react";
import styles from "./eventdetail.module.css";
// import EventCard from "../../components/events/eventcard/EventCard";
import SideBar from "../../components/pageComponents/eventDetail/sidebar/eventSidebar.jsx";
<<<<<<< HEAD
import Main from "../../components/pageComponents/eventDetail/main/main.jsx";
=======
>>>>>>> 7ae6b22d4e6879e55e4ce38cb00791064585b1ce

const EventDetail = () => {
  return (
    <div className={`${styles["grid"]} ${styles["event-detail-container"]}`}>
      <Main />
      <SideBar />
    </div>
  );
};

export default EventDetail;
