import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";

function Home() {
  return (
    <div className="row">
      {MenuItems.map((item,index) => {
        console.log(item.src);
        return (
          <div className="column" key={index}>
             <Link to={item.link}>
            <img
              className="imageHome"
              src={item.src}
              style={{ width: "100%" }}
              alt="imageHome"
            />
            <div className="centered">{item.title}</div>
           </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
