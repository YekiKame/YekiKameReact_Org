import React from "react";
import PropTypes from "prop-types";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button className="btn" onClick={() => handlePageChange(currentPage - 1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="btn-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <a
          key={index}
          href="#"
          className={`page-link ${
            currentPage === index + 1 ? "page-link--current" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(index + 1);
          }}
        >
          {index + 1}
        </a>
      ))}
      <button className="btn" onClick={() => handlePageChange(currentPage + 1)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="btn-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
