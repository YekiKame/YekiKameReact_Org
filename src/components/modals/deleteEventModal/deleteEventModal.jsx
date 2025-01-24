import React, { useState } from "react";
import axios from "axios";
import styles from "./deleteeventmodal.module.css";

const DeleteEventModal = ({ isOpen, onClose, eventId, ownerPhone, onEventDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    const mutation = `
      mutation {
        deleteEvent(eventId: "${eventId}", ownerPhone: "${ownerPhone}") {
          success
          message
        }
      }
    `;
    try {
      const response = await axios.post("http://95.217.8.192:8000/graphql/", { query: mutation });
      const result = response.data?.data?.deleteEvent;

      if (result.success) {
        onEventDeleted();
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("خطایی در حذف رویداد رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>حذف رویداد</h2>
        <p>آیا از حذف این رویداد مطمئن هستید؟</p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <button onClick={onClose} disabled={loading}>
            انصراف
          </button>
          <button onClick={handleDelete} disabled={loading} className={styles.deleteBtn}>
            {loading ? "در حال حذف..." : "بله، حذف شود"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
