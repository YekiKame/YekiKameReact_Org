import React from "react";
import styles from "./eventdetail.module.css";
// import EventCard from "../../components/events/eventcard/EventCard";
import SideBar from "../../components/pageComponents/eventDetail/sidebar/eventSidebar.jsx";
import Main from "../../components/pageComponents/eventDetail/main/main.jsx";

const EventDetail = () => {
  return (
    <div className={`${styles["grid"]} ${styles["event-detail-container"]}`}>
      <Main />
      <SideBar />
    </div>
  );
};

export default EventDetail;
