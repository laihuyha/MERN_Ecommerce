import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders } from "./API";
import ShowSmImage from "../core/ShowSmImage";
import moment from "moment";
import thumbDefault from "../assets/media/svg/files/blank-image.svg";
import "../assets/plugins/custom/datatables/datatables.bundle.css";
import "../assets/plugins/global/plugins.bundle.css";
import "../assets/css/style.bundle.css";

const Orders = () => {
  //#region state
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();
  //#endregion

  //#region useEffect and function
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

  const showStatus = (status) => {
    if (status === "Not processed") {
      return (
        <Fragment>
          <span className="badge badge-secondary float-right">{status}</span>
        </Fragment>
      );
    } else if (status === "Processing") {
      return (
        <Fragment>
          <span className="badge badge-warning float-right">{status}</span>
        </Fragment>
      );
    } else if (status === "Shipped") {
      return (
        <Fragment>
          <span className="badge badge-info float-right">{status}</span>
        </Fragment>
      );
    } else if (status === "Delivered") {
      return (
        <Fragment>
          <span className="badge badge-success float-right">{status}</span>
        </Fragment>
      );
    } else if (status === "Cancelled") {
      return (
        <Fragment>
          <span className="badge badge-danger float-right">{status}</span>
        </Fragment>
      );
    }
  };

  const showInput = (name, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text" style={{ width: "150px" }}>
          {name}
        </div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const showOrders = () => {
    if (orders.length > 0) {
      return orders.map((o, index) => {
        return (
          <div
            className="card mb-5"
            style={{ border: "0.1px solid green" }}
            key={index}
          >
            <div className="card-header mt-5">
              <div className="col-md-5">
                <h4>
                  Order ID: <span className="text-success">{o._id}</span>
                </h4>
                <p>
                  Transaction ID :{" "}
                  <span className="text-success">{o.transaction_id}</span>
                </p>
              </div>
              <div className="col-md-4">
                <h4>Create Time: {moment(o.createdAt).fromNow()}</h4>
              </div>
              <div className="col-md-3">
                <h4 className="float-right">Status: {showStatus(o.status)}</h4>
              </div>
            </div>
            <div className="card-body">
              <div className="row ml-1">
                <div className="col-md-5">
                  Amount :{" "}
                  <span style={{ fontWeight: "800" }}>{o.amount} </span>USD
                </div>
                <div className="col-md-4">
                  Order by :{" "}
                  <span className="text-info" style={{ fontWeight: "800" }}>
                    {o.user.name}{" "}
                  </span>
                </div>
                <div className="col-md-3">
                  Delivery to :{" "}
                  <span className="text-primary" style={{ fontWeight: "600" }}>
                    {o.address}{" "}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="text-info ml-5">
              Total product in Order : {o.products.length}
            </h4>
            <div className="container mt-2 mb-4">
              {o.products.map((p, index) => (
                <div
                  className="card-body rounded-3 mt-1"
                  style={{ border: "2px solid indigo" }}
                  key={index}
                >
                  {console.log(p)}
                  {showInput("Product Id", p._id)}
                  {showInput("Product name", p.name)}
                  {showInput("Product price", p.price)}
                  {showInput("Product quantity", p.count)}
                </div>
              ))}
            </div>
          </div>
        );
      });
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);
  //#endregion
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
        {showOrders()}
      </div>
    </Layout>
  );
};

export default Orders;
