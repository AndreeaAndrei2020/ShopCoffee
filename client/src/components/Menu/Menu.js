import React from "react";
import { Link } from "react-router-dom";
import food from "../../images/food.jpg";
import drinks from "../../images/drinks.jpg";
import "./menu.css";

function Menu() {
  return (
    <div className="containerChooseMenu">
      <div className="divHomeMenuitems">
        <div className="columnHomeMenuItems divMenu" >
          <Link to="/food">
            <img className="imageHome" src={food} alt="imageHome" />
            <div className="centeredTitle">Food</div>
          </Link>
        </div>
        <div className="columnHomeMenuItems divMenu">
          <Link to="/drinks">
            <img className="imageHome" src={drinks} alt="imageHome" />
            <div className="centeredTitle"> Drinks</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
