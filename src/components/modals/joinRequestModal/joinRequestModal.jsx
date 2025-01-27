import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./joinrequestmodal.module.css";

const JoinRequestsModal = ({ isOpen, onClose, eventId }) => {
  const storedPhoneNumber = sessionStorage.getItem("userPhone") || "";
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStates, setLoadingStates] = useState({}); // برای نمایش loading هر دکمه

  useEffect(() => {
    if (isOpen && eventId) {
      fetchJoinRequests();
    }
  }, [isOpen, eventId]);

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
      const response = await axios.post("http://127.0.0.1:8000/graphql/", {
        query,
      });
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

  const handleAction = async (userId, action, role = "regular") => {
    // فعال کردن loading برای دکمه‌های مربوط به این کاربر
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    const mutation = `
      mutation {
        reviewJoinRequest(
          eventId: "${eventId}",
          userId: "${userId}",
          action: "${action}",
          ${action === "approve" ? `role: "${role}"` : ""}
          ownerPhone: "${storedPhoneNumber}"
        ) {
          success
          message
        }
      }
    `;

    try {
      const response = await axios.post("http://127.0.0.1:8000/graphql/", {
        query: mutation,
      });
      const result = response.data?.data?.reviewJoinRequest;

      if (result?.success) {
        // حذف درخواست از لیست
        setRequests((prev) =>
          prev.filter((request) => request.user.id !== userId)
        );

        // نمایش پیام مناسب بر اساس action و role
        if (action === "approve" && role === "admin") {
          alert("کاربر مورد نظر به عنوان ادمین شناخته شد.");
        } else if (action === "approve" && role === "regular") {
          alert("درخواست کاربر مربوطه پذیرفته شد.");
        } else if (action === "reject") {
          alert("درخواست کاربر مدنظر رد شد.");
        }
      } else {
        alert(result.message || "خطایی در انجام عملیات رخ داد.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("خطایی در ارتباط با سرور رخ داد.");
    } finally {
      // غیرفعال کردن loading
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>درخواست‌های عضویت</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        {loading ? (
          <div className={styles.loading}>در حال بارگذاری...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : requests.length === 0 ? (
          <div className={styles.noRequests}>هیچ درخواستی یافت نشد.</div>
        ) : (
          <div className={styles.tableWrapper}>
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
                    <td>{req.user.fullname || "نام وجود ندارد"}</td>
                    <td>{req.user.phone}</td>
                    <td>
                      {new Date(req.createdAt).toLocaleDateString("fa-IR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className={styles.actions}>
                      <button
                        onClick={() =>
                          handleAction(req.user.id, "approve", "admin")
                        }
                        className={styles.adminButton}
                        disabled={loadingStates[req.user.id]}
                      >
                        {loadingStates[req.user.id]
                          ? "در حال پردازش..."
                          : "پذیرش به‌عنوان ادمین"}
                      </button>
                      <button
                        onClick={() =>
                          handleAction(req.user.id, "approve", "regular")
                        }
                        className={styles.approveButton}
                        disabled={loadingStates[req.user.id]}
                      >
                        {loadingStates[req.user.id]
                          ? "در حال پردازش..."
                          : "پذیرش عادی"}
                      </button>
                      <button
                        onClick={() => handleAction(req.user.id, "reject")}
                        className={styles.rejectButton}
                        disabled={loadingStates[req.user.id]}
                      >
                        {loadingStates[req.user.id]
                          ? "در حال پردازش..."
                          : "رد درخواست"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinRequestsModal;