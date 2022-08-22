import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
  
  cart.shippingPrice = addDecimals(cart.itemsPrice > 10 ? 0 : 3);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) 
  ).toFixed(2);
  const navigate = useNavigate();

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order._id}`);  //id-ul user-ului
      dispatch({ type: ORDER_CREATE_RESET });
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

      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">
                    Your order, <span>{userInfo.name}</span>
                  </h5>
                </div>
                <div className="card-body p-4">
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
                        <div key={index}>
                          <div className="card shadow-0 border mb-4">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-2">
                                  <img
                                    className="img-fluid"
                                    alt={item.name}
                                    src={`${API_URL}${item.name}`}
                                  />
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0">
                                    Samsung Galaxy
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    Qty: {item.qty}
                                  </p>
                                </div>

                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    item price : {item.price} euro
                                  </p>
                                </div>
                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                  <p className="text-muted mb-0 small">
                                    {" "}
                                    total price item: {item.price * item.qty}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="d-flex justify-content-between pt-2">
                    <p className="fw-bold mb-0">Shipping Address</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4" style={{ float: "left" }}>
                        Payment method:{" "}
                      </span>{" "}
                      crypto
                    </p>
                  </div>

                  <div className="d-flex justify-content-between pt-2">
                    <p className="text-muted mb-0">
                      Name : {userInfo.name} {userInfo.lastName}
                    </p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4" style={{ float: "left" }}>
                        Delivery:{" "}
                      </span>{" "}
                      {cart.shippingPrice} euro
                    </p>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">email :{userInfo.email}</p>
                    <p className="text-muted mb-0">
                      <span className="fw-bold me-4" style={{ float: "left" }}>
                        Total price:{" "}
                      </span>
                      {cart.totalPrice}euro
                    </p>
                  </div>

                

                  <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">
                      Address: {cart.shippingAddress.adress}{" "}
                    </p>
                    <p className="text-muted mb-0"></p>
                  </div>
                  <div className="d-flex justify-content-between mb-5">
                    <p className="text-muted mb-0">
                      postal code: {cart.shippingAddress.postalCode}
                    </p>
                    <p className="text-muted mb-0"></p>
                  </div>
                </div>

                {cart.cartItems.length === 0 ? null : (
                  <div className="border border-light p-3 mb-4">
                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btnPlaceOrder"
                        style={{ color: "white" }}
                        onClick={placeOrderHandler}
                      >
                        {" "}
                        PLACE ORDER
                      </button>
                    </div>
                  </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}
