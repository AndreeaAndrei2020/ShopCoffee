import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavbarSecond from "../../../Navbar/NavbarSecond";
import Loading from "../../../LoadingError/Loading";
import Message from "../../../LoadingError/Error";
import { listFood } from "../../../../Redux/Actions/ProductActions";

const API_URL = process.env.REACT_APP_API_URL;

function FoodMenu() {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState();
  const foodList = useSelector((state) => state.foodList);
  const { loading, error, food } = foodList;

  useEffect(() => {
    dispatch(listFood());
  }, [dispatch]);

  useEffect(() => {
    if (food.length > 0) setUpdate(food);
  }, [food]);

  useEffect(() => {
    console.log("UPDATEE", update);
  }, [update]);

  return (
    <div>
      <NavbarSecond />
      <div className="btn-group">
        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option1"
          autocomplete="off"
          onChange={() => {
            setUpdate([...update].sort((a, b) => a.price - b.price));
          }}
        />
        <label className="btn btnCrescDesc" for="option1">
          cresc
        </label>

        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option2"
          autocomplete="off"
          onChange={() => {
            setUpdate([...update].sort((a, b) => b.price - a.price));
          }}
        />
        <label className="btn btnCrescDesc" for="option2">
          desc
        </label>

        <input
          type="radio"
          className="btn-check"
          name="options"
          id="option3"
          autocomplete="off"
          onChange={() => {
            setUpdate(food);
          }}
        />
        <label className="btn btnCrescDesc" for="option3">
          Reset
        </label>
      </div>
      <h2 className="h2Menu">Food</h2>
      <div className="pro-container">
        {!update ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {update.map((food, index) => {
              return (
                <div className="pro" key={index}>
                  <Link to={`/food/${food._id}`}>
                    <div className="titleDrink">
                      <h3 style={{ padding: "20px" }}>{food.name}</h3>
                      <p>{food.price}.00 euro</p>
                    </div>
                    <div className="containerPhoto">
                      <img src={`${API_URL}${food.image}`} alt={food.name} />
                    </div>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default FoodMenu;
