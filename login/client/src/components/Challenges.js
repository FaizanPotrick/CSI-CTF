import React, { useState } from "react";
import CryptoJS from "crypto-js";
import {  Link } from "react-router-dom";
function Challenges({ get, showAlert }) {
  const [answer, setAnswer] = useState("");

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
    showAlert(res);
    setAnswer("");
  };
  return (
    <div
      className="d-flex flex-column"
      style={{ overflowX: "hidden", height: "100vh" }}
    >
      <div className="d-flex flex-row justify-content-between">
        
      </div>
      <div className="row d-flex justify-content-center">
        <div>
          <div class="card" style={{width: "18rem"}}>
            <Link class="card-body" to={`/${get}/1`}>
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </Link>
          </div>
        </div>
        <form className="row g-3" onSubmit={update}>
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              name="answer"
              value={answer}
              placeholder="Password"
              onChange={onChange}
              required
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
