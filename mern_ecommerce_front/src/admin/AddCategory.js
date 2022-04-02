import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./API";

const AddCategory = () => {
  //#region State
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  //#endregion

  //#region Event Handlers Functions
  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (name === "") {
      setError("Please enter a category name");
      return;
    }
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
        // setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  //#endregion

  const { user, token } = isAuthenticated();

  //#region Form and showing error/success messages
  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="" className="text-muted">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{error}</h3>;
    }
  };
  //#endregion

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add a new category?`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Link to="/admin/dashboard" className="btn btn-outline-primary mb-3">
            <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
          </Link>
          {newCategoryForm()}
          {showSuccess()}
          {showError()}
        </div>
      </div>
    </Layout>
  );
};
export default AddCategory;
