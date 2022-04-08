import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "../assets/css/productCustom.css";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import Cart from "./Cart";

// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";

const CardCart = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  //#region state
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  //#endregion

  //#region useEffect and functions
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-sm btn-outline-primary me-1">
            View Product
          </button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-sm btn-outline-warning me-1 float-right"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-fill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-fill">Out of Stock</span>
    );
  };

  const handdleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <Fragment>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              value={count}
              max={product.quantity}
              onChange={handdleChange(product._id)}
            />
          </div>
        </Fragment>
      )
    );
  };
  const showCartRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Fragment>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              removeItem(product._id);
              setRun(!run); // run useEffect in parent Cart
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
          </button>
        </Fragment>
      )
    );
  };
  //#endregion
  return (
    <div className="col-md-6">
      <figure class="card card-product" style={{ height: "600px" }}>
        {/* <div class="img-wrap">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp" />
            </div> */}
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <figcaption class="info-wrap">
          <a href="/" class="title h3" name>
            {product.name}
          </a>
          <p className="card-p  mt-2">
            Short-Description : {product.description.substring(0, 50)}
          </p>
          <p>
            <span className="h5 mt-2 bg-sencondary">Category: </span>
            <span>{product.category && product.category.name}</span>
          </p>
          <p>
            <span className="h5 mt-2 bg-sencondary">Add on: </span>
            <span>{moment(product.createdAt).fromNow()}</span>
          </p>
          <div class="rating-wrap">
            {/* <div class="label-rating">132 reviews</div> */}
            <div class="label-rating">
              <span className="h6">Sold : </span>
              <span>{product.sold}</span>
            </div>
          </div>
        </figcaption>
        <div class="bottom-wrap">
          <div className="row">
            <div className="col-md-6">
              {showStock(product.quantity)}
              <br></br>
              <div class="price-wrap mt-10 h6">
                <span class="price-new">
                  <span className="text-success">Price : </span>
                  {product.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })}{" "}
                  VNĐ
                </span>
                {/* <del class="price-old">$1980</del> */}
              </div>
            </div>
            <div className="col-md-6">
              <div>
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
              </div>
              <div class="row mt-2">
                <span className="col-sm-8">
                  {showCartUpdateOptions(cartUpdate)}
                </span>
                <span className="col-sm-4">
                  {showCartRemoveButton(showRemoveProductButton)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
};
export default CardCart;
