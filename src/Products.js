import React from "react";
import { observer } from "mobx-react-lite";

import Product from "./Product.js";
// import Loader from "./Loader.js";

const Products = observer((props) => {
  const {
    store: { products, cart },
  } = props;

  return (
    <div className="products-layout">
      <h1>Products</h1>
      <p>Take a look at our products</p>
      <div className="products-grid">
        {products.map((product) => {
          return (
            <Product
              store={props.store}
              key={product.id}
              details={product}
              cart={cart}
            />
          );
        })}
      </div>
    </div>
  );
});

export default Products;
