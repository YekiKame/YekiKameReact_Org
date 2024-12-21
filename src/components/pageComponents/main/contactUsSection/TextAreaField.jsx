import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="textarea-field">
      <label htmlFor={name} className="textarea-label">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="textarea"
        rows="5"
      ></textarea>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextAreaField;
