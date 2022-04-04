import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/productCustom.css";
import ShowImage from "./ShowImage";
import moment from "moment";

// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";

const CardDetails = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-sm btn-outline-primary me-1 float-right">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showAddToCartButton = (showViewProductButton) => {
    return (
      <button className="btn btn-sm btn-outline-warning me-1">
        Add to Cart
      </button>
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-fill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-fill">Out of Stock</span>
    );
  };
  return (
    <div class="card" style={{ backgroundColor: "#d3eaf2" }}>
      <div class="container-fliud">
        <div class="wrapper row">
          <div class="preview col-md-6 mb-4 mt-4 ml-4">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <ShowImage item={product} url="product" />
              </div>
            </div>
          </div>
          <div class="details col-md-5 mb-4 mt-4">
            <h3 class="product-title"> {product.name}</h3>
            <div class="rating">
              <span class="review-no">
                {product.category && product.category.name}
              </span>
            </div>
            <p class="product-description">{product.description}</p>
            <h4 class="price">
              current price:{" "}
              <span>
                {" "}
                {product.price.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}{" "}
                VNĐ
              </span>
            </h4>
            <p class="vote">Add on:{moment(product.createdAt).fromNow()}</p>
            <h5 class="sizes">Sold : {product.sold}</h5>
            <h5 class="colors">{showStock(product.quantity)}</h5>
            <div class="action">
              {showViewButton(showViewProductButton)}
              {showAddToCartButton(showViewProductButton)}
              <button class="like btn btn-default" type="button">
                <span class="fa fa-heart"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardDetails;
