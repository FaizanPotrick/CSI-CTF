import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./challenges.css";
import "./cards.css";
function Challenges({ get, showAlert }) {
  const [answer, setAnswer] = useState("");
  const [disable, setDisable] = useState([]);
  useEffect(() => {
    const api = async (e) => {
      const data = await fetch("/site-target", {
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
      const targetAnswer = res.map((e) => {
        return e.target;
      });
      setDisable(targetAnswer);
    };
    api();
  }, [get]);
  disable.map((e) => {
    const id = document.getElementById(e);
    const text = document.createElement("i");
    text.classList.add("bi");
    text.classList.add("bi-check-circle-fill");
    text.style.color = "greenyellow";
    text.style.position = "absolute";
    text.style.fontSize = "30px";
    text.style.top = "10px";
    text.style.right = "20px";
    id.setAttribute("disabled", true);
    return id.appendChild(text);
  });
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
    // console.log(encrypted);
    const array = [
      "YZKOE+HVA26QDu4RjpSSnw==",
      "ZpCcdOHVA26QDu4RjpSSng==",
      "cJ+dB4m8c26QDu4RjpSSmg==",
      "YYyGEY+xcG6QDu4RjpSSmg==",
      "ZZKOF4qmawfgDu4RjpSSlA==",
      "Zo6AGI26A26QDu4RjpSSmQ==",
    ];
    const filter = array.filter((e) => {
      return e === encrypted;
    });
    document.getElementById("submitBtn").disabled = true;
    setTimeout(() => {
      document.getElementById("submitBtn").disabled = false;
    }, 5000);
    if (!filter.length) {
      return [showAlert("#E52D50:white:Incorrect"), setAnswer("")];
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
        target: encrypted,
      }),
      credentials: "include",
    });
    const res = await data.json();
    window.location.reload(true);
    showAlert(res);
    setAnswer("");
  };
  return (
    <div
      className="d-flex flex-column challenge-div"
      style={{ height: "92vh" }}
    >
      <button
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ position: "absolute", top: "13vh", right: "0px" }}
      >
        <i
          className="bi bi-question-circle-fill text-light"
          style={{ fontSize: "40px" }}
        ></i>
      </button>
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
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn btn-light fw-bold submit-button"
          id="submitBtn"
        >
          Submit
        </button>
      </form>
      <div className="container-m">
        <button className="card btn" id="YZKOE+HVA26QDu4RjpSSnw==">
          <div className="box">
            <div className="content">
              <h2>01</h2>
              <p>What Lies Within?</p>
              <button
                type="button"
                className="btn "
                data-bs-toggle="modal"
                data-bs-target="#card1"
              >
                Read More
              </button>
            </div>
          </div>
        </button>
        <button className="card btn" id="ZpCcdOHVA26QDu4RjpSSng==">
          <div className="box">
            <div className="content">
              <h2>02</h2>
              <p>Luminous Hunt</p>
              <button
                type="button"
                className="btn "
                data-bs-toggle="modal"
                data-bs-target="#card2"
              >
                Read More
              </button>
            </div>
          </div>
        </button>
        <button className="card btn" id="cJ+dB4m8c26QDu4RjpSSmg==">
          <div className="box">
            <div className="content">
              <h2>03</h2>
              <p>A Tribute</p>
              <a
                type="button"
                className="btn"
                href="https://github.com/mak372/CTF"
                target={"_blank"}
                rel={"noreferrer"}
              >
                Read More
              </a>
            </div>
          </div>
        </button>
        <button className="card btn" id="YYyGEY+xcG6QDu4RjpSSmg==">
          <div className="box">
            <div className="content">
              <h2>04</h2>
              <p>Cryptography</p>
              <button
                type="button"
                className="btn "
                data-bs-toggle="modal"
                data-bs-target="#card4"
              >
                Read More
              </button>
            </div>
          </div>
        </button>
        <button className="card btn" id="ZZKOF4qmawfgDu4RjpSSlA==">
          <div className="box">
            <div className="content">
              <h2>05</h2>
              <p>JS NERDS</p>
              <button
                type="button"
                className="btn "
                data-bs-toggle="modal"
                data-bs-target="#card5"
              >
                Read More
              </button>
            </div>
          </div>
        </button>
        <button className="card btn" id="Zo6AGI26A26QDu4RjpSSmQ==">
          <div className="box">
            <div className="content">
              <h2>06</h2>
              <p>Computer Engineering</p>
              <a
                type="button"
                className="btn "
                href="https://github.com/Snimblkar53/Ctf"
                target={"_blank"}
                rel={"noreferrer"}
              >
                Read More
              </a>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Challenges;
