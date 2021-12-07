import React from "react";

function Card({state}) {
  return (
    <button
      className="card col-md-4 text-decoration-none m-2 shadow"
      style={{ width: "18rem" }}
    >
      <div className="card-body">
        <h2 className="card-title">{state[0].title}</h2>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
      </div>
    </button>
  );
}

export default Card;
