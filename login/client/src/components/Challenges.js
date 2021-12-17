import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import "./challenges.css";
import card from "../images/puzzle.jpg";
function Challenges({ get, showAlert }) {
  const history = useHistory();
  const [answer, setAnswer] = useState("");
  const [disable, setDisable] = useState(() => {
    const saved = localStorage.getItem("disarm");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("disarm", JSON.stringify(disable));
    disable.map((e) => {
      const id = document.getElementById(e);
      id.setAttribute("disabled", true);
      return id.classList.add("btn-success");
    });
  }, [disable]);
  const onChange = (e) => {
    setAnswer(e.target.value);
  };
  const update = async (e) => {
    e.preventDefault();
    const answerTrim = answer.trim();
    const key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
    const iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
    const mode = CryptoJS.mode.CFB;
    const padding = CryptoJS.pad.AnsiX923;
    const encrypted = CryptoJS.AES.encrypt(answerTrim, key, {
      iv: iv,
      mode: mode,
      padding: padding,
    }).toString();
    console.log(encrypted);
    const array = [
      "YZKOE+HVA26QDu4RjpSSnw==",
      "ZpCcdOHVA26QDu4RjpSSng==",
      "cJ+dB4m8c26QDu4RjpSSmg==",
      "ZJKOGpK9ah6QDu4RjpSSmw==",
    ];
    const filter = array.filter((e) => {
      return e === encrypted;
    });
    document.getElementById("submitBtn").disabled = true;
    setTimeout(() => {
      document.getElementById("submitBtn").disabled = false;
    }, 5000);
    if (!filter.length) {
      return [showAlert("danger:Incorrect"), setAnswer("")];
    }
    const data = await fetch("/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: get,
        answer: answerTrim,
      }),
      credentials: "include",
    });
    const res = await data.json();
    if (res === "success:correct") {
      setDisable([...disable, encrypted]);
    }
    showAlert(res);
    setAnswer("");
  };
  return (
    <div className="d-flex flex-column" style={{ height: "92vh" }}>
      <form
        className="row g-3 d-flex flex-column align-items-center mt-3 mb-5"
        onSubmit={update}
      >
        <input
          type="text"
          className="form-control ip border-2 text-center"
          placeholder="Enter the flag"
          name="answer"
          value={answer}
          onChange={onChange}
          required
        />
        <button
          type="submit"
          className="btn btn-light fw-bold submit-button"
          id="submitBtn"
        >
          Submit
        </button>
      </form>
      <div className="submit-flag d-flex justify-content-center align-items-center mt-3">
        <div>
          <div className="row">
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ display: "block" }}
            >
              <span className="card col" style={{ display: "inline-block" }}>
                <img src={card} className="images img-fluid" alt />
              </span>
            </div>
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ display: "block" }}
            >
              <span className="col card" style={{ display: "inline-block" }}>
                <img className="images img-fluid" src={card} alt />
              </span>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ display: "block" }}
            >
              <span className="card col" style={{ display: "inline-block" }}>
                <img src={card} className="images img-fluid" alt />
              </span>
            </div>
            <div
              className="col-md-6 col-sm-6 col-6"
              style={{ display: "block" }}
            >
              <span className="col card" style={{ display: "inline-block" }}>
                <img className="images img-fluid" src={card} alt />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
