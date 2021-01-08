import React from "react";
import { observer } from "mobx-react-lite";
import { action, runInAction } from "mobx";
import history from "./history";
import Button from "./Button.js";

const Product = (props) => {
  const { details, store } = props;

  const productFromCart = store.findProductInCart(details.id);
  const quantity = productFromCart ? productFromCart.quantity : 0;

  React.useEffect(() => runInAction(() => store.cartToLS), [store, store.cart]);

  const handleNav = action((e) => {
    e.preventDefault();
    // e.target.pathname is UNDEFINED ?????
    history.push({ pathname: `/products/${details.id}` });
  });

  return (
    <div className="product">
      <div className="product-image-container">
        <a href={`/products/${details.id}`} onClick={handleNav}>
          <img
            src={details.image}
            width="100"
            height="100"
            className="product-image"
            alt={details.name}
          />
        </a>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              outline
              onClick={action(() => store.productDelete(details.id))}
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        <Button outline onClick={action(() => store.productAdd(details))}>
          ${details.price}
        </Button>
      </div>
    </div>
  );
};

export default observer(Product);
