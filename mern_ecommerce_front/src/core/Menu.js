import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated, authenticate } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9000" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-primary">
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
            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
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
            <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">
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
);

export default withRouter(Menu);
