import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listFoodDetails } from "../../../../Redux/Actions/ProductActions";
import { addToCart } from "../../../../Redux/Actions/cartActions";
import NavbarSecond from "../../../Navbar/NavbarSecond";
import Loading from "../../../LoadingError/Loading";
import Message from "../../../LoadingError/Error";

// import { listFoodDetails } from "../../../Redux/Actions/ProductActions";
// import { addToCart } from "../../../Redux/Actions/cartActions";
// import NavbarSecond from "../../Navbar/NavbarSecond";
// import Loading from "../../LoadingError/Loading";
// import Message from "../../LoadingError/Error";

const API_URL = process.env.REACT_APP_API_URL;

const SingleFood = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    dispatch(listFoodDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    // navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty, "food"));
    setBanner(true);
  };

  return (
    <div style={{height:'100vh'}}>
      <NavbarSecond />
      {banner ? (
        <div
          className="alert alert-dark banner"
          role="alert"
          style={{ color: "white" }}
        >
          <h5>
            {qty}x {food.name} was added to cart{" "}
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
                  <img src={`${API_URL}${food.image}`} alt={food.name}></img>
                </div>

                <div className="col2">
                  <h1>{food.name}</h1>
                  <p className="description">{food.description}</p>
                  <h4>- {food.price}.00  euro -</h4>
                  {food.countInStock > 0 ? (
                    <p className="description">Status : Available</p>
                  ) : (
                    <p className="description"> Status: UNAVAILABLE </p>
                  )}

                  {food.countInStock > 0 ? (
                    <>
                      <div className="divDetails">
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="selectSingleDrink"
                        >
                          {[...Array(food.countInStock).keys()].map((x) => (
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

export default SingleFood;
