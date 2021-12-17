import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="home-div container-fluid">
        <div className="home_image">
          <img
            className="home_image img-fluid mb-5"
            src="banner.png"
            alt="..."
          />
          <img
            src="boy.png"
            id="boy"
            alt="..."
          />
        </div>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <Link
            id="login_button"
            type="submit"
            to="/login"
            className="btn btn-md text-dark px-4 d-flex justify-content-center align-items-center"
          >
            <i className="bi bi-play-fill fs-1  pt-1 mx-1" />
            PLAY
          </Link>
          <button
            id="login_button"
            type="submit"
            className="btn btn-md text-dark mt-3  px-4 d-flex justify-content-around align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="bi bi-exclamation-circle fs-1 pt-1 mx-1" />
            HELP
          </button>
        </div>
      </div>
      <div className="sponsors">
        <h1 className="text-light text-center mt-5">SPONSORS</h1>
        <div id="hr-line" className="mx-auto my-3 rounded-3 mb-5" />
        <div className="row d-flex justify-content-center align-content-center mb-5">
          <div className="col-md-4 text-center">
            <img
              src="./abhyudaya.png"
              className="img-fluid sponsor-images"
              alt="..."
            />
          </div>
          <div className="col-md-4 text-center">
            <img
              src="./NS.png"
              className="img-fluid sponsor-images"
              alt="..."
            />
          </div>
          <div className="col-md-4 text-center">
            <img
              src="./HAM.png"
              className="img-fluid sponsor-images"
              alt="..."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
