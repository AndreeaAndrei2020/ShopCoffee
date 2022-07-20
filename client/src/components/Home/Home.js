import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./Home.css";

function Home() {
  return (
    <div className="divHomeMenuitems">
      {MenuItems.map((item, index) => {
        console.log(item.src);
        return (
          <div className="columnHomeMenuItems" key={index}>
            <Link to={item.link}>
              <img
                className="imageHome"
                src={item.src}
                style={{ width: "100%" }}
                alt="imageHome"
              />
              <div className="centeredTitle">{item.title}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
