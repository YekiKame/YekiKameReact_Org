import React, { useEffect, useState, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "../../../common/accordion/accordion";
import Pagination from "../../../common/pagination/pagination";
import "./FAQSection.css";

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
  const faqSectionRef = useRef(null); // Reference to the FAQ section container
  const [fadeIn, setFadeIn] = useState(false); // State for smooth transition

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const faqs = data.allFaqs;
  const totalPages = Math.ceil(faqs.length / faqsPerPage);

  const handlePageChange = (page) => {
    setFadeIn(false); // Remove fade-in effect
    setTimeout(() => {
      setCurrentPage(page);
      setFadeIn(true); // Add fade-in effect after page change
      faqSectionRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the top of the FAQ section
    }, 300); // Delay to allow fade-out effect
  };

  const currentFaqs = faqs.slice(
    (currentPage - 1) * faqsPerPage,
    currentPage * faqsPerPage
  );

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in effect on initial render
  }, []);

  return (
    <div className="FAQ-section-container" ref={faqSectionRef}>
      <div className={`FAQ-accordion ${fadeIn ? "fade-in" : ""}`}>
        <Accordion
          faqs={currentFaqs}
          startNumber={(currentPage - 1) * faqsPerPage + 1} // Adjusted startNumber
        />
      </div>
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
