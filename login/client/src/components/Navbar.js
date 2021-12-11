import React from "react";
import { Link } from "react-router-dom";
function Navbar({login,logout,log}) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a
          class="navbar-brand"
          href="https://csidmce.tech/"
          target={"_blank"}
          rel="noreferrer"
        >
          CSI-CATT-DMCE
        </a>
        <div>
          <Link
            className={`btn btn-primary text-center d-${login}`}
            to="/login"
            role="button"
          >
            Login
          </Link>
          <Link
            className={`btn btn-primary text-center d-${logout}`}
            to={"/"}
            onClick={() => {
              sessionStorage.removeItem("data");
              log("login");
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
