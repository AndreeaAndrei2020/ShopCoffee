import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addWeather,
  savePaymentMethod,
} from "../../../Redux/Actions/cartActions";
import NavbarSecond from "../../Navbar/NavbarSecond";
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
  const paymentMethod = "crypto";

  const submitHandler = (e) => {
    e.preventDefault();
    if (checkedInput === true) {
      dispatch(savePaymentMethod(paymentMethod));
      dispatch(addWeather());
      navigate("/placeorder");
    } else {
      setAlert({ display: "block" }); //daca nu confirma clientul ca accepta plata in crypto
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
                  Ne pare rău, dacă nu acceptați metoda de plată, nu vă putem
                  lăsa să continuați plasarea comenzii.
                </div>

                <div className="smallerLeft">
                  <h2>
                    <img src={metamask}></img>
                  </h2>
                  <p style={{ color: "white" }}>
                    SITE-UL NOSTRU ACCEPTĂ NUMAI PLATĂ ÎN ETHEREUM, PRIN
                    PLAFORMA METAMASK. DACĂ SUNTEȚI DE ACORD, VA RUGĂM SA BIFAȚI
                    CĂSUȚA.
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
                      DA, accept plata în Ethereum
                    </label>

                    <button className="btnContinue">Continuă</button>
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
