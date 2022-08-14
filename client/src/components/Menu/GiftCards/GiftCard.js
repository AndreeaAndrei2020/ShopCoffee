import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/Actions/cartActions";
import { listGiftDetails } from "../../../Redux/Actions/ProductActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import NavbarSecond from "../../Navbar/NavbarSecond";

// import { listGiftDetails } from "../../Redux/Actions/ProductActions";
// import { addToCart } from "../../Redux/Actions/cartActions";
// import NavbarSecond from "../Navbar/NavbarSecond";
// import Message from "../LoadingError/Error";
// import Loading from "../LoadingError/Loading";

const API_URL = process.env.REACT_APP_API_URL;

function GiftCard() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const giftDetails = useSelector((state) => state.giftDetails);
  const { loading, error, gift } = giftDetails;
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    dispatch(listGiftDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    // navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty, "giftCards"));
    setBanner(true);
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
            {qty}x {gift.name} was added to cart{" "}
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
                  <h1>{gift.name}</h1>
                  <h4>- {gift.price} ron -</h4>
                  {gift.countInStock > 0 ? (
                    <p className="description">Status : Available</p>
                  ) : (
                    <p className="description"> Status: UNAVAILABLE </p>
                  )}

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
              <div className="row descriptionSingleItem">
                <p className="lh-1">
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit
                  amet fermentum. Praesent commodo cursus magna, vel scelerisque
                  nisl consectetur et. Nullam id dolor id nibh ultricies
                  vehicula ut id elit. Cras mattis consectetur purus sit amet
                  fermentum.
                </p>
                <p className="lh-sm">
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit
                  amet fermentum. Praesent commodo cursus magna, vel scelerisque
                  nisl consectetur et. Nullam id dolor id nibh ultricies
                  vehicula ut id elit. Cras mattis consectetur purus sit amet
                  fermentum.
                </p>
                <p className="lh-base">
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit
                  amet fermentum. Praesent commodo cursus magna, vel scelerisque
                  nisl consectetur et. Nullam id dolor id nibh ultricies
                  vehicula ut id elit. Cras mattis consectetur purus sit amet
                  fermentum.
                </p>
                <p className="lh-lg">
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Donec sed odio dui. Cras mattis pannenkoek purus sit
                  amet fermentum. Praesent commodo cursus magna, vel scelerisque
                  nisl consectetur et. Nullam id dolor id nibh ultricies
                  vehicula ut id elit. Cras mattis consectetur purus sit amet
                  fermentum.
                </p>
              </div>
            </div>
          </>
        )}
      </div>{" "}
    </div>
  );
}

export default GiftCard;
