import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";

const Home = () => {
  //#region State
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);
  //#endregion

  //#region Functions
  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  //#endregion
  return (
    <Layout title="Home Page" description="Node React">
      <div class="container bg-secondary">
        <hr />
        <br />
        <p class="text-center display-3">Best Seller</p>
        <div class="row">
          {productsBySell.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
        <hr />
        <br />
        <p class="text-center display-3">New</p>
        <div class="row">
          {productsByArrival.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Home;
