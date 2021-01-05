import React from "react";
import history from "./history";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import clsx from "clsx";
import "./index.css";

const Navbar = (props) => {
  const [isActive, setIsActive] = React.useState(true);
  const { store } = props;

  React.useEffect(() => runInAction(() => store.cartToLS), [store.cart]);

  const handleNav = (e) => {
    e.preventDefault();
    history.push({ pathname: e.target.pathname });
    setIsActive(true);
  };

  const classes = clsx({ "tab-active": isActive, "nav-brand": true });

  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-brand" onClick={handleNav}>
          Mobx/UniversalRouter
        </a>
        <ul>
          <li className="nav-item">
            <a href="/" className={classes} onClick={handleNav}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" onClick={handleNav} className={classes}>
              About us
            </a>
          </li>
          <li className="nav-item">
            <a href="/products" onClick={handleNav}>
              Products
            </a>
          </li>
          <li>
            <a
              href="/cart"
              className="nav-item nav-cart btn btn-accent"
              onClick={handleNav}
            >
              Cart ({store.cartCount()})
            </a>
          </li>
        </ul>
      </nav>
      <div className="container">{props.children}</div>
    </>
  );
};

export default observer(Navbar);
