import React from "react";
import styles from "./eventlist.module.css";
// import EventCard from "../../components/events/eventcard/EventCard";
import Filter from "../../components/pageComponents/eventList/filter/filter.jsx";
import Main from "../../components/pageComponents/eventList/main/main.jsx";

const EventDetail = () => {
  return (
    <div className={`${styles["grid"]} ${styles["event-detail-container"]}`}>
      <Main />
      <Filter />
    </div>
  );
};

export default EventDetail;
