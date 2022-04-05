import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./categoryCheckbox";
import RadioBox from "./pricesRadiobox";
import { prices } from "./fixedPrices";

const Shop = () => {
  //#region States
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  //#endregion

  //#region Handlers and Functions
  const loadCategory = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = (newFilters) => {
    // console.log(newFilters);
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <div className="mr-5 ml-5">
          <div onClick={loadMore} className="btn btn-outline-primary col-lg-12">
            Load More
          </div>
        </div>
      )
    );
  };

  useEffect(() => {
    loadCategory();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
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
  //#endregion
  return (
    <Layout title="Shop Page" description=" ">
      <div className="container mb-2">
        <div className="row mb-3">
          <div className="col-md-4">
            <h4 className="mb-4">Categories</h4>
            <ul>
              <Checkbox
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
          <div className="col-md-8">
            <h2 className="mb-4">Products</h2>
            <div className="row">
              {filteredResults.map((product, i) => (
                // <Fragment key={i} className="col-4 mb-3">
                //   <Card key={i} product={product} />
                // </Fragment>
                <Card key={i} product={product} />
              ))}
            </div>
            {loadMoreButton()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
