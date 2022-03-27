import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/restaurants">
          Restaurant Reviews
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to={"/restaurants"}
                className="nav-link"
              >
                Restaurants
              </Link>
            </li>
            <li className="nav-item">
              {props.user ? (
                <a
                  onClick={props.logout}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout {props.user.name}
                </a>
              ) : (
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
