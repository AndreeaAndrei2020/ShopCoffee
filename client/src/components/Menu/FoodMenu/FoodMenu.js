import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import NavbarSecond from "../../Navbar/NavbarSecond";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { listFood } from "../../../Redux/Actions/ProductActions";
const API_URL = process.env.REACT_APP_API_URL;

function FoodMenu() {
  const [foods, setFoods] = useState([]);

  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.foodList);
  const { loading, error, food } = foodList;

  console.log(111,food)
  // useEffect(() => {
  //   const fetchproducts = async () => {
  //     const { data } = await axios.get(`${API_URL}/api/food`);
  //     console.log("data client", data);
  //     setFoods(data);
  //   };
  //   fetchproducts();
  // }, []);


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
                      <p>{food.price} ron</p>
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
