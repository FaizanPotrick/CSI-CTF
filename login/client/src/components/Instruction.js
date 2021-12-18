import React from "react";
import "./home.css";

function Instruction() {
  return (
    <div
      className="modal p-0 m-0 fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog p-0 m-0">
        <div className="modal-content glass ">
          <div className="modal-header mx-3">
            <h3 className="modal-title mt-2" id="exampleModalLabel">
              Instructions
            </h3>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body mt-3 ">
            <ul>
              <li>
                This is a timed quiz with 20 questions to be answered in 600
                seconds
              </li>
              <li>
                These questions will be randomly picked from the question bank.
                Winners will be adjudged on the basis of maximum number of
                correct answers.
              </li>
              <li>
                In case of multiple participants having given same number of
                correct answers, the participants who take the least time to
                complete the quiz will be adjudged the winner.
              </li>
              <li>You can skip a tough question and come back to it later.</li>
              <li>
                The quiz will start as soon as you click the Start Quiz button.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
