import React from "react";
import { Link } from "react-router-dom";

import { MenuItems } from "./MenuItems";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="divHomeMenuitems">
        {MenuItems.map((item, index) => {
          return (
            <div className="columnHomeMenuItems" key={index}>
              <Link to={item.link}>
                <img
                  className="imageHome"
                  src={item.src}
                  style={{ width: "100%" }}
                  alt="imageHome"
                />
                <div className="centeredTitle" style={{top:'40%'}}>{item.title}</div>
              </Link>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}

export default Home;
