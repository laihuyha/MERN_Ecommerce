import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/productCustom.css";
import ShowImage from "./ShowImage";
// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";

const Card = ({ product }) => {
  return (
    <div class="col-md-4">
      <figure class="card card-product">
        {/* <div class="img-wrap">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp" />
        </div> */}
        <ShowImage item={product} url="product" />
        <figcaption class="info-wrap">
          <a href="/" class="title h3">
            {product.name}
          </a>
          <p class="desc">Short-Description : {product.description}</p>
          <div class="rating-wrap">
            {/* <div class="label-rating">132 reviews</div> */}
            <div class="label-rating">Sold : {product.sold}</div>
          </div>
        </figcaption>
        <div class="bottom-wrap">
          <Link to="/" class="btn btn-sm btn-outline-danger me-1 float-right">
            Order Now
          </Link>
          <Link to="/" class="btn btn-sm btn-outline-primary me-1 float-right">
            View Info
          </Link>
          <div class="price-wrap mt-3 h5">
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
      </figure>
    </div>
  );
};
export default Card;
