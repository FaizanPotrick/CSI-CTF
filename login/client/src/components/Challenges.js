import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
function Challenges({ get, showAlert }) {
  const [answer, setAnswer] = useState("");
  const [disable, setDisable] = useState(() => {
    const saved = sessionStorage.getItem("disarm");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  });
  useEffect(() => {
    sessionStorage.setItem("disarm", JSON.stringify(disable));
    disable.map((e) => {
      const id = document.getElementById(e);
      const text = document.createElement("span");
      text.setAttribute("className","badge badge-secondary text-success");
      text.innerHTML = "new";
      return id.append(text);
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
    setDisable([...disable, encrypted]);
    showAlert(res);
    setAnswer("");
  };
  return (
    <div
      className="d-flex flex-column"
      style={{ overflowX: "hidden", height: "92vh" }}
    >
      <div className="d-flex flex-row justify-content-between"></div>
      <div className="row d-flex justify-content-center">
        <form className="row g-3" onSubmit={update}>
          <div className="col-auto">
            <input
              type="text"
              className="form-control"
              name="answer"
              value={answer}
              placeholder="Enter the Flag"
              onChange={onChange}
              required
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Submit Flag
            </button>
          </div>
        </form>
        <div className="row  container">
          <div className="col-md-6 col-sm-6 col-12">
            <Link
              className="card m-0 p-0 text-decoration-none"
              style={{
                background: "linear-gradient(to right, #3c1053, #ad5389)",
                borderRadius: "30px",
                width: "35vw",
              }}
              to={`/${get}/1`}
            >
              <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-3">
                  <img
                    src="https://images.unsplash.com/photo-1639196933420-0fad4a755157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    className="card-img-top h-100"
                    alt="..."
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 31% 100%)",
                      borderRadius: "0px 30px 30px 0px",
                    }}
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-6 col-sm-6 col-12">
            <Link
              className="card m-0 p-0 text-decoration-none"
              style={{
                background: "linear-gradient(to right, #3c1053, #ad5389)",
                borderRadius: "30px",
                width: "35vw",
              }}
              to={`/${get}/1`}
            >
              <div className="row">
                <div className="col-md-9 col-sm-9 col-9">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-3">
                  <img
                    src="https://images.unsplash.com/photo-1639196933420-0fad4a755157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                    className="card-img-top h-100"
                    alt="..."
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 31% 100%)",
                      borderRadius: "0px 30px 30px 0px",
                    }}
                  />
                </div>
              </div>
            </Link>
            <button
              id="YZKOE+HVA26QDu4RjpSSnw=="
              className="btn"
            >
              <div>

              hii1
              </div>
            </button>
            <button
              id="ZpCcdOHVA26QDu4RjpSSng=="
              className="btn btn-primary"
            >
              hii2
            </button>
            <button
              id="ZJKOGpK9ah6QDu4RjpSSmw=="
              className="btn btn-primary"
            >
              hii3
            </button>
            <button
              id="cJ+dB4m8c26QDu4RjpSSmg=="
              className="btn btn-primary"
            >
              hii4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Challenges;
