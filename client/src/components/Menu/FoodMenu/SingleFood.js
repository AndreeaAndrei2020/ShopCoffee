import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarSecond from "../../Navbar/NavbarSecond";
import { useDispatch, useSelector } from "react-redux";
import { listFoodDetails, listProductDetails } from "../../../Redux/Actions/ProductActions";
import { addToCart } from "../../../Redux/Actions/cartActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";

const API_URL = process.env.REACT_APP_API_URL;

const SingleFood = () => {
  const { id } = useParams();
  // const [food, setFood] = useState({});

  // useEffect(() => {
  //   const fetchproduct = async () => {
  //     const { data } = await axios.get(`${API_URL}/api/food/${id}`);
  //     console.log(1111, data);
  //     setFood(data);
  //   };
  //   fetchproduct();
  // }, [id]);


  // const { id } = useParams();
  const navigate = useNavigate();
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
    dispatch(addToCart(id, qty,"food"));
    setBanner(true);
  };


  return (
    <div>
      <NavbarSecond />




      {banner ? (
        <div
          class="alert alert-dark banner"
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
                  <img
                    src={`${API_URL}${food.image}`}
                    alt={food.name}
                  ></img>
                </div>

                <div className="col2">
                  <h1>{food.name}</h1>
                  <p className="description">{food.description}</p>
                  <h4>- {food.price} ron -</h4>
                  {food.grams > 0 ? (
                    <p className="description">Status : Available</p>
                  ) : (
                    <p className="description"> Status: UNAVAILABLE </p>
                  )}

                  {food.grams > 0 ? (
                    <>
                      <div className="divDetails">
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="selectSingleDrink"
                        >
                          {[...Array(food.grams).keys()].map((x) => (
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



{/*  */}

{/* 



      <div className="singleDrinkComponent">
        <div className="small-container single-product">
          <div className="row">
            <div className="col2">
              <img src={`${API_URL}${food.image}`} alt={food.name}></img>
            </div>
            <div className="col2">
              <h1>{food.name}</h1>
              <p className="description">{food.description}</p>
              <h4>- {food.price} ron -</h4>
              <button className="btnAddCard">Add to Card</button>
              <div className="buttonContainer">
                <button id="decrement" onClick={decrementFunction}>
                  {" "}
                  -{" "}
                </button>
                <p className="inputValueAmount">{amount} </p>
                <button id="increment" onClick={incrementFunction}>
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "} */}


    </div>
  );
};


export default SingleFood;
