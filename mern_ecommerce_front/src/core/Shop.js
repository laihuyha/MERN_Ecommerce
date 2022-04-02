import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import CategoryCheckbox from "./categoryCheckbox";

const Shop = () => {
  //#region State
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  //#endregion

  //#region Handlers, useEffect and Functions
  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  //Send the categories to the CategoryCheckbox component
  //Data sent to the CategoryCheckbox component is the categories array
  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
  };

  useEffect(() => {
    loadCategories();
  }, []);
  //#endregion

  return (
    <Layout title="Shop Page" description=" ">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4 className="mb-4">Categories</h4>
            <ul>
              <CategoryCheckbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
                //mean the same as: handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
          </div>
          <div className="col-md-8">{JSON.stringify(myFilters)}</div>
        </div>
      </div>
    </Layout>
  );
};
export default Shop;
