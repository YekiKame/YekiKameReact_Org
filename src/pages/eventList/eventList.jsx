import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./eventlist.module.css";
// import EventCard from "../../components/events/eventcard/EventCard";
import Filter from "../../components/pageComponents/eventList/filter/filter.jsx";
import Main from "../../components/pageComponents/eventList/main/main.jsx";

const SEARCH_EVENTS_BY_CITY = gql`
  query searchEventsByCity($city: String!) {
    searchEventsByCity(city: $city) {
      id
      title
      eventCategory
      subscriberCount
      startDate
      neighborhood
      image
    }
  }
`;

const EventList = () => {
  const { loading, error, data } = useQuery(SEARCH_EVENTS_BY_CITY, {
    variables: { city: "تهران" },
  });
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={`${styles["grid"]} ${styles["event-list-container"]}`}>
      <Main events={data.searchEventsByCity} />
      <Filter />
    </div>
  );
};

export default EventList;
