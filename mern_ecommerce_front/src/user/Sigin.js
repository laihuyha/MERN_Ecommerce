import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
//#region
import "../assets/plugins/global/plugins.bundle.css";
import "../assets/css/style.bundle.css";
//#endregion
import GGLogo from "../assets/media/svg/brand-logos/google-icon.svg";
import FBLogo from "../assets/media/svg/brand-logos/facebook-4.svg";
import AppleLogo from "../assets/media/svg/brand-logos/apple-black.svg";

const Signin = () => {
  const signInForm = () => (
    <form
      class="form w-100"
      noValidate="noValidate"
      id="kt_sign_in_form"
      action="#"
    >
      <div class="text-center mb-10">
        <h1 class="text-dark mb-3">Sign In</h1>
        <div class="text-gray-400 fw-bold fs-4">
          New Here?
          <a href="/signup" class="link-primary fw-bolder">
            <span> </span>
            Create an Account
          </a>
        </div>
      </div>
      <div class="fv-row mb-10">
        <label class="form-label fs-6 fw-bolder text-dark">Email</label>
        <input
          onChange={handleChange("email")}
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autoComplete="off"
          value={email}
        />
      </div>
      <div class="fv-row mb-10">
        <div class="d-flex flex-stack mb-2">
          <label class="form-label fw-bolder text-dark fs-6 mb-0">
            Password
          </label>
          <a
            href="../../demo1/dist/authentication/layouts/basic/password-reset.html"
            class="link-primary fs-6 fw-bolder"
          >
            Forgot Password ?
          </a>
        </div>
        <div class="position-relative mb-3">
          <input
            onChange={handleChange("password")}
            class="form-control form-control-lg form-control-solid"
            type={isRevealPwd ? "text" : "password"}
            name="password"
            autoComplete="off"
            value={password}
          />
          <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2">
            <i
              // className="bi bi-eye-slash fs-2"
              className={`bi ${isRevealPwd ? "bi-eye-slash" : "bi-eye"} fs-2`}
              onClick={() => setIsRevealPwd((prevState) => !prevState)}
            ></i>
          </span>
        </div>
      </div>
      <div class="text-center">
        <button
          onClick={clickSubmit}
          type="submit"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label">Continue</span>
          <span class="indicator-progress">
            Please wait...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <div class="text-center text-muted text-uppercase fw-bolder mb-5">
          or
        </div>
        <a
          href="#"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img alt="Logo" src={GGLogo} class="h-20px me-3" />
          Continue with Google
        </a>
        <a
          href="#"
          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"
        >
          <img alt="Logo" src={FBLogo} class="h-20px me-3" />
          Continue with Facebook
        </a>
        <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100">
          <img alt="Logo" src={AppleLogo} class="h-20px me-3" />
          Continue with Apple
        </a>
      </div>
    </form>
  );
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    // success: false,
    loading: false,
    redirectToReferrer: false,
  });
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  const { email, password, loading, error, redirectToReferrer } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); // [name] could be any name or email or password
  };

  const clickSubmit = (event) => {
    event.preventDefault(); // prevent the page from refreshing
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        // setValues({
        //   ...values,
        //   // email: "",
        //   // password: "",
        //   // error: "",
        //   // success: true,
        //   // loading: false,
        //   redirectToReferrer: true,
        // });

        //using the authenticate method to set the user data in the local storage then redirect to the HomePage
        authenticate(data, () => {
          //set the user data in the local storage Line(above)
          setValues({
            ...values,
            redirectToReferrer: true, //redirect to the HomePage
          });
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

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

  const redirectUser = () => {
    // if (redirectToReferrer) {
    //   if (user && user.role === 1) {
    //     return <Redirect to="/admin/dashboard" />;
    //   } else {
    //     return <Redirect to="/user/dashboard" />;
    //   }
    // if (isAuthenticated()) {
    //   return <Redirect to="/" />;
    // }
    // }

    if (redirectToReferrer) {
      // return <Redirect to="/" />
      if (isAuthenticated()) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Layout title=" " description=" ">
      <div className="container">
        <div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
          {showLoading()}
          {showError()}
          {signInForm()}
          {redirectUser()} {/* redirectUser() to / */}
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
