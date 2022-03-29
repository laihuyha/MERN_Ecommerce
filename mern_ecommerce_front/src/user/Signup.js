import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { API } from "../config";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value }); // [name] could be any name or email or password
  };

  // create a signup form
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <button
        onClick={clickSubmit}
        type="submit"
        className="btn btn-primary btn-block"
      >
        Submit
      </button>
    </form>
  );

  const { name, email, password, success, error } = values;

  const clickSubmit = (event) => {
    event.preventDefault(); // prevent the page from refreshing
    setValues({ ...values, error: false });
    signup({ name, email, password });
  };

  const signup = (user) => {
    // console.log("name: ", name +"\n"+ "email: ", email +"\n"+  "password: ", password);
    fetch(`${API}/signup`, {
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
        console.log(err);
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
                {signUpForm()}
                {JSON.stringify(values)} {/* for debugging */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Signup;
