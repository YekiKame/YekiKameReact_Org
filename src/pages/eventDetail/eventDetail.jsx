import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import styles from "./eventdetail.module.css";
import SideBar from "../../components/pageComponents/eventDetail/sidebar/eventSidebar.jsx";
import Main from "../../components/pageComponents/eventDetail/main/main.jsx";

const GET_EVENT_DETAILS = gql`
  query eventDetails($eventId: String!) {
    eventDetails(eventId: $eventId) {
      event {
        id
        title
        eventCategory
        aboutEvent
        startDate
        endDate
        province
        city
        neighborhood
        postalAddress
        postalCode
        registrationStartDate
        registrationEndDate
        fullDescription
        maxSubscribers
        eventOwner {
          phone
        }
      }
      error
    }
  }
`;

const EventDetail = () => {
  const { eventId } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { eventId },
  });
  console.log(event);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const event = data.eventDetails.event;

  return (
    <div className={`${styles["grid"]} ${styles["event-detail-container"]}`}>
      <Main event={event} />
      <SideBar event={event} />
    </div>
  );
};

export default EventDetail;
