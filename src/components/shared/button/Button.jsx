import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({
  text,
  variant = "primary",
  color = "orange",
  size = "medium",
  icon = null,
  disabled = false,
  onClick,
}) => {
  // تولید کلاس‌های دکمه بر اساس ویژگی‌های مختلف
  const classes = `
    button
    button--${variant}
    button--${color}
    button--${size}
    ${disabled ? "button--disabled" : ""}
    button--elevation-${variant}-${size}-${disabled ? 'disabled' : 'normal'}
  `;

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="button__icon">{icon}</span>} {/* نمایش آیکون */}
      {text && <span className="button__text">{text}</span>} {/* نمایش متن */}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  color: PropTypes.oneOf(["orange", "blue", "gray"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.node, // اینجا به عنوان node تعریف شد
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;