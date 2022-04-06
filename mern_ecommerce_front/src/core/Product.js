import React, { useState, useEffect, Fragment } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import CardRelate from "./CardRelate";
import CardDetails from "./detailsProductCard";

const Product = (props) => {
  const [product, setProduct] = useState({});

  const [error, setError] = useState(false);

  const [reatedProduct, setRelatedProduct] = useState([]);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fecth related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-xl-9 mt-8">
          {product && product.description && (
            <CardDetails product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-sm-3">
          <div className="container bg-secondary">
            <h4>Related products</h4>
            <div className="row">
              {reatedProduct.map((p, i) => (
                <CardRelate key={i} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Product;
