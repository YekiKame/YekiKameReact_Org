import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./eventlist.module.css";
import Filter from "../../components/pageComponents/eventList/filter/filter.jsx";
import Main from "../../components/pageComponents/eventList/main/main.jsx";

const EventList = () => {
  const { city } = useParams(); // دریافت شهر از پارامترهای URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    city: city || "تهران", // استفاده از شهر دریافتی از params
    eventCategory: null,
    neighborhood: null,
    hasImage: null,
  });

  // دریافت اطلاعات رویدادها
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://95.217.8.192:8000/graphql/", {
          query: `
            {
              filteredEvents(
                city: "${filters.city}"
                eventCategory: ${
                  filters.eventCategory ? `"${filters.eventCategory}"` : "null"
                }
                neighborhood: ${
                  filters.neighborhood ? `"${filters.neighborhood}"` : "null"
                }
                hasImage: ${filters.hasImage}
              ) {
                id
                title
                eventCategory
                aboutEvent
                image
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
                subscriberCount
              }
            }
          `,
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        setEvents(response.data.data.filteredEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]); // اجرای مجدد با تغییر فیلترها

  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className={`${styles["grid"]} ${styles["event-list-container"]}`}>
      <Main events={events} />
      <Filter onFiltersChange={handleFiltersChange} currentFilters={filters} />
    </div>
  );
};

export default EventList;
