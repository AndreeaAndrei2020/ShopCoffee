import React from "react";

import menu from "../../images/espressor.jpg";
import course from "../../images/course.jpg";
import espressor from '../../images/espressor.jpg';
import "./shop.css";

function Shop() {
  const MenuItems = [
    {
      title: "Home equipment",
      src: espressor,
    },
    {
      title: "Barista Course",
      src: course,
    },
    {
      title: "Menu",
      src: menu,
    },
    {
      title: " Recipes for Home",
      src: menu,
    },
  ];

  return (
    <div>
      <div className="row">
        {MenuItems.map((item, index) => {
          return (
            <div className="column" key={index}>
              <img
                className="imageHome"
                style={{ width: "100%" }}
                alt="imageHome"
                src={item.src}
              />
              <div className="centered">{}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;
