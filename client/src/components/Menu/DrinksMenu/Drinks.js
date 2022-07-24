import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./drinks.css";
import NavbarSecond from "../../Navbar/NavbarSecond";
const API_URL = process.env.REACT_APP_API_URL;

function Drinks({math}) {
  const [drinksCoffee, setDrinksCoffee] = useState([]);
  // const [drinksCocktails, setDrinksCocktails] = useState([]);
console.log("math",math)
  useEffect(() => {       //fetch data from server
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/drinks`);
      console.log("data client", data);
      setDrinksCoffee(data["drinksCoffee"]);
    };
    fetchproducts();
  }, []);

  return (
    <div>
      <NavbarSecond/>

      <h2 className="h2Menu">Coffee Menu : 07:00 - 20:00</h2>
      <div className="pro-container">
        {drinksCoffee.map((drink, index) => {
          if (index < 4)
            return (
              <div className="pro" key={drink._id}>
                <Link to={`/drinks/${drink._id}`}>
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
        })}

        <div className="divH2">
          <h2>Alcohol Drink Menu: 20:00 -24:00</h2>
        </div>

        {drinksCoffee.map((drink, index) => {
          if (index > 3)
            return (
              <div className="pro" key={drink._id}>
                <Link to={`/drinks/${drink._id}`}>
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
        })}
      </div>
    </div>
  );
}

export default Drinks;
