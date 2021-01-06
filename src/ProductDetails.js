import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import Button from "./Button";
import history from "./history";
import clsx from "clsx";

const ProductDetails = {
  getDetail: async (id) => {
    return fetch(
      `https://react-tutorial-demo.firebaseio.com/productinfo/id${id}.json`
    ).then((res) => res.json());
  },
  Storage: function ({ storage }) {
    return (
      <p>
        <strong>Storage instructions:</strong> {storage}
      </p>
    );
  },
  Info: observer(function ({ id, store }) {
    const product = store.findProductById(id);
    return (
      <>
        <p>
          {product?.description} sold at <strong>${product?.price}</strong> per
          piece.
        </p>
        <Button onClick={action(() => store.productAdd(product))}>
          ${product?.price}
        </Button>
      </>
    );
  }),
  Nutrition: function ({ nutrition }) {
    return (
      <table className="table table-nutrition">
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Protein</td>
            <td>{nutrition?.protein}g</td>
          </tr>
          <tr>
            <td>Carbohydrates</td>
            <td>{nutrition?.carbs}g</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{nutrition?.fat}g</td>
          </tr>
          <tr>
            <td>Salt</td>
            <td>{nutrition?.salt}g</td>
          </tr>
        </tbody>
      </table>
    );
  },
  Details: observer(function ({ id, store, children }) {
    // let newMenu;

    const product = store.findProductById(id);
    const handleNav = action((e) => {
      e.preventDefault();
      history.push({ pathname: e.target.pathname });

      const selection = e.target.pathname.match(/(\w+)$/)[0];
      console.log(selection);
      store.setMenu(selection);
    });

    const classDetail = clsx({
      "tab-active": store.menu.info || store.menu.details,
    });
    const classNutrition = clsx({ "tab-active": store.menu.nutrition });
    const classStorage = clsx({ "tab-active": store.menu.storage });

    return (
      <div className="product-details-layout">
        <div>
          <h2>{product?.name}</h2>
          <img
            src={product?.image}
            width="125"
            height="125"
            className="product-details-image"
            alt={product?.name}
          />
        </div>
        <div>
          <div className="tabs">
            <ul>
              <li>
                <a
                  href={`/products/${id}/details`}
                  onClick={handleNav}
                  className={classDetail}
                >
                  Details
                </a>
              </li>
              <li>
                <a
                  href={`/products/${id}/nutrition`}
                  onClick={handleNav}
                  className={classNutrition}
                >
                  Nutrition
                </a>
              </li>
              <li>
                <a
                  href={`/products/${id}/storage`}
                  onClick={handleNav}
                  className={classStorage}
                >
                  Storage
                </a>
              </li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    );
  }),
};

export default ProductDetails;
