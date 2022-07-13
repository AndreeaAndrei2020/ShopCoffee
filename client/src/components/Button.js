import React from "react";
import "./Button.css";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onclick,
  ButtonStyle,
  ButtonSize,
}) => {
  const checkButttonStyle = STYLES.includes(ButtonStyle)
    ? ButtonStyle
    : STYLES[0];
  const checkButttonSize = SIZES.includes(ButtonSize) ? ButtonSize : SIZES[0];
  return (
    <button
      className={`btn ${checkButttonStyle} ${checkButttonSize}`}
      onClick={onclick}
      type={type}
    >
      {children}
    </button>
  );
};
