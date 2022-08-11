import React from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Navbar/Header";

function Home() {
  return (
    <div>
      <Navbar />
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
                <div className="centeredTitle">{item.title}</div>
              </Link>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}

export default Home;
