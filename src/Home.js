import React from "react";
import history from "./history";

export default function Home() {
  function handleClick(e) {
    e.preventDefault();
    history.push({ pathname: e.target.pathname });
  }

  return (
    <div className="home-layout">
      <div>
        <h1>Online shopping simplified</h1>
        <p>
          Order your groceries from <em>SuperM</em> with our easy to use app,
          and get your products delivered straight to your doorstep.
        </p>
        <a href="/products" className="btn btn-default" onClick={handleClick}>
          Start shopping
        </a>
      </div>
      <img
        src="https://res.cloudinary.com/dbfn5lnvx/image/upload/q_auto,w_700/v1607770215/react-tutorial/supermarket/home.jpg"
        width="350"
        height="240"
        className="rounded home-image"
        alt=""
      />
    </div>
  );
}
