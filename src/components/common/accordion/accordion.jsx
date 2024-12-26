import React, { useState } from "react";
import styles from "./accordion.module.css";
import PropTypes from "prop-types";

const AccordionItem = ({ number, title, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles["item"]} ${isOpen ? styles["open"] : ""}`}
      onClick={toggleAccordion}
    >
      <p className={styles["number"]}>{number}</p>
      <p className={styles["text"]}>{title}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${styles["icon"]} ${isOpen ? styles["rotate"] : ""}`}
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
        <div className={styles["hidden-box"]}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const Accordion = ({ faqs, startNumber }) => {
  return (
    <div className={styles["accordion"]}>
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          number={startNumber + index}
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
  startNumber: PropTypes.number.isRequired,
};

export default Accordion;
