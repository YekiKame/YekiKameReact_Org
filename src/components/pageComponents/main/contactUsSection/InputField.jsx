import React from "react";
import PropTypes from "prop-types";

const InputField = ({ label, name, placeholder, value, onChange }) => {
  return (
    <div className="input-field">
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
