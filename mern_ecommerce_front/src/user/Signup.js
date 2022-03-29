import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { API } from "../config";
//#region
import "../assets/plugins/global/plugins.bundle.css";
import "../assets/css/style.bundle.css";
//#endregion
import GGLogo from "../assets/media/svg/brand-logos/google-icon.svg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const { name, email, password, success, error } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); // [name] could be any name or email or password
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // prevent the page from refreshing
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info text-center"
      style={{ display: success ? "" : "none" }}
    >
      Your account is created successfull !
      {/* <br /> Please <a href="/signin">Login</a> */}
    </div>
  );

  //#region Signup
  // create a signup form
  // const signUpForm = () => (
  //   <form>
  //     <div className="form-group">
  //       <label htmlFor="name">Name</label>
  //       <input
  //         onChange={handleChange("name")}
  //         type="text"
  //         className="form-control"
  //         id="name"
  //         placeholder="Enter name"
  //         value={name}
  //       />
  //     </div>
  //     <div className="form-group">
  //       <label htmlFor="email">Email</label>
  //       <input
  //         onChange={handleChange("email")}
  //         type="email"
  //         className="form-control"
  //         id="email"
  //         placeholder="Enter email"
  //         value={email}
  //       />
  //     </div>
  //     <div className="form-group">
  //       <label htmlFor="password">Password</label>
  //       <input
  //         onChange={handleChange("password")}
  //         type="password"
  //         className="form-control"
  //         id="password"
  //         placeholder="Password"
  //         value={password}
  //       />
  //     </div>
  //     <button
  //       onClick={clickSubmit}
  //       type="submit"
  //       className="btn btn-primary btn-block"
  //     >
  //       Submit
  //     </button>
  //   </form>
  // );
  //#endregion

  const signUpForm = () => (
    <form className="form w-100" noValidate="noValidate" id="kt_sign_up_form">
      <div className="signInOption">
        <div className="mb-10 text-center">
          <h1 className="text-dark mb-3">Create an Account</h1>
          <div className="text-gray-400 fw-bold fs-4">
            Already have an account?<span> </span>
            <a href="/signin" className="link-primary fw-bolder">
              Sign in here
            </a>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-light-primary fw-bolder w-100 mb-10"
        >
          <img alt="Logo" src={GGLogo} className="h-20px me-3" />
          Sign in with Google
        </button>
      </div>
      <div className="d-flex align-items-center mb-10">
        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
        <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
      </div>
      <div className="row fv-row mb-7">
        <div className="col-xl-12">
          <label className="form-label fw-bolder text-dark fs-6"> Name</label>
          <input
            onChange={handleChange("name")}
            className="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="first-name"
            autoComplete="off"
            value={name}
          />
        </div>
      </div>
      <div className="fv-row mb-7">
        <label className="form-label fw-bolder text-dark fs-6">Email</label>
        <input
          onChange={handleChange("email")}
          className="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autoComplete="off"
          value={email}
        />
      </div>
      <div className="mb-10 fv-row" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-dark fs-6">
            Password
          </label>
          <div class="position-relative mb-3">
            <input
              onChange={handleChange("password")}
              className="form-control form-control-lg form-control-solid"
              type={isRevealPwd ? "text" : "password"}
              placeholder=""
              name="password"
              autoComplete="off"
              value={password}
            />
            <span
              className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
              data-kt-password-meter-control="visibility"
            >
              <i
                className="bi bi-eye-slash fs-2"
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              ></i>
              <i className="bi bi-eye fs-2 d-none"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={clickSubmit}
          type="button"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary"
        >
          <span className="indicator-label">Register</span>
          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
    </form>
  );

  const signup = (user) => {
    // console.log("name: ", name +"\n"+ "email: ", email +"\n"+  "password: ", password);
    return fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <Layout title=" " description=" ">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center pb-4 pt-3">Sign Up</h1>
                {showError()}
                {showSuccess()}
                {signUpForm()}
                {/* {JSON.stringify(values)} for debugging */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Signup;
