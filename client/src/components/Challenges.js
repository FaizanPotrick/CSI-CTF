import React from "react";
// import Instruction from "./Instruction";
import { useHistory } from "react-router-dom";
function Challenges({ get }) {
  const history = useHistory();
  return (
    <div className="d-flex flex-column" style={{overflowX:"hidden", height: "100vh"}}>
      <div className="d-flex flex-row justify-content-between">
        <button className="btn btn-primary text-center m-4">
          {get.group}
        </button>
        <button
          className="btn btn-primary text-center m-4 "
          onClick={() => {
            sessionStorage.removeItem("data");
            history.push("/login");
          }}
        >
          Log out
        </button>
        {/* <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}
      </div>
      {/* <Instruction/> */}
      <div className="row d-flex justify-content-center">
        <button
          className="card col-md-4 text-decoration-none m-2 shadow"
          style={{ width: "18rem" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="card-body">
            <h2 className="card-title">Card title</h2>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </button>
        <button
          className="card col-md-4 text-decoration-none m-2 shadow"
          style={{ width: "18rem" }}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="card-body">
            <h2 className="card-title">Card title</h2>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Challenges;
