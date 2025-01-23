import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./joinrequestmodal.module.css";

const JoinRequestsModal = ({ isOpen, onClose, eventId }) => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const fetchJoinRequests = async () => {
    setLoading(true);
    setError(null);

    const query = `
      query {
        pendingJoinRequests(eventId: "${eventId}", ownerPhone: "${storedPhoneNumber}") {
          id
          user {
            id
            phone
            fullname
          }
          createdAt
        }
      }
    `;

    try {
      const response = await axios.post("http://127.0.0.1:8000/graphql/", { query });
      const result = response.data?.data?.pendingJoinRequests;

      if (result) {
        setRequests(result);
      } else {
        setError("خطایی در دریافت درخواست‌ها رخ داد.");
      }
    } catch (err) {
      setError("خطایی در دریافت درخواست‌ها رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action, role = null) => {
    setLoading(true);

    const mutation = `
      mutation {
        reviewJoinRequest(
          eventId: "${eventId}",
          userId: "${userId}",
          action: "${action}",
          ${role ? `role: "${role}",` : ""}
          ownerPhone: "${storedPhoneNumber}"
        ) {
          success
          message
        }
      }
    `;

    try {
      const response = await axios.post("http://127.0.0.1:8000/graphql/", { query: mutation });
      const result = response.data?.data?.reviewJoinRequest;

      if (result?.success) {
        // حذف درخواست مورد نظر از لیست
        setRequests((prev) => prev.filter((request) => request.id !== userId));
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("خطایی در انجام عملیات رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchJoinRequests();
  }, [isOpen]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>درخواست‌های عضویت</h2>
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : requests.length === 0 ? (
          <p>هیچ درخواستی یافت نشد.</p>
        ) : (
          <table className={styles.requestsTable}>
            <thead>
              <tr>
                <th>نام کاربر</th>
                <th>شماره تماس</th>
                <th>تاریخ درخواست</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.user.fullname || "نام‌وجود ندارد"}</td>
                  <td>{req.user.phone}</td>
                  <td>{new Date(req.createdAt).toLocaleString("fa-IR")}</td>
                  <td>
                    <button
                      onClick={() => handleAction(req.user.id, "approve", "admin")}
                      className={styles.approveBtn}
                    >
                      پذیرش به‌عنوان ادمین
                    </button>
                    <button
                      onClick={() => handleAction(req.user.id, "approve")}
                      className={styles.approveBtn}
                    >
                      پذیرش عادی
                    </button>
                    <button
                      onClick={() => handleAction(req.user.id, "reject")}
                      className={styles.rejectBtn}
                    >
                      رد درخواست
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.closeButton}>
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRequestsModal;
