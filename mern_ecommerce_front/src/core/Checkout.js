import React, { useState, useEffect, Fragment } from "react";
import {
  getProducts,
  processPayment,
  getBraintreeClientToken,
  createOrder,
} from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  //#region State
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });
  //#endregion

  //#region Effect and Functions
  useEffect(() => {
    getToken(userId, token);
  }, []);
  //#region use for Brain tree
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };
  const showDropIn = (clientToken) => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Address</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Buy
          </button>
        </div>
      ) : null}
    </div>
  );

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: (getTotal(products) / 23000).toFixed(2),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  setRun(!run); // run useEffect in parent Cart
                  console.log("Payment Successfull !!, Emptying cart");
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };
  //#endregion
  const str = "&#60;" + "&#61;" + "&#62;";
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(
    `<!doctype html><body>${str}`,
    "text/html"
  ).body.textContent;
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      <div className="mt-7">
        <div>{showDropIn()}</div>
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
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks for buying!
    </div>
  );
  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };
  //#endregion

  return (
    <Fragment>
      <h2 className="mb-2">
        Total :{" "}
        <span className="text-success">
          {getTotal().toLocaleString(navigator.language, {
            minimumFractionDigits: 0,
          })}{" "}
          VN??
        </span>
        <span style={{ color: "Highlight" }}> {decodedString}</span>
        <span className="text-success">
          {" "}
          {(getTotal() / 23000).toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
          })}{" "}
          USD
        </span>
      </h2>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </Fragment>
  );
};

export default Checkout;
