import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Accordion from "../../../common/accordion/accordion";
import Pagination from "../../../common/pagination/pagination";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    <div>
      <Accordion faqs={currentFaqs} />
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
