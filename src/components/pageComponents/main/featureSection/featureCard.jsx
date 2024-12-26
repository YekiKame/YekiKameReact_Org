import React from "react";
import PropTypes from "prop-types";
import styles from "./featureCard.module.css";
import "/global.css";

const FeatureCard = ({ Icon, title, description }) => {
  return (
    <div className={styles["feature-card"]}>
      <div className={styles["feature-icon"]}>
        <Icon className={styles["svg-icon"]} />
      </div>
      <h3 className={styles["feature-title"]}>{title}</h3>
      <p className={styles["feature-description"]}>{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  Icon: PropTypes.elementType.isRequired, // React component for the SVG icon
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
