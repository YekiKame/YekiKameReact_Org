import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "../../../common/accordion/accordion.jsx";
import Pagination from "../../../common/pagination/pagination.jsx";
import styles from "./faqsection.module.css";

const GET_FAQS = gql`
  query {
    allFaqs {
      questionTitle
      questionAnswer
    }
  }
`;

const FAQSection = () => {
  const { loading, error, data } = useQuery(GET_FAQS);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(10);

  if (loading) return <p></p>;
  if (error) return <p></p>;

  const faqs = data.allFaqs;
  const totalPages = Math.ceil(faqs.length / faqsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentFaqs = faqs.slice(
    (currentPage - 1) * faqsPerPage,
    currentPage * faqsPerPage
  );

  return (
    <div className={styles["FAQ-section-container"]}>
      <div>
        <h3 className={styles["FAQ-header"]}>سوالات متدوال</h3>
      </div>
      <Accordion
        faqs={currentFaqs}
        startNumber={(currentPage - 1) * faqsPerPage + 1} // Adjusted startNumber
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default FAQSection;
