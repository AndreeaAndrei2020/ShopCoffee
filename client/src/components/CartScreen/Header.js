import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  console.log("cart", cartItems);
  return (
    <div>
      <Link to="/cart"><p style={{color:'white',margin:'100px'}}>{cartItems.length}
      CHECK OUT</p></Link>
    </div>
  );
}

export default Header;
