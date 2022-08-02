import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removefromcart } from "../../Redux/Actions/cartActions";
import NavbarSecond from "../Navbar/NavbarSecond";
import Header from "./Header";

const API_URL = process.env.REACT_APP_API_URL;

function CartScreen() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty"); /// 4
  const { search } = useLocation(); ///?qty=4

  const qty1 = search ? Number(search.split("=")[1]) : 1;
  console.log("qty1", qty);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <div style={{ color: "white" }}>
      <NavbarSecond />
      <Header/>
      <h1 style={{ textAlign: "center" }}>Cart Screen</h1>
      {cartItems.length === 0 ? (
        <div> YOUR CART IS EMPTY</div>
      ) : (
        <>
          <div className="small-container single-product">
            <div className="row">
              <div className="col2">
                {cartItems.map((item) => {
                  return (
                    <>
                      <div className="singleDrinkComponent">
                        <div className="small-container single-product">
                          <div className="row">
                            <div className="col2">
                              <img
                                src={`${API_URL}${item.name}`}
                                alt={item.name}
                              ></img>
                            </div>
                            <div className="col2">
                              {/* <h1>{item.name}</h1> */}
                              {/* <p className="description">{item.description}</p> */}
                              <h4>- {item.price} ron -</h4>
                              <h5>QUANTITY</h5>

                              <div className="buttonContainer">
                                {/* <p className="inputValueAmount">
                                  {item.countInStock}{" "}
                                </p> */}
                                <select
                                  value={item.qty}
                                  onChange={(e) => {
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
                                </select>{" "}
                              </div>

                              <div
                                className="buttonContainer"
                                onClick={() =>
                                  removeFromCartHandle(item.product)
                                }
                              >
                                REMOVE FROM CARD
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>{" "}
                    </>
                  );
                })}
              </div>

              <div className="col2">{/* <h1>{product.name}</h1> */}</div>
              <p> Total : {total}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;
