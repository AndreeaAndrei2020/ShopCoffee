import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "./Button.js";
import restart from "./restart.png";
import "./Navbar.css";

function Navbar() {
  const [clickedHambuerger, setClickedHambuerger] = useState(false);
  const [styleDropdown, setStyleDropdown] = useState("dropdownHidden");
  const [clickedDropdown, setClickedDropdown] = useState(false);
  const functionClickedDropdown = (event) => {
    const mouse = event.target.id;
    if (!clickedDropdown) {
      ///daca nu e inchis
      setClickedDropdown(!clickedDropdown);
      setStyleDropdown("dropdown-content");
    } else if (clickedDropdown) {
      //daca e deschis
      setClickedDropdown(!clickedDropdown);
      setStyleDropdown("dropdownHidden");
    }
  };

  function handleClickHamburger() {
    setClickedHambuerger(!clickedHambuerger);
  }

  document.addEventListener("click", function (event) {
    console.log(event.target.className.split(" "));

    if (event.target.id !== "dropdownForOutside") {
      setClickedDropdown(false);
      setStyleDropdown("dropdownHidden");
    }
  });
  return (
    <div>
      <div className="line">
        <nav className="NavBarItems">
          <div className="navbar-logo">
            <Link to="/">
              {" "}
              <img className="imgLogo" src={restart} alt="imgLogo" />{" "}
            </Link>
          </div>

          <div className="menu-icon" onClick={handleClickHamburger}>
            <i
              className={clickedHambuerger ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>

          <ul className={clickedHambuerger ? "nav-menu active" : "nav-menu"}>
            <li className="linkNavbar">
              <Link to="/">
                <p className="nav-links">Home</p>
              </Link>
            </li>
            <li>
              <div className="dropdown" onClick={functionClickedDropdown}>
                {/* <Link to="/" className="linkNavbar "> */}
                  <p className="nav-links " id="dropdownForOutside">
                    Shop <i className="bx bxs-chevron-down "></i>{" "}
                  </p>
                {/* </Link> */}

                <div className={styleDropdown}>
                  <Link to="/drinks" className="linkDropdown">
                    Drinks
                  </Link>
                  <Link to="/food" className="linkDropdown">
                    Food
                  </Link>
                  <Link to="/baristaCourses" className="linkDropdown">
                    Barista Course
                  </Link>
                  <Link to="/equipment" className="linkDropdown">
                    Home Equipments
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="Contact us" className="linkNavbar">
                <p className="nav-links">Contact us</p>
              </Link>
            </li>
            <li>
              <Link to="Sing up" className="linkNavbar">
                <p className="nav-links-mobile">Sing up</p>
              </Link>
            </li>
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
