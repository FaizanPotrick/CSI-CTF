import React, { useState } from "react";
import { useHistory } from "react-router-dom";
function Login({ setGet,showAlert,log }) {
  const history = useHistory();
  const [login, setLogin] = useState({
    group: "",
    password: "",
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setLogin(() => {
      return {
        ...login,
        [name]: value,
      };
    });
  };
  const getData = async (e) => {
    e.preventDefault();
    const groupTrim = login.group.trim();
    const passwordTrim = login.password.trim();
    const data = await fetch("/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: groupTrim,
        password: passwordTrim,
      }),
      credentials:"include",
    });
    const res = await data.json();
    if(res.length){
      return showAlert(res);
    }
    setGet(res.data[0]._id);
    showAlert(res.alert);
    history.push(`/${res.data[0]._id}/challenges`);
    log("logout");
    setLogin({
      group: "",
      password: "",
    });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-dark"
      style={{ height: "100vh" }}
    >
      <button
        className="btn text-light text-center m-4  p-0"
        onClick={() => {
          history.push("/");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
      <form
        onSubmit={getData}
        className=" p-5 rounded shadow"
        style={{ width: "500px", background:"rgb(44, 160, 106)",borderRadius:"300px" }}
      >
        <h1 className="text-center text-light fw-bold">Login</h1>
        <p class="text-muted text-center">Please enter your Team Name and password!</p>
        <div className="form-group mb-2">
          <label htmlFor="name" className="text-dark mb-2">Group Name</label>

          <input
            type="text"
            className="form-control"
            id="name"
            value={login.group}
            name="group"
            style={{ width: "100%" }}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-group ">
          <label htmlFor="password" className="text-dark mb-2">Password</label>

          <input
            type="password"
            className="form-control"
            id="password"
            value={login.password}
            name="password"
            style={{ width: "100%" }}
            onChange={onChange}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary text-center mt-4"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
