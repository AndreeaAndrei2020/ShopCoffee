import React from "react";
import "./Home.css";
import { MenuItems } from "./MenuItems";

function Home() {
  return (
    <div className="row">
      {MenuItems.map((item,index) => {
        console.log(item.src);
        return (
          <div className="column" key={index}>
            <img
              className="imageHome"
              src={item.src}
              style={{ width: "100%" }}
              alt="imageHome"
            />
            <div className="centered">{item.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
