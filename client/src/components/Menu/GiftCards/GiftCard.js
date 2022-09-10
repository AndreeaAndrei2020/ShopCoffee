import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/Actions/cartActions";
import { listGiftDetails } from "../../../Redux/Actions/ProductActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import NavbarSecond from "../../Navbar/NavbarSecond";

const API_URL = process.env.REACT_APP_API_URL;

function GiftCard() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [qty1, setQty1] = useState();
  const dispatch = useDispatch();
  const giftDetails = useSelector((state) => state.giftDetails);
  const { loading, error, gift } = giftDetails;
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    dispatch(listGiftDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    dispatch(addToCart(id, qty, "giftCards"));
    setBanner(true);
    setQty1(qty)
  };
  return (
    <div>
      <NavbarSecond />
      {banner ? (
        <div
          className="alert alert-dark banner"
          role="alert"
          style={{ color: "white" }}
        >
          <h5>
            {qty1}x {gift.name} was added to cart{" "}
          </h5>
        </div>
      ) : (
        ""
      )}
      <div className="singleDrinkComponent">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="small-container single-product">
              <div className="row">
                <div className="col2">
                  <img src={`${API_URL}${gift.image}`} alt={gift.name}></img>
                </div>

                <div className="col2">
                  <h3>{gift.name}</h3>
                  <h4>- {gift.price}.00  euro -</h4>
                  {gift.countInStock > 0 ? (
                    <p className="description">Status : Available</p>
                  ) : (
                    <p className="description"> Status: UNAVAILABLE </p>
                  )}
                  <p className="lh-1"> {gift.description}
                </p>

                  {gift.countInStock > 0 ? (
                    <>
                      <div className="divDetails">
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="selectSingleDrink"
                        >
                          {[...Array(gift.countInStock).keys()].map((x) => (
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
}

export default GiftCard;
