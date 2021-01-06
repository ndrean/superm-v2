# Transcript of Final Project of React tutorial with Mobx, Universal Router, Stripe payment

Project in tuto:

<https://react-tutorial.app/app.html?id=1390>

## PWA

<https://create-react-app.dev/docs/making-a-progressive-web-app/>

- Use template provided by CRA

`npx create-react-app superm-v2 --template cra-template-pwa`

- Add to **index.js**

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
  // the "active-tab", cf Navlink with React Router
  menu: { nutrition: false, details: true,...},
  setMenu: action( // using "action" from Mobx
     (selection=> {for (const key in store.menu) {
      if (key === selection) {....}),)

  // fetching the products
  products: [],
  getProducts: async (fetch...),
  findProductById: store.products.find(...),

  // the cart
  cart: [],
  // initialize the cart from localStorage in index.js
  initCart: action( // "action" from Mobx
     () => {
      const getFromLS = JSON.parse(localStorage.getItem("cart"));
      ///}),
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
  getDetail: fetch(...),
  Storage,
  Info,
  Nutrition,
  Details,
};
```

- "Active link"

With `store.setMenu(selection)` where I read "selection" from the pathname with a regex to set the class with `clsx`.
