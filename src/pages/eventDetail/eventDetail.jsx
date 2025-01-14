import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./eventdetail.module.css";
import SideBar from "../../components/pageComponents/eventDetail/sidebar/eventSidebar.jsx";
import Main from "../../components/pageComponents/eventDetail/main/main.jsx";

const EventDetail = () => {
  const { eventId } = useParams();
  console.log(eventId);
  console.log(typeof eventId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Step 1: Create the fetch function
    const fetchEventDetails = async () => {
      try {
        // Step 2: Make the API call
        const response = await axios.post("http://127.0.0.1:8000/graphql/", {
          query: `
            {
              eventDetails(eventId: "${eventId}") {
                event {
                  id
                  title
                  image
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
          `,
        });
        console.log("API Response:", response.data);
        const eventData = response.data.data.eventDetails;
        if (eventData.error) {
          setError(eventData.error);
        } else {
          setEvent(eventData.event);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>Event not found!</p>;

  return (
    <div className={`${styles["grid"]} ${styles["event-detail-container"]}`}>
      <Main event={event} />
      <SideBar event={event} />
    </div>
  );
};

export default EventDetail;
