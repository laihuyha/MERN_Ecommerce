import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders } from "./API";
import thumbDefault from "../assets/media/svg/files/blank-image.svg";
import "../assets/plugins/custom/datatables/datatables.bundle.css";
import "../assets/plugins/global/plugins.bundle.css";
import "../assets/css/style.bundle.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOrders(data);
        }
      })
      .catch((err) => {});
  };
  const noOrders = (orders) => {
    return orders.length < 1 ? (
      <div className="text-center">
        <h1 className="display-1">
          <span className="text-warning">
            <i className="fa fa-shopping-cart"></i>
          </span>
        </h1>
        <h1 className="display-4">You have no orders</h1>
        <p className="lead">You have not made any purchases yet</p>
        <p className="lead">
          <Link to="/shop" className="btn btn-lg btn-warning">
            Continue Shopping
          </Link>
        </p>
      </div>
    ) : null;
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <Layout title="Orders" description="Manage your orders">
      <div
        id="kt_content_container"
        className="container-xxl"
        data-select2-id="select2-data-kt_content_container"
      >
        <Link to="/admin/dashboard" className="btn btn-outline-primary mb-3">
          <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
        </Link>
        {noOrders(orders)}
        {JSON.stringify(orders)}
      </div>
    </Layout>
  );
};

export default Orders;
