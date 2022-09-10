import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../../../Redux/Actions/cartActions";
import { listDrinkDetails } from "../../../../Redux/Actions/ProductActions";
import NavbarSecond from "../../../Navbar/NavbarSecond";
import Loading from "../../../LoadingError/Loading";
import Message from "../../../LoadingError/Error";
import "./singleDrinks.css";

const API_URL = process.env.REACT_APP_API_URL;

const SingleDrink = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [qty1, setQty1] = useState();
  const dispatch = useDispatch();
  const drinkDetails = useSelector((state) => state.drinkDetails);

  const { loading, error, drink } = drinkDetails;
  const typeOfProduct = drink.typeOfProduct;
  const [bannerAddedToCart, setBannerAddedToCart] = useState(false);

  useEffect(() => {
    dispatch(listDrinkDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    dispatch(addToCart(id, qty, typeOfProduct));
    setBannerAddedToCart(true);
    setQty1(qty);
  };

  return (
    <div>
      <NavbarSecond />
      {bannerAddedToCart ? (
        <div
          className="alert alert-dark banner"
          role="alert"
          style={{ color: "white" }}
        >
          <h5>
            {qty1}x {drink.name} a fost adăugat în coș{" "}
          </h5>
        </div>
      ) : (
        ""
      )}
      <div className="singleDrinkComponent" style={{ height: "100vh" }}>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="small-container single-product">
              <div className="row">
                <div className="col2">
                  <img src={`${API_URL}${drink.image}`} alt={drink.name}></img>
                </div>

                <div className="col2">
                  <h1>{drink.name}</h1>
                  <h4>- {drink.price}.00 euro -</h4>
                  {drink.countInStock > 0 ? (
                    <p className="description">Status : DISPONIBIL</p>
                  ) : (
                    <p className="description"> Status: INDISPONIBIL </p>
                  )}

                  {drink.countInStock > 0 ? (
                    <>
                      <div className="divDetails">
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="selectSingleDrink"
                        >
                          {[...Array(drink.countInStock).keys()].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                              style={{ color: "black" }}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </select>{" "}
                      </div>
                      <div className="divDetails">
                        <button
                          onClick={AddToCartHAndle}
                          className="btnAddCard"
                        >
                          Add to Card
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>{" "}
    </div>
  );
};

export default SingleDrink;
