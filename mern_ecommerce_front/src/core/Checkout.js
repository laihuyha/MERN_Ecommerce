import React, { useState, useEffect, Fragment } from "react";
import { processPayment, getBraintreeClientToken } from "./apiCore";
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
    instance: {}, // Braintree instance for DropIn to use to create payment method //instance includes the payment method nonce
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
        setData({ ...data, error: data.error });
      } else {
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
              // onChange={handleChange("address")}
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
  const buy = () => {
    setData({ loading: true });
    //send requestPayment to braintree (data.instance.requestPaymentMehtod())
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log("data", data);
        nonce = data.nonce;
        // console.log("What's sent?", nonce, getTotalUSD(products)); //send nonce and total to backend
        const paymentData = {
          paymentMethodNonce: nonce,
          // amount: getTotal(products),
          amount: getTotalUSD(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            setData({ ...data, success: response.success });
            emptyCart(() => {
              setRun(!run); // run useEffect in parent Cart
              console.log("Payment Successful");
              setData({
                loading: false,
                success: true,
              });
            });
            // console.log(response);
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("error", error);
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
  // const getTotalUSD = () => {
  //   return products.reduce((currentValue, nextValue) => {
  //     return parseFloat(
  //       (currentValue + nextValue.count * nextValue.price) / 23000
  //     ).toFixed(2);
  //   }, 0);
  // };

  const getTotalUSD = () => {
    return products.reduce((currentValue, nextValue) => {
      const exchangeRate = Number(23000);
      const price = Number(
        (currentValue + nextValue.count * nextValue.price) / exchangeRate
      ).toFixed(2);
      return price;
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
  //#endregion

  return (
    <Fragment>
      <h2 className="mb-2">
        Total :{" "}
        <span className="text-success">
          {getTotal().toLocaleString(navigator.language, {
            minimumFractionDigits: 0,
          })}{" "}
          VNĐ
        </span>
        <span style={{ color: "Highlight" }}> {decodedString}</span>
        <span className="text-success">
          {" "}
          {getTotalUSD().toLocaleString(navigator.language, {
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
