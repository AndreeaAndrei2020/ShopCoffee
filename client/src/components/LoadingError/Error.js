import React from "react";
import './error.css'
const Message = ({ variant, children }) => {
  return(
  <div className={`alert ${variant}`}>{children} </div>)
};
Message.defaultProps = {
    variant: "alert-info",
};

export default Message;


