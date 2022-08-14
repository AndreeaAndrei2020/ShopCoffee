import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../../Redux/Actions/cartActions";
import NavbarSecond from "../Navbar/NavbarSecond";
import metamask from "./metamask.png";
import "./payment.css";

function Payment() {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [checkedInput, setCheckedInput] = useState(false);
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ display: "none" });
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkedInput === true) {
      dispatch(savePaymentMethod(paymentMethod));
      navigate("/placeorder");
    } else {
      setAlert({ display: "block" });
    }
  };
  return (
    <div>
      {" "}
      <div>
        <NavbarSecond />

        <div className="cryptoContainer">
          <div className=" cryptocontainer">
            <div className="contact-box">
              <div className="left">
                <div className="alert " role="alert" style={alert}>
                  Sorry, if you don't accept the method of payment, we can't let
                  you continue the order
                </div>

                <div className="smallerLeft">
                  <h2>
                    <img src={metamask}></img>
                  </h2>
                  <p style={{ color: "white" }}>
                    SO OUR SITE ONLY ACCEPTS PAYMENT IN ETHEREUM, THROUGH THE
                    METAMASK PLATFORM TO ENCOURAGE YOUNG PEOPLE TO INVEST IN THE
                    CRYPTO MARKET
                  </p>
                  <form onSubmit={submitHandler}>
                    <input
                      type="radio"
                      placeholder="Enter adress"
                      className="input"
                      onChange={() => {
                        setCheckedInput(true);
                      }}
                    />

                    <label
                      style={{
                        color: "white",
                        marginLeft: "7px",
                        marginBottom: "7px",
                      }}
                    >
                      YES, I accept the payment in Ethereum
                    </label>

                    <button className="btnContinue">Continue</button>
                  </form>
                </div>
              </div>{" "}
              <div className="right"> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

{
  /* <section className="container forms">
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
        </section> */
}
