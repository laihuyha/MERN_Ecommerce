import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./API";
import thumbDefault from "../assets/media/svg/files/blank-image.svg";
import "../assets/plugins/custom/datatables/datatables.bundle.css";
import "../assets/plugins/global/plugins.bundle.css";
import "../assets/css/style.bundle.css";

const UpdateProduct = ({match}) => {
  //#region State
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const init = productId => {
    getProduct(productId).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error });
        } else {
            // populate the state
            setValues({
                ...values,
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category._id,
                shipping: data.shipping,
                quantity: data.quantity,
                formData: new FormData()
            });
            
            loadCategories();
        }
    });
};
  //#endregion
  //#region useEffect
  useEffect(() => {
   
    init(match.params.productId);
  }, []);
  //#endregion
  //#region Event Handlers Functions
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          error: false,
          redirectToProfile: true,
          createdProduct: data.name,
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2 className="text-center">{`${createdProduct}`} is update!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

    const redirectUser = () => {
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/" />;
            }
        }
    }

  // const imageChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setValues(e.target.files[0]);
  //   }
  // };

  const imgchange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setValues({ ...values, photo: e.target.files[0] });
    }
  };
  const removeSelectedImage = () => {
    setValues({ ...values, photo: "" });
  };

  //load categories and set form data
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };
  //#endregion
  //#region Partials Of The Page
  const photoPartial = () => {
    return (
      <Fragment>
        <div className="card card-flush py-4">
          <div className="card-header">
            <div className="card-title">
              <h2>Photo</h2>
            </div>
          </div>

          <div className="card-body text-center pt-0">
            <div
              className="image-input image-input-outline image-input-empty"
              data-kt-image-input="true"
              style={{ backgroundImage: `url(${thumbDefault})` }}
            >
              <div className="image-input-wrapper w-150px h-150px" id="preview">
                {values.photo && (
                  <Fragment>
                    <img
                      className="image-input-wrapper w-150px h-150px"
                      src={URL.createObjectURL(values.photo)}
                      alt="Thumb"
                    />
                  </Fragment>
                )}
              </div>
              <label
                class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                title="Change avatar"
              >
                <i class="las la-paperclip"></i>

                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange("photo")}
                />
                <input
                  type="hidden"
                  name="avatar_remove"
                  onChange={imgchange}
                />
              </label>
              <span
                className="btn btn-icon btn-circle btn-danger w-25px h-25px bg-danger shadow"
                onClick={removeSelectedImage}
                style={{ backgroundColor: "red", marginTop: "10px" }}
              >
                <i class="las la-eraser"></i>
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  // //does'nt need anymore
  // const shippingPartial = () => {
  //   return (
  //     <Fragment>
  //       <div
  //         className="card card-flush py-4"
  //         data-select2-id="select2-data-140-miby"
  //       >
  //         <div className="card-header">
  //           <div className="card-title">
  //             <h2>Shipping</h2>
  //           </div>
  //           <div className="card-toolbar">
  //             <div
  //               className="rounded-circle bg-success w-15px h-15px"
  //               id="kt_ecommerce_add_product_status"
  //             ></div>
  //           </div>
  //         </div>
  //         <div
  //           className="card-body pt-0"
  //           data-select2-id="select2-data-139-e7tr"
  //         >
  //           <div class="input-group input-group-solid flex-nowrap">
  //             <span class="input-group-text">
  //               <i class="fonticon-settings"></i>
  //             </span>
  //             <div class="overflow-hidden flex-grow-1">
  //               <select
  //                 class="form-select form-select-solid rounded-start-0 border-start"
  //                 data-control="select2"
  //                 data-placeholder="Select an option"
  //               >
  //                 <option>Choose Below</option>
  //                 <option value="0">No</option>
  //                 <option value="1">Yes</option>
  //               </select>
  //             </div>
  //           </div>
  //           <div className="text-muted fs-7">Set the product shipping.</div>
  //         </div>
  //       </div>
  //     </Fragment>
  //   );
  // };

  const categoryPartial = () => {
    return (
      <Fragment>
        <div
          className="card card-flush py-4"
          data-select2-id="select2-data-158-s44k"
        >
          <div className="mb-n8">
            <div className="card-header">
              <div className="card-title">
                <h2>Product Details</h2>
              </div>
            </div>
            <div
              className="card-body pt-0"
              data-select2-id="select2-data-157-73bw"
            >
              <label className="form-label">Categories</label>
              <div class="input-group input-group-solid flex-nowrap">
                <span class="input-group-text">
                  <i class="fonticon-bookmark"></i>
                </span>
                <div class="overflow-hidden flex-grow-1">
                  <select
                    class="form-select form-select-solid rounded-start-0 border-start"
                    data-control="select2"
                    data-placeholder="Select an option"
                    onChange={handleChange("category")}
                  >
                    <option>Choose Below</option>
                    {categories &&
                      categories.map((c, i) => (
                        <option key={i} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="text-muted fs-7 mb-7">
                Add product to a category.
              </div>

              <a
                href="/create/category"
                className="btn btn-light-primary btn-sm mb-10"
              >
                <span className="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.5"
                      x="11"
                      y="18"
                      width="12"
                      height="2"
                      rx="1"
                      transform="rotate(-90 11 18)"
                      fill="black"
                    ></rect>
                    <rect
                      x="6"
                      y="11"
                      width="12"
                      height="2"
                      rx="1"
                      fill="black"
                    ></rect>
                  </svg>
                </span>
                Create new category
              </a>
            </div>
          </div>
          <div className="md-n8">
            <div className="card-header">
              <div className="card-title">
                <h2>Shipping</h2>
              </div>
              <div className="card-toolbar">
                <div
                  className="rounded-circle bg-success w-15px h-15px"
                  id="kt_ecommerce_add_product_status"
                ></div>
              </div>
            </div>
            <div
              className="card-body pt-0"
              data-select2-id="select2-data-139-e7tr"
            >
              <div class="input-group input-group-solid flex-nowrap">
                <span class="input-group-text">
                  <i class="fonticon-settings"></i>
                </span>
                <div class="overflow-hidden flex-grow-1">
                  <select
                    class="form-select form-select-solid rounded-start-0 border-start"
                    data-control="select2"
                    data-placeholder="Select an option"
                    onChange={handleChange("shipping")}
                  >
                    <option>Choose Below</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>
              <div className="text-muted fs-7">Set the product shipping.</div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  const generalPartial = () => {
    return (
      <Fragment>
        <div className="card card-flush py-4">
          <div className="card-header">
            <div className="card-title">
              <h2>General</h2>
            </div>
          </div>

          <div className="card-body pt-0">
            <div className="mb-10 fv-row fv-plugins-icon-container">
              <label className="required form-label">Product Name</label>

              <input
                type="text"
                name="product_name"
                className="form-control mb-2"
                placeholder="Product name"
                onChange={handleChange("name")}
                value={name}
                required
              />

              <div className="text-muted fs-7">
                A product name is required and recommended to be unique.
              </div>

              <div className="fv-plugins-message-container invalid-feedback"></div>
            </div>

            <div>
              <label className="form-label">Description</label>

              <textarea
                name="description"
                className="form-control mb-2"
                placeholder="Description"
                onChange={handleChange("description")}
                value={description}
              ></textarea>

              <div className="text-muted fs-7">
                Set a description to the product for better visibility.
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  const pricingPartial = () => {
    return (
      <Fragment>
        <div
          className="card card-flush py-4"
          data-select2-id="select2-data-147-ytly"
        >
          <div className="row">
            <div className="col-md-6">
              <div className="card-header">
                <div className="card-title">
                  <h2>Pricing</h2>
                </div>
              </div>
              <div
                className="card-body pt-0"
                data-select2-id="select2-data-146-p27a"
              >
                <div className="mb-10 fv-row fv-plugins-icon-container">
                  <label className="required form-label">Base Price</label>

                  <input
                    type="number"
                    name="price"
                    className="form-control mb-2"
                    placeholder="Product price"
                    onChange={handleChange("price")}
                    value={price}
                    required
                    min="0"
                  />

                  <div className="text-muted fs-7">Set the product price.</div>

                  <div className="fv-plugins-message-container invalid-feedback"></div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card-header">
                <div className="card-title">
                  <h2>Quantity</h2>
                </div>
              </div>
              <div
                className="card-body pt-0"
                data-select2-id="select2-data-146-p27a"
              >
                <div className="mb-10 fv-row fv-plugins-icon-container">
                  <label className="required form-label">Base Quantity</label>

                  <input
                    type="number"
                    name="price"
                    className="form-control mb-2"
                    placeholder="Product price"
                    required
                    min="0"
                    onChange={handleChange("quantity")}
                    value={quantity}
                  />

                  <div className="text-muted fs-7">
                    Set the product quantity.
                  </div>

                  <div className="fv-plugins-message-container invalid-feedback"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  //#endregion
  //#region another
  const {
    name,
    description,
    price,
    categories,
    
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;
  const { user, token } = isAuthenticated();
  //#endregion
  //#region Form
  const newProductForm = () => (
    <form
      id="kt_ecommerce_add_product_form"
      className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
      data-select2-id="select2-data-kt_ecommerce_add_product_form"
      onSubmit={clickSubmit}
    >
      <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">
        {photoPartial()}
        {categoryPartial()}
        {/* {shippingPartial()} */}
      </div>

      <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
        <ul className="nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-bold mb-n2">
          <li className="nav-item">
            <a
              className="nav-link text-active-primary pb-4 active"
              data-bs-toggle="tab"
              href="#kt_ecommerce_add_product_general"
            >
              General
            </a>
          </li>
        </ul>

        <div className="tab-content" data-select2-id="select2-data-149-b934">
          <div
            className="tab-pane fade active show"
            id="kt_ecommerce_add_product_general"
            role="tab-panel"
            data-select2-id="select2-data-kt_ecommerce_add_product_general"
          >
            <div
              className="d-flex flex-column gap-7 gap-lg-10"
              data-select2-id="select2-data-148-8iwp"
            >
              {generalPartial()}
              {pricingPartial()}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Link
            to="/admin/dashboard"
            id="kt_ecommerce_add_product_cancel"
            className="btn btn-light me-5"
          >
            Cancel
          </Link>

          <button
            type="submit"
            id="kt_ecommerce_add_product_submit"
            className="btn btn-primary"
          >
            <span className="indicator-label">Save Changes</span>
            <span className="indicator-progress">
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
  //#endregion

  return (
    <Layout
      title="Add a new product"
      description="Add a new product to the store"
    >
      <div
        id="kt_content_container"
        className="container-xxl"
        data-select2-id="select2-data-kt_content_container"
      >
        <Link to="/admin/dashboard" className="btn btn-outline-primary mb-3">
          <i className="fas fa-arrow-circle-left"></i> Back to Dashboard
        </Link>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newProductForm()}
        {redirectUser()}
      </div>
    </Layout>
  );
};
export default UpdateProduct;
