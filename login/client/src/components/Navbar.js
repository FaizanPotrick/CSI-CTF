import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const [display, setDisplay] = useState({
    login: "none",
    logout: "block",
  });
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    switch (pathname) {
      case "/login":
        setDisplay({
          login: "none",
          logout: "none",
        });
        break;
      case "/":
        setDisplay({
          login: "block",
          logout: "none",
        });
        break;
      default:
        setDisplay({
          login: "none",
          logout: "block",
        });
        break;
    }
  }, [pathname]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-around"
      style={{ height: "8vh" }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="https://csidmce.tech/"
          target={"_blank"}
          rel="noreferrer"
          alt="..."
        >
          CSI-CATT-DMCE
        </a>
        <button
          className="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{ position: "fixed", top: "10vh", right: "0px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            className="bi bi-question-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
          </svg>
        </button>
        <div>
          <Link
            className={`btn btn-primary text-center  btn-lg d-${display.login}`}
            to="/login"
          >
            Login
          </Link>
          <Link
            className={`btn btn-primary btn-lg  text-center d-${display.logout}`}
            to={"/"}
            onClick={() => {
              sessionStorage.removeItem("data");
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
