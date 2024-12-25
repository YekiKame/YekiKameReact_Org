import React from "react";
import "/global.css";

import EventCard from "../../components/events/eventcard/EventCard";
import SideBar from "../../components/pageComponents/eventDetail/sidebar/eventSidebar";

const EventDetail = () => {
  return (
    <div className="grid event-detail-container">
      <div></div>
      <SideBar />
    </div>
  );
};

export default EventDetail;
