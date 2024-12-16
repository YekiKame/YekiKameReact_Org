import React from "react";
import PropTypes from "prop-types";
import "./featureCard.css";
import "/global.css";

const FeatureCard = ({ Icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <Icon className="svg-icon" />
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  Icon: PropTypes.elementType.isRequired, // React component for the SVG icon
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FeatureCard;
