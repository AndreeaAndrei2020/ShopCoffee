import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavbarSecond from "../../../Navbar/NavbarSecond";
import Loading from "../../../LoadingError/Loading";
import Message from "../../../LoadingError/Error";
import { listFood } from "../../../../Redux/Actions/ProductActions";

const API_URL = process.env.REACT_APP_API_URL;

function FoodMenu() {
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.foodList);
  const { loading, error, food } = foodList;

  useEffect(() => {
    dispatch(listFood());
  }, [dispatch]);

  return (
    <div>
      <NavbarSecond />
      <h2 className="h2Menu">Food</h2>
      <div className="pro-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {food.map((food, index) => {
              return (
                <div className="pro" key={index}>
                  <Link to={`/food/${food._id}`}>
                    <div className="titleDrink">
                      <h3>{food.name}</h3>
                      <p>{food.price}.00  euro</p>
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
