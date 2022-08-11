import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removefromcart } from "../../Redux/Actions/cartActions";
import NavbarSecond from "../Navbar/NavbarSecond";
import Header from "./Header";
import "./cartScreen.css";

const API_URL = process.env.REACT_APP_API_URL;

function CartScreen() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty"); /// 4
  const { search } = useLocation(); ///?qty=4

  const qty1 = search ? Number(search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems
    .reduce((a, i) => a + i.qty * i.price + 20, 0)
    .toFixed(2);

  const subTotal = cartItems
    .reduce((a, i) => a + i.qty * i.price, 0)
    .toFixed(2);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(addToCart(id, qty));
  //   }
  // }, [dispatch, id, qty]);

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <div style={{ color: "white" }}>
      <NavbarSecond />

      {/* <Header /> */}

      <h1 style={{ textAlign: "center" }}>Cart Screen</h1>
      {cartItems.length === 0 ? (
        <div> YOUR CART IS EMPTY</div>
      ) : (
        <>
          <section className="h-100">
            <div className="container h-100 py-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-10">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                  </div>

                  {cartItems.map((item) => {
                    return (
                      <div key={item.product}>
                        {/* cart items details */}

                        <div className="card rounded-3 mb-4">
                          <div className="card-body p-4">
                            <div className="row d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={`${API_URL}${item.name}`}
                                  className="img-fluid rounded-3"
                                  alt="Cotton T-shirt"
                                />
                                <div>
                                  <p
                                    className="lead fw-normal mb-2"
                                    style={{ color: "black" }}
                                  >
                                    {item.title}
                                  </p>
                                </div>
                              </div>

                              <div
                                className="col-md-3 col-lg-3 col-xl-2 d-flex"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <select
                                  className="selectQty"
                                  value={item.qty}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    );
                                  }}
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option
                                        key={x + 1}
                                        value={x + 1}
                                        style={{ color: "black" }}
                                      >
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0" style={{ color: "black" }}>
                                  Price: {item.price}.00 Ron
                                </h5>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0" style={{ color: "black" }}>
                                  Subtotal: {item.price * item.qty}.00 ron
                                </h5>
                              </div>
                              <div
                                className="col-md-1 col-lg-1 col-xl-1 text-end "
                                onClick={() =>
                                  removeFromCartHandle(item.product)
                                }
                              >
                                <a href="#!" className="text-danger">
                                  <i className="fas fa-trash fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>

            {/* CHECK OUT */}
            <div className="container h-100 py-5">
              <div class="col-md-4">
                <div class="card mb-4">
                  <div class="card-header py-3">
                    <h5
                      class="mb-0"
                      style={{ color: "black", textAlign: "center" }}
                    >
                      Summary
                    </h5>
                  </div>
                  <div class="card-body">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>{subTotal}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>20.00 ron</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                          <strong>
                            <p class="mb-0">(including VAT)</p>
                          </strong>
                        </div>
                        <span>
                          <strong>{total} ron</strong>
                        </span>
                      </li>
                    </ul>
                    <Link to="/shipping">
                      <button
                        type="button"
                        class="btn btn-primary btn-lg btn-block buttonCheckOutCartScreen"
                      >
                        Go to checkout
                      </button>
                    </Link>
                    <h5 class="fw-bold mb-5" style={{ marginTop: "7px" }}>
                      <Link to="/menu" className="backToShipping">
                        <i class="fas fa-angle-left me-2 " ></i>Back to shopping
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            {/* CHECK OUT  STOP*/}
          </section>

        </>
      )}
    </div>
  );
}

export default CartScreen;
