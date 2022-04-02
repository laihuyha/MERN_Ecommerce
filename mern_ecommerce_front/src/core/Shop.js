import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories } from "./apiCore";
import CategoryCheckbox from "./categoryCheckbox";
import RadioBox from "./pricesRadiobox";
import { prices } from "./fixedPrices";

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
  // filter is the id of the category
  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters; //filters is only the array of ids not include filterBy
    if (filterBy === "price") {
      const priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues; // newFilters now is an object including the array of id and the array of prices
    }
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key].id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
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
            <div>
              <h4 className="mb-4">Price</h4>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>
          <div className="col-md-8">{JSON.stringify(myFilters)}</div>
        </div>
      </div>
    </Layout>
  );
};
export default Shop;
