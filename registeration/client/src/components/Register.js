import React from "react";
import { useHistory } from "react-router-dom";
import "./register.css";

function Register({
  gmail,
  setRegister,
  group,
  firstMember,
  secondMember,
  thirdMember,
  password,
  onChange,
  showAlert,
}) {
  const history = useHistory();
  const getData = async (e) => {
    e.preventDefault();
    const groupTrim = group.trim();
    const gmailTrim = gmail.trim();
    const firstMemberTrim = firstMember.trim().toLowerCase();
    const secondMemberTrim = secondMember.trim().toLowerCase();
    const thirdMemberTrim = thirdMember.trim().toLowerCase();
    const passwordTrim = password.trim();
    const data = await fetch("/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: groupTrim,
        gmail: gmailTrim,
        firstMember: firstMemberTrim.toLowerCase(),
        secondMember: secondMemberTrim.toLowerCase(),
        thirdMember: thirdMemberTrim.toLowerCase(),
        password: passwordTrim,
      }),
      credentials: "include",
    });
    const res = await data.json();
    showAlert(res);
    if (
      res ===
      "#E52B50:white:This TeamName has already been taken, please enter new TeamName"
    ) {
      return setRegister({
        group: "",
        gmail: "",
        firstMember: "",
        secondMember: "",
        thirdMember: "",
        password: "",
      });
    }
    history.push("/");
    setRegister({
      group: "",
      gmail: "",
      firstMember: "",
      secondMember: "",
      thirdMember: "",
      password: "",
    });
  };
  return (
    <div className="fill-window" style={{ overflowY: "scroll" }}>
      <button
        className="btn text-light text-center"
        style={{ position: "absolute", top: "2vh", left: "2vw", zIndex: "1" }}
        onClick={() => {
          history.push("/");
        }}
      >
        <i
          className="bi bi-arrow-left"
          style={{ zIndex: "100", fontSize: "40px" }}
        ></i>
      </button>
      <div className="container-fluid  d-flex align-items-center justify-content-center mt-5 ">
        <div
          id="card"
          className="container col-md-12 col-sm-12 col-12 mt-3 mb-3 p-5"
          style={{ maxWidth: "580px" }}
        >
          <p className="text-light text-center form-banner pt-1">
            CTF Registeration Form{" "}
          </p>{" "}
          <form id="registeredForm" onSubmit={getData}>
            <div className="form-group mt-4 ">
              <input
                type="text"
                className="form-control"
                name="group"
                value={group}
                onChange={onChange}
                required
                placeholder="Group name"
              />
            </div>{" "}
            <div className="form-group mt-4">
              <input
                type="email"
                className="form-control"
                name="gmail"
                value={gmail}
                onChange={onChange}
                required
                placeholder=" Email id"
              />
            </div>{" "}
            <div className="form-group mt-4 ">
              <input
                type="text"
                className="form-control"
                name="firstMember"
                value={firstMember}
                onChange={onChange}
                required
                placeholder="Name of first member"
              />
            </div>{" "}
            <div className="form-group mt-4">
              <input
                type="text"
                className="form-control"
                name="secondMember"
                value={secondMember}
                onChange={onChange}
                placeholder="Name of second member"
              />
            </div>{" "}
            <div className="form-group mt-4">
              <input
                type="text"
                className="form-control"
                name="thirdMember"
                value={thirdMember}
                onChange={onChange}
                placeholder="Name of third member"
              />
            </div>{" "}
            <div className="form-group mt-4">
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
              />
            </div>{" "}
            <div className="form-group text-center mt-3">
              <button type="submit" className="close buttons">
                SUBMIT{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Register;
