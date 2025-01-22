import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./main.module.css";
import EventListEventCard from "../../../events/eventlist/eventListEventCard.jsx";
import Pagination from "../../../common/pagination/pagination.jsx";

const Main = ({ events }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 10;
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIdx = (currentPage - 1) * EVENTS_PER_PAGE;
  const currentEvents = events.slice(startIdx, startIdx + EVENTS_PER_PAGE);
  if (events.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.eventsContainer}>
          <div className={styles.noEvents}>
            <p>هیچ رویدادی یافت نشد</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.eventsContainer}>
        {currentEvents.map((event) => (
          <EventListEventCard key={event.id} {...event} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
Main.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      eventCategory: PropTypes.string.isRequired,
      subscriberCount: PropTypes.number.isRequired,
      startDate: PropTypes.any.isRequired,
      neighborhood: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Main;
