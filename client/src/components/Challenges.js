import React, { useState, useEffect } from "react";
// import Instruction from "./Instruction";
import { useHistory } from "react-router-dom";
import Card from "./Card";
function Challenges({ get }) {
  const [state, setstate] = useState();
  useEffect(() => {
    const id = async () => {
      const data = await fetch("/get", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: get,
        }),
        credentials: "include",
      });
      const res = await data.json();
      if (!res.length) {
        return false;
      }
      setstate(res[0]);
    };
    id();
  }, [get]);
  const history = useHistory();
  console.log(state);
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
            history.push("/login");
          }}
        >
          Log out
        </button>
      </div>
      <div className="row d-flex justify-content-center"></div>
    </div>
  );
}

export default Challenges;
