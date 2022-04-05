import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div className="mt-7">
        <button className="btn btn-success">
          Check Out <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    ) : (
      <div className="mt-7">
        <h3>Please Sign In First</h3>
        <Link to="/signin">
          <button className="btn btn-primary">
            Sign In <i className="fas fa-chevron-right"></i>
          </button>
        </Link>
      </div>
    );
  };
  return (
    <Fragment>
      <h2>
        Total :{" "}
        <span className="text-success">
          {getTotal().toLocaleString(navigator.language, {
            minimumFractionDigits: 0,
          })}{" "}
          VNĐ
        </span>
      </h2>
      {showCheckout()}
    </Fragment>
  );
};

export default Checkout;
