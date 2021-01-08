import { observable, action, runInAction } from "mobx";

const store = observable({
  menu: {
    nutrition: false,
    details: true,
    storage: false,
    info: true,
  },
  setMenu: action((selection) => {
    for (const key in store.menu) {
      if (key === selection) {
        store.menu[key] = true;
      } else {
        store.menu[key] = false;
      }
    }
  }),

  products: [],
  getProducts: async () => {
    const res = await fetch(
      "https://react-tutorial-demo.firebaseio.com/supermarket.json"
    );
    const data = await res.json();
    return runInAction(() => (store.products = data));
  },
  findProductById: (id) => {
    return store.products.find((product) => product.id === Number(id));
  },

  cart: [],
  getItems: () =>
    store.cart.map((product) => {
      return { price: product.price_id, quantity: product.quantity };
    }),
  cartToLS() {
    return localStorage.setItem("cart", JSON.stringify(store.cart));
  },
  findProductInCart: (id) => {
    return store.cart.find((product) => product.id === id);
  },
  totalPrice: () => {
    if (store.cart.length > 0) {
      return store.cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    }
    return 0;
  },
  initCart: action(() => {
    try {
      const getFromLS = JSON.parse(localStorage.getItem("cart"));
      store.cart = getFromLS || [];
    } catch (err) {
      store.cart = [];
    }
    return store.cart;
  }),
  cartCount: () => {
    if (store.cart?.length > 0) {
      return store.cart.reduce((total, product) => total + product.quantity, 0);
    } else {
      return 0;
    }
  },
  productDelete: action((id) => {
    return (store.cart = store.cart.filter((product) => product.id !== id));
  }),
  productAdd: action((newProduct) => {
    const existingProduct = store.cart.find(
      (product) => product.id === newProduct.id
    );
    if (!existingProduct) {
      return (store.cart = [
        ...store.cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
    return (store.cart = store.cart.map((product) => {
      if (product.id === newProduct.id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    }));
  }),
});

export default store;
