import React, { useState } from "react";
import "./accordion.css";
import PropTypes from "prop-types";

const AccordionItem = ({ number, title, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={toggleAccordion}>
      <p className="number">{number}</p>
      <p className="text">{title}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      {isOpen && (
        <div className="hidden-box">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ faqs, startNumber }) => {
  return (
    <div className="accordion">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          number={startNumber + index} // Adjusted to ensure continuous numbering
          title={faq.questionTitle}
          answer={faq.questionAnswer}
        />
      ))}
    </div>
  );
};

AccordionItem.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

Accordion.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      questionTitle: PropTypes.string.isRequired,
      questionAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
  startNumber: PropTypes.number.isRequired, // Added startNumber prop
};

export default Accordion;
