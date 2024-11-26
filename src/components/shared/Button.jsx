import React from "react";
import PropTypes from "prop-types";
import "../../styles/Button.css";

const Button = ({
  text,
  variant = "primary",
  color = "orange",
  size = "medium",
  icon = null,
  disabled = false,
  onClick,
}) => {
  const classes = `
    button
    button--${variant}
    button--${color}
    button--${size}
    ${disabled ? "button--disabled" : ""}
  `;

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {text && <span className="button__text">{text}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  color: PropTypes.oneOf(["orange", "blue", "gray"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
