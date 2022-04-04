import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/productCustom.css";
import ShowImage from "./ShowImage";
import moment from "moment";

// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
// import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js";
// import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";

const Card = ({ product, showViewProductButton = true }) => {
    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-sm btn-outline-primary me-1 float-right">View Product</button>
                </Link>
            )
        );
    };

    const showAddToCartButton = showViewProductButton => {
        return (
            <button className="btn btn-sm btn-outline-warning me-1 float-right">Add to Cart</button>
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
        // <div className="container">
        //   <div class="card">
        //     <div class="col-8">
        //       {/* <div class="img-wrap">
        //       <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp" />
        //     </div> */}
        //       <ShowImage item={product} url="product" />
        //       <figcaption class="info-wrap">
        //         <a href="/" class="title h3" name >
        //           {product.name}
        //         </a>
        //         <p className="card-p  mt-2">Short-Description : {product.description.substring(0, 50)}</p>
        //         <p className="lead mt-2"> Category:{product.category && product.category.name}</p>
        //         <p className="lead mt-2"> Add on:{moment(product.createdAt).fromNow()}</p>
        //         <div class="rating-wrap">
        //           {/* <div class="label-rating">132 reviews</div> */}
        //           <div class="label-rating">Sold : {product.sold}</div>
        //         </div>
        //       </figcaption>
        //       <div class="bottom-wrap">

        //         {showStock(product.quantity)}
        //         <br></br>
        //         {showViewButton(showViewProductButton)}

        //         {showAddToCartButton(showViewProductButton)}

        //         <div class="price-wrap mt-3 h6">
        //           <span class="price-new">
        //             <span className="text-success">Price : </span>
        //             {product.price.toLocaleString(navigator.language, {
        //               minimumFractionDigits: 0,
        //             })}{" "}
        //             VNĐ
        //           </span>
        //           {/* <del class="price-old">$1980</del> */}
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div >
            <figure class="card card-product">
                {/* <div class="img-wrap">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp" />
        </div> */}
                <ShowImage item={product} url="product" />
                <figcaption class="info-wrap">
                    <a href="/" class="title h3">
                        {product.name}
                    </a>
                    <p class="desc">Short-Description : {product.description.substring(0, 50)}</p>
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
                    <div class="price-wrap mt-3 h6">
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
