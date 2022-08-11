import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createOrder } from "../../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../../Redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import NavbarSecond from "../Navbar/NavbarSecond";
const API_URL = process.env.REACT_APP_API_URL;

export default function PlaceOrder() {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  ///Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);

      // dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, dispatch, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <NavbarSecond />
      <section className="container forms">
        <div className="form login">
          <div className="headerProfile">
            <h2>SELECT PAYMENT METHOD</h2>
          </div>
          <p style={{ color: "white" }}>{userInfo.name} </p>
          <p style={{ color: "white" }}>{userInfo.email} </p>
          <p style={{ color: "white" }}>{cart.shippingAddress.country} </p>
          <p style={{ color: "white" }}>{cart.shippingAddress.city} </p>
          <p style={{ color: "white" }}>{cart.paymentMethod} </p>
          <p style={{ color: "white" }}>{cart.shippingAddress.adress} </p>
          <p style={{ color: "white" }}>{cart.shippingAddress.postalCode} </p>
        </div>
      </section>
      <div className="field input-field">
        {cart.cartItems.length === 0 ? (
          <Message variant="alert-info mt-5">
            <p style={{ color: "white", textAlign: "center" }}>
              {" "}
              Your cart is empty
            </p>
          </Message>
        ) : (
          <>
            {cart.cartItems.map((item, index) => (
              <div>
                <Link to={`/drinks/${item.product}`}>
                  {" "}
                  <img
                    style={{ width: "50px" }}
                    alt={item.name}
                    src={`${API_URL}${item.name}`}
                  ></img>
                </Link>

                <p>
                  <p style={{ color: "white" }}>{item.qty} </p>
                  <p style={{ color: "white" }}>price: {item.price} </p>
                  <p style={{ color: "white" }}>
                    {" "}
                    total price item: {item.price * item.qty}{" "}
                  </p>
                </p>
              </div>
            ))}
          </>
        )}
        <br></br>
        <br></br>
        <div style={{ color: "white" }}>
          <p style={{ color: "white" }}> Products prices :{cart.itemsPrice}</p>
          <p>Shipping : {cart.shippingPrice}</p>
          <p style={{ color: "white" }}> taxe: {cart.taxPrice} </p>
          <p style={{ color: "white" }}> total : {cart.totalPrice} </p>
        </div>
        {cart.cartItems.length === 0 ? null : (
          <button type="submit" onClick={placeOrderHandler}>
            PLACE ORDER
          </button>
        )}

        {error && (
          <div>
            <Message variant="alert-danger">
              <p style={{ color: "white" }}>{error}</p>
            </Message>
          </div>
        )}
      </div>
    </div>
  );
}
