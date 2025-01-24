import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./myeventstab.module.css";

import EventCard from "../../events/eventcard/eventCard.jsx";
import Pagination from "../../common/pagination/pagination.jsx";
import EditEventModal from "../../modals/editEventModal/editEventModal.jsx";
import JoinRequestsModal from "../../modals/joinRequestModal/joinRequestModal.jsx";
import DeleteEventModal from "../../modals/deleteEventModal/deleteEventModal.jsx";

// تصاویر مربوط به وضعیت‌های مختلف
import notCreatedImg from "/assets/images/notcreatedevent.png";
import notJoinedImg from "/assets/images/eventnotjoined.jpg";
import notPassedImg from "/assets/images/eventsnotpassed.png";

const MyEventsTab = () => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "09123456789";

  const [activeTab, setActiveTab] = useState("owner");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [joinRequestsModalOpen, setJoinRequestsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const navigate = useNavigate();

  const fetchEvents = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `http://95.217.8.192:8000/graphql/?query=${encodedQuery}`;
      const response = await axios.get(url);
      const data = response.data?.data || {};
      return data;
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("خطایی در دریافت اطلاعات رخ داد.");
      return {};
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnerEvents = async () => {
    const query = `
      query {
        eventsByOwner(phone: "${storedPhoneNumber}") {
          id
          title
          image
          startDate
          eventCategory
          neighborhood
          subscriberCount
        }
        adminEvents(phone: "${storedPhoneNumber}") {
          id
          title
          image
          startDate
          eventCategory
          neighborhood
          subscriberCount
        }
      }
    `;
    const data = await fetchEvents(query);
    const ownerEvents = data.eventsByOwner || [];
    const adminEvents = data.adminEvents || [];
    setEvents([...ownerEvents, ...adminEvents]);
  };

  const fetchApprovedEvents = async () => {
    const query = `
      query {
        userEvents(phone: "${storedPhoneNumber}") {
          id
          title
          image
          startDate
          eventCategory
          neighborhood
          subscriberCount
        }
      }
    `;
    const data = await fetchEvents(query);
    setEvents(data.userEvents || []);
  };

  const fetchPastEvents = async () => {
    const query = `
      query {
        pastEvents(phone: "${storedPhoneNumber}") {
          id
          title
          startDate
          endDate
          eventCategory
          neighborhood
          city
          role
        }
      }
    `;
    const data = await fetchEvents(query);
    setEvents(data.pastEvents || []);
  };

  useEffect(() => {
    setCurrentPage(1);
    if (activeTab === "owner") {
      fetchOwnerEvents();
    } else if (activeTab === "approved") {
      fetchApprovedEvents();
    } else if (activeTab === "past") {
      fetchPastEvents();
    }
  }, [activeTab]);

  const handleEditClick = (event, role) => {
    setSelectedEvent(event);
    setUserRole(role);
    setEditModalOpen(true);
  };

  const handleJoinRequestsClick = (event) => {
    setSelectedEvent(event);
    setJoinRequestsModalOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  const handleEventDetailRedirect = (eventId) => {
    navigate(`/eventDetail/${eventId}`);
  };

  const renderNoEventsMessage = () => {
    let imgSrc = notCreatedImg;
    let message = "شما میزبان یا ادمین هیچ رویدادی نیستید.";
    if (activeTab === "approved") {
      imgSrc = notJoinedImg;
      message = "شما در هیچ رویدادی شرکت نکرده‌اید.";
    } else if (activeTab === "past") {
      imgSrc = notPassedImg;
      message = "شما تاکنون در هیچ رویدادی شرکت نکرده‌اید.";
    }

    return (
      <div className={styles.noEvents}>
        <img src={imgSrc} alt="No Events" className={styles.noEventsImg} />
        <p className={styles.noEventsText}>{message}</p>
      </div>
    );
  };

  const renderEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!events.length) return renderNoEventsMessage();

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
      <>
        <div className={styles.eventsContainer}>
          {currentEvents.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              variant={activeTab === "approved" ? "joined" : "myEvents"}
              onJoin={
                activeTab === "approved" ? () => handleEventDetailRedirect(ev.id) : undefined
              }
              onEdit={() => handleEditClick(ev, "owner")}
              onDelete={() => handleDeleteClick(ev)}
              onJoinRequests={() => handleJoinRequestsClick(ev)}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Pagination
            totalItems={events.length}
            itemsPerPage={eventsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </>
    );
  };

  const renderPastEvents = () => {
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    if (!events.length) return renderNoEventsMessage();

    return (
      <div className={styles.pastEventsContainer}>
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>عنوان رویداد</th>
              <th>دسته بندی</th>
              <th>شهر</th>
              <th>محله</th>
              <th>تاریخ شروع</th>
              <th>تاریخ پایان</th>
              <th>نقش</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{index + 1}</td>
                <td>{event.title}</td>
                <td>{event.eventCategory}</td>
                <td>{event.city}</td>
                <td>{event.neighborhood}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.myEventsTab}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "owner" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("owner")}
        >
          رویدادهای من
        </button>
        <button
          className={`${styles.tab} ${activeTab === "approved" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          رویدادهایی که شرکت می‌کنم
        </button>
        <button
          className={`${styles.tab} ${activeTab === "past" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("past")}
        >
          رویدادهایی که شرکت کرده‌ام
        </button>
      </div>
      <div className={styles.eventsContent}>
        {activeTab === "past" ? renderPastEvents() : renderEvents()}
      </div>

      {editModalOpen && (
        <EditEventModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          eventId={selectedEvent?.id}
          role={userRole}
          phone={storedPhoneNumber}
          onEventUpdated={() => fetchOwnerEvents()}
        />
      )}

      {joinRequestsModalOpen && (
        <JoinRequestsModal
          isOpen={joinRequestsModalOpen}
          onClose={() => setJoinRequestsModalOpen(false)}
          eventId={selectedEvent?.id}
        />
      )}

      {deleteModalOpen && (
        <DeleteEventModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          eventId={selectedEvent?.id}
          ownerPhone={storedPhoneNumber}
          onEventDeleted={() => fetchOwnerEvents()}
        />
      )}
    </div>
  );
};

export default MyEventsTab;
