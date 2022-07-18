import React, { useEffect, useState } from "react";
import axios from "axios";
import "./drinks.css";
const API_URL = process.env.REACT_APP_API_URL;

function Drinks() {
  const [drinksCoffee, setDrinksCoffee] = useState([]);
  const [drinksCocktails, setDrinksCocktails] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/drinks`);
      console.log(data)
      setDrinksCoffee(data['drinksCoffee']);
      // setDrinksCocktails(data["DrinksCocktails"]);
    };
    fetchproducts();
  }, []);

  return (
    <div>
      <h2 className="h2Menu">Coffee Menu : 07:00 - 20:00</h2>
      <div className="pro-container">
        {drinksCoffee.map((drink,index) => {
          return (
            <div className="pro" key={index}>
              <div className="titleDrink">
                <p>{drink.name}</p>
              </div>
              <div className="containerPhoto">
                <img src={`${API_URL}${drink.image}`} alt={drink.name} />
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="h2Menu">Alcoholic Drinks Menu : 20:00 - 24:00</h2>
      <div className="pro-container">
        {/* { drinksCocktails.map((drink) => {
          return (
            <div className="pro">
              <div className="titleDrink">
                <p>{drink.title}</p>
              </div>
              <img src={`${API_URL}${drink.src}`} alt={drink.title} />
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

export default Drinks;
