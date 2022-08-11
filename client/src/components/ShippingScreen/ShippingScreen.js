import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NavbarSecond from "../Navbar/NavbarSecond";
import { useDispatch, useSelector } from "react-redux";
import "./shippingAdress.css";
import { saveShippingAddress } from "../../Redux/Actions/cartActions";

function ShippingScreen() {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [adress, setAddress] = useState(shippingAddress.adress);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameUser = useSelector((state) => state.userLogin);

  console.log(nameUser);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ adress, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div>
      {" "}
      <div>
        <NavbarSecond />

        <div className="row mt-3 mx-3 containerShipping">
          <div className="col-md-3">
            <div
              style={{ marginTop: "50px", marginLeft: "10px" }}
              className="text-center"
            >
              <i
                id="animationDemo"
                data-mdb-animation="slide-right"
                data-mdb-toggle="animation"
                data-mdb-animation-reset="true"
                data-mdb-animation-start="onScroll"
                data-mdb-animation-on-scroll="repeat"
                className="fas fa-3x fa-shipping-fast text-white"
              ></i>
              <h3 className="mt-3 text-white">
                {" "}
                {nameUser ? <>Welcome, {nameUser.userInfo.name}</> : ""}
              </h3>
              <p className="white-text">Complete your order!</p>
            </div>
          </div>
          <div className="col-md-9 justify-content-center ">
            <div className="card card-custom pb-4">
              <div className="card-body mt-0 mx-5">
                <div className="text-center mb-3 pb-2 mt-3">
                  <h4>Delivery Details</h4>
                </div>

                <form className="mb-0" onSubmit={submitHandler}>
                  <div className="row mb-4"></div>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        {" "}
                        <label className="" htmlFor="form9Example3">
                          Country
                        </label>
                        <input
                          type="text"
                          id="form9Example3"
                          className="form-control input-custom"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        {" "}
                        <label className="" htmlFor="form9Example4">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="form9Example4"
                          className="form-control input-custom"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <label className="" htmlFor="form9Example6">
                          Address
                        </label>
                        <input
                          type="text"
                          id="form9Example6"
                          className="form-control input-custom"
                          value={adress}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <label className="" htmlFor="typeEmail">
                          City
                        </label>
                        <input
                          type="text"
                          id="typeEmail"
                          className="form-control input-custom"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="float-end ">
                    <button
                      type="submit"
                      className="btn btn-primary btn-rounded btnPlaceOrder"
                    >
                      Place order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingScreen;
