import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../../LoadingError/Error";
import NavbarSecond from "../../Navbar/NavbarSecond";
import CryptoPaymentsForm from "./CryptoPaymentsForm";

const API_URL = process.env.REACT_APP_API_URL;

export default function PlaceOrder() {
  window.scrollTo(0, 0);

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

  cart.shippingPrice = addDecimals(cart.itemsPrice > 10 ? 0 : 3);

  if (cart.weather === "Rain") {
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) +
      1
    ).toFixed(2);
  } else {
    cart.totalPrice = (
      Number(cart.itemsPrice) +
      Number(cart.shippingPrice) 
    ).toFixed(2);
  }


  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  return (
    <div>
      <NavbarSecond />
      {cart.cartItems.length > 0 && JSON.stringify(orderCreate) === "{}" ? (
        <section className="h-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-8">
                <div className="card">
                  <div className="card-header px-4 py-5">
                    <h5 className="text-muted mb-0">
                     Comanda ta, <span>{userInfo.name}</span>
                    </h5>
                  </div>
                  <div className="card-body p-4">
                    {cart.cartItems.length === 0 ? (
                      <Message variant="alert-info mt-5">
                        <p style={{ color: "white", textAlign: "center" }}>
                          {" "}
                         Coșul tău de cumpărături este gol.
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
                                      {item.title}
                                    </p>
                                  </div>
                                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      cantitatea: {item.qty}
                                    </p>
                                  </div>

                                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      prețul produsului: {item.price}.00 euro
                                    </p>
                                  </div>
                                  <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                    <p className="text-muted mb-0 small">
                                      {" "}
                                     subtotal: {item.price * item.qty}.00 euro
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
                      <p className="text-muted mb-0">
                        <span
                          className="fw-bold me-4"
                          style={{ float: "left" }}
                        >
                          Adresa de livrare
                        </span>{" "}
                      </p>

                      <p className="text-muted mb-0"></p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">
                        Nume: {userInfo.name} {userInfo.lastName}
                      </p>
                      <p className="text-muted mb-0"></p>
                    </div>

                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                        Adresa: {cart.shippingAddress.adress}{" "}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between mb-5">
                      <p className="text-muted mb-0">
                       cod poștal: {cart.shippingAddress.postalCode}
                      </p>
                      <p className="text-muted mb-0"></p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">
                        <span
                          className="fw-bold me-4"
                          style={{ float: "left" }}
                        >
                         Metoda de plată:
                        </span>crypto
                      </p>
                      <p className="text-muted mb-0"></p>
                    </div>

                    <div className="d-flex justify-content-between pt-2">
                      <p className="text-muted mb-0">
                        <span
                          className="fw-bold me-4"
                          style={{ float: "left" }}
                        >
                          Livrarea:
                        </span>
                        {cart.shippingPrice} euro
                      </p>
                      <p className="text-muted mb-0"></p>
                    </div>
                    {cart.weather === "Rain" ? (
                      <div className="d-flex justify-content-between mb-5">
                        <p className="text-muted mb-0">
                          <span
                            className="fw-bold me-4"
                            style={{ float: "left" }}
                          >
                            extra taxă pentru vreme ploioasă:
                          </span>{" "}
                          1.00 euro
                        </p>

                        <p className="text-muted mb-0"></p>
                      </div>
                    ) : null}
                    <div className="d-flex justify-content-between">
                      <p className="text-muted mb-0">
                        {" "}
                        <span
                          className="fw-bold me-4"
                          style={{ float: "left" }}
                        >
                          Prețul total al comenzii:{" "}
                        </span>
                        {cart.totalPrice} euro{" "}
                      </p>
                      <p className="text-muted mb-0"></p>
                    </div>
                  </div>

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
      ) : null}
      
      {JSON.stringify(orderCreate) === "{}" && cart.cartItems.length === 0 ? (
        <>
          {" "}
          <h3 style={{ color: "white", textAlign: "center", height: "100vh" }}>
            {" "}
         Coșul tău de cumpărături este gol acum.{" "}
            <h5 className="fw-bold mb-5" style={{ marginTop: "7px" }}>
              <Link
                to="/menu"
                className="backToShipping"
                style={{ color: "white", padding: "10x" }}
              >
                <i className="fas fa-angle-left me-2 "></i> Înapoi la cumpărături
              </Link>
            </h5>
          </h3>
        </>
      ) : null}

      <CryptoPaymentsForm totalPrice={cart.totalPrice} />
    </div>
  );
}
