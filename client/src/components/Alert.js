import React from "react";

function Alert({message,color}) {
  return (
    <div>
      <div className={`alert alert-${color} fixed-top`} role="alert">
       {message}
      </div>
    </div>
  );
}

export default Alert;
