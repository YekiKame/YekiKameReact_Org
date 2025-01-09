import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./myeventstab.module.css";
import Button from "../../shared/button/button.jsx"
import EventCard from "../../events/eventcard/eventCard.jsx";
import Pagination from "../../common/pagination/pagination.jsx";

const MyEventsTab = () => {
  const [activeTab, setActiveTab] = useState('owner');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const fetchEvents = async () => {
    setLoading(true);
    let query = '';
    if (activeTab === 'owner') {
      query = `query {
        eventsByOwner(phone: "09123456789") {
          id
          title
          eventCategory
          startDate
          endDate
          city
          maxSubscribers
        }
      }`;
    } else if (activeTab === 'approved') {
      query = `query {
        adminEvents(phone: "09123456789") {
          id
          title
          eventCategory
          startDate
          endDate
          city
          maxSubscribers
        }
      }`;
    } else if (activeTab === 'past') {
      // Example API for past events
      query = `query {
        pastEvents(phone: "09123456789") {
          id
          title
          eventCategory
          startDate
          endDate
          city
          maxSubscribers
        }
      }`;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/graphql/', {
        query,
      });
      setEvents(response.data.data[Object.keys(response.data.data)[0]]);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  const renderEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (!events.length)
      return (
        <div className={styles.noEvents}>
          <img
            src="/public/assets/images/notcreatedevent.png"
            alt="No Events"
            className={styles.noEventsImg}
          />
          <p className={styles.noEventsText}>شما تاکنون رویدادی ایجاد نکرده‌اید.</p>
        </div>
      );

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <>
        <div className={styles.eventsContainer}>
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <Pagination
          totalItems={events.length}
          itemsPerPage={eventsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </>
    );
  };

  return (
    <div className={styles.myEventsTab}>
      <div className={styles.tabs}>
        <Button
          className={activeTab === 'owner' ? styles.active : ''}
          text={"رویدادهای من"}
          onClick={() => setActiveTab('owner')}
        >
        </Button>
        <Button
          className={activeTab === 'approved' ? styles.active : ''}
          text={"رویدادهایی که شرکت می‌کنم"}
          onClick={() => setActiveTab('approved')}
        >
        </Button>
        <Button
          className={activeTab === 'past' ? styles.active : ''}
          text={"رویدادهایی که شرکت کرده‌ام"}
          onClick={() => setActiveTab('past')}
        >
        </Button>
      </div>
      <div className={styles.eventsContent}>{renderEvents()}</div>
    </div>
  );
};

export default MyEventsTab;
