import React from "react";
const Loading = () => {
  return (
    <div className="spinner-border" role="status">
      <span className="sr-only" style={{color:'white',textAlign:'center'}}>Loading...</span>
    </div>
  );
};

export default Loading;
