import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function FoodMenu() {

  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/food`);
      console.log("data client", data);
      setFood(data);
    };
    fetchproducts();
  }, []);
  return (
    <div>
    <h2 className="h2Menu">Food</h2>
    <div className="pro-container">
      {/* {drinksCoffee.map((drink, index) => {
        if (index !== 4)
          return (
            <div className="pro" key={index}>
              <Link to={`/drinks/${drink.id}`}>
                <div className="titleDrink">
                  <h3>{drink.name}</h3>
                  <p>{drink.price} ron</p>
                </div>
                <div className="containerPhoto">
                  <img src={`${API_URL}${drink.image}`} alt={drink.name} />
                </div>
              </Link>
            </div>
          );
        else
          return (
            <>
              <div className="divH2">
                <h2>Alcohol Drink Menu: 20:00 -24:00</h2>
              </div>

              <div className="pro" key={index}>
                <Link to={`/drinks/${drink.id}`}>
                  <div className="titleDrink">
                    <h3>{drink.name}</h3>
                    <p>{drink.price} ron</p>
                  </div>
                  <div className="containerPhoto">
                    <img src={`${API_URL}${drink.image}`} alt={drink.name} />
                  </div>
                </Link>
              </div>
            </>
          );
      })} */}
    </div>
  </div>
  )
}

export default FoodMenu