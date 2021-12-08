import React, { useState } from "react";
// import Instruction from "./Instruction";
import { useHistory } from "react-router-dom";
function Challenges({ get, showAlert }) {
  const [answer, setAnswer] = useState("");

  const onChange = (e) => {setAnswer(e.target.value)}
  const update = async (e) => {
    e.preventDefault();
    const data = await fetch("/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: get,
        answer: answer
      }),
      credentials: "include",
    });
    const res = await data.json();
    showAlert(res);
    setAnswer("");
  };
  const history = useHistory();
  return (
    <div
      className="d-flex flex-column"
      style={{ overflowX: "hidden", height: "100vh" }}
    >
      <div className="d-flex flex-row justify-content-between">
        <button
          className="btn btn-primary text-center m-4 "
          onClick={() => {
            sessionStorage.removeItem("data");
            history.push("/");
          }}
        >
          Log out
        </button>
      </div>
      <div className="row d-flex justify-content-center">
        <form className="row g-3" onSubmit={update}>
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              name="answer"
              value={answer}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Confirm identity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Challenges;
