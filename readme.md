# Transcript of Final Project of React tutorial with Mobx, Universal Router, Stripe payment

## PWA

<https://create-react-app.dev/docs/making-a-progressive-web-app/>

> Use template provided by CRA

`npx create-react-app superm-v2 --template cra-template-pwa`

> Add to **index.js**

```js
#index.js;
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
serviceWorkerRegistration.register();
```

## Mobx

<https://mobx.js.org/react-integration.html>

`yarn add mobx mobx-react-lite`

- configuration for debugging

```js
// #index.js
import { configure } from "mobx";
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});
```

- store:

```js
const store = {
  // object for the "active-tab", cf Navlink with React Router
  menu,
  setMenu,

  // fetching the products
  products,
  getProducts,
  findProductById,

  // the cart
  cart,
  initCart, // initialize the cart from localStorage in index.js
  getItems, // for Stripe
  cartToLS, // save to localStorage
  findProductInCart,
  totalPrice,
  cartCount,
  productDelete,
  productAdd,
};
```

## Universal Router

<https://github.com/kriasoft/universal-router/blob/master/docs/api.md>

Using the middleware `next` to pass `{children}` into a menu layout. This is done twice, for general menu, and for the general submenu (nested routes).

## Component **ProductDetails** with ".dot" notation

<https://react-tutorial.app/app.html?id=1185>

To be able to `import` two components, I made object with several components:

```js
const ProductDetails = {
  getDetail,
  Storage,
  Info,
  Nutrition,
  Details,
};
```

- "Active link"

With `store.setMenu(selection)` where I read "selection" from the pathname with a regex to set the class with `clsx`.
