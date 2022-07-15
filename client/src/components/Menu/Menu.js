import React from "react";
import { Link } from "react-router-dom";
import food from "../../images/food.jpg";
import drinks from "../../images/drinks.jpg";
import "./menu.css";

function Menu() {
  return (
    <div className="containerChooseMenu">
      <div className="row">
        <div className="column">
          <Link to="/foodMenu">
            <img className="imageHome" src={food} alt="imageHome" />
            <div className="centered1">Food</div>
          </Link>
        </div>
        <div className="column">
          <Link to="/drinksMenu">
            <img className="imageHome" src={drinks} alt="imageHome" />
            <div className="centered1"> Drinks</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
