import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { navbarItems } from "./NavbarItems";
import { Button } from "../Button";
import restart from "./restart.png";
import "./Navbar.css";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  return (
    <div>
      <div className="line">
        <nav className="NavBarItems">
          <h1 className="navbar-logo">
            <img className="imgLogo" src={restart} alt="imgLogo" />
          </h1>

          <div className="menu-icon" onClick={handleClick}>
            <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>

          <ul className={clicked ? "nav-menu active" : "nav-menu"}>
            {navbarItems.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.url} className="linkNavbar">
                    <a className={item.cName} href={item.url}>
                      {item.title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button id="SingupBtn"> Sign up </Button>
        </nav>
        <div className="centered">
          It's not just coffee, it's an experience!
        </div>
      </div>
    </div>
  );
}

export default Navbar;
