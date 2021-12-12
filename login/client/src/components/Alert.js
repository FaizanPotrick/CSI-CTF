import React from "react";

function Alert({message,color}) {
  return (
    <div>
      <div className={`alert alert-${color} position-absolute start-50 translate-middle`} role="alert"
       style={{width:"fit-content",top:"11vh"}}>
       {message}
      </div>
    </div>
  );
}

export default Alert;
