import React, { useState } from "react";
import NavbarSecond from "../Navbar/NavbarSecond";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../Redux/Actions/cartActions";
import Message from "../LoadingError/Error.js";
function Payment() {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      {" "}
      <div>
        <NavbarSecond />
        <section className="container forms">
          <div className="form login">
            <div className="headerProfile">
              <h2>SELECT PAYMENT METHOD</h2>
            </div>
            <div className="form-content">
              <form onSubmit={submitHandler}>
                <div className="field input-field">
                  <input
                    type="radio"
                    placeholder="Enter adress"
                    className="input"
                    // required
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label style={{ color: "white" }}>
                    Crypto Or Credit Card
                  </label>
                </div>

            

                <div className="field button-field">
                  <button className="btnLogin" type="submit" on>
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Payment;
