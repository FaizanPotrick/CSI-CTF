import React, { useState,useEffect } from "react";
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
      const targetAnswer = res.map((e)=>{
        return e.target;
      })
      setDisable(targetAnswer);
    };
    api();
  }, [get]);
  disable.map((e)=>{
    const id = document.getElementById(e);
      const text = document.createElement("i");
      text.classList.add("bi");
      text.classList.add("bi-check-circle-fill");
      text.style.color = "greenyellow";
      text.style.position = "absolute";
      text.style.fontSize="30px"
      text.style.top = "10px";
      text.style.right = "20px";
      id.setAttribute("disabled",true);
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
      "Zo6AGI26A26QDu4RjpSSmQ=="
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-question-circle-fill text-light"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
        </svg>
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
              <h3>Card One</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                totam velit? Iure nemo labore inventore?
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
        </button>
        <button className="card btn" id="ZpCcdOHVA26QDu4RjpSSng==">
          <div className="box">
            <div className="content">
              <h2>02</h2>
              <h3>Card Two</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                totam velit? Iure nemo labore inventore?
              </p>
              <a href="http://www.w3.org/2000/svg">Read More</a>
            </div>
          </div>
        </button>
        <button className="card btn" id="cJ+dB4m8c26QDu4RjpSSmg==">
          <div className="box">
            <div className="content">
              <h2>03</h2>
              <h3>Card Three</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                totam velit? Iure nemo labore inventore?
              </p>
              <a href="http://www.w3.org/2000/svg">Read More</a>
            </div>
          </div>
        </button>
        <button className="card btn" id="YYyGEY+xcG6QDu4RjpSSmg==">
          <div className="box">
            <div className="content">
              <h2>04</h2>
              <h3>Card Four</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                totam velit? Iure nemo labore inventore?
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
        </button>
        <button className="card btn" id="ZZKOF4qmawfgDu4RjpSSlA==">
          <div className="box">
            <div className="content">
              <h2>05</h2>
              <h3>Card Five</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                totam velit? Iure nemo labore inventore?
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
        </button>
        <button className="card btn" id="Zo6AGI26A26QDu4RjpSSmQ==">
          <div className="box">
            <div className="content">
              <h2>06</h2>
              <h3>Card six</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
                totam velit? Iure nemo labore inventore?
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Challenges;
