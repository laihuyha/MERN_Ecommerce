import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9000" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <div className="row">
      <div className="col-lg-9 bg-primary">
        {" "}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/")} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/shop")}
              to="/shop"
            >
              Shop
            </Link>
          </li>
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "signin")}
                  to="/signin"
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "signup")}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  to="/signout"
                  onClick={() => signout(() => history.push("/"))} //signout and redirect to home page  //history.push("/") means redirect to home page
                >
                  Sign Out
                </span>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Fragment>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/user/dashboard")}
                  to="/user/dashboard"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={isActive(history, "/admin/dashboard")}
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{ cursor: "pointer", color: "#ffffff" }}
                  to="/signout"
                  onClick={() => signout(() => history.push("/"))} //signout and redirect to home page  //history.push("/") means redirect to home page
                >
                  Sign Out
                </span>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
      <div className="col-lg-3 bg-primary">
        <ul className="nav nav-tabs float-right mr-3">
          <li className="nav-item">
            <div className="mb-n1">
              <Link
                className="nav-link"
                style={isActive(history, "/cart")}
                to="/cart"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <sup className="ml-2">
                    <small
                      className="cart-badge"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {itemTotal()}
                    </small>
                  </sup>
                </span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default withRouter(Menu);
