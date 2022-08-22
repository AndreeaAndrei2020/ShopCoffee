import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import restart from "./restartPng.png";
import { logout } from "../../Redux/Actions/userActions";
import "./Navbar.css";

function Navbar() {
  const [clickedHambuerger, setClickedHambuerger] = useState(false);

  const [styleDropdown, setStyleDropdown] = useState("dropdownHidden");
  const [clickedDropdown, setClickedDropdown] = useState(false);

  const [styleDropdownUser, setStyleDropdownUser] = useState("dropdownHidden");
  const [clickedDropdownUser, setClickedDropdownUser] = useState(false);

  ///PT USER
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  /////DROPDOWM
  const functionClickedDropdown = (event) => {
    // const mouse = event.target.id;
    if (!clickedDropdown) {
      ///daca nu e inchis
      setClickedDropdown(!clickedDropdown);
      setStyleDropdown("dropdownContent");
      // setClickedDropdownUser(!clickedDropdown);
      // setStyleDropdownUser("dropdownContent");
    } else if (clickedDropdown) {
      //daca e deschis
      setClickedDropdown(!clickedDropdown);
      setStyleDropdown("dropdownHidden");
      // setClickedDropdownUser(!clickedDropdownUser);
      // setStyleDropdownUser("dropdownHidden");
    }
  };

  ///USEEEEEEEER
  const functionClickedDropdownUser = (event) => {
    // const mouse = event.target.id;
    if (!clickedDropdownUser) {
      ///daca nu e inchis
      setClickedDropdownUser(!clickedDropdown);
      setStyleDropdownUser("dropdownContentUser");
    } else if (clickedDropdown) {
      //daca e deschis
      setClickedDropdownUser(!clickedDropdownUser);
      setStyleDropdownUser("dropdownHidden");
    }
  };

  document.addEventListener("click", function (event) {
    // console.log(event.target.className.split(" "));
    if (event.target.id !== "dropdownForOutside") {
      setClickedDropdown(false);
      setStyleDropdown("dropdownHidden");
    }
    if (event.target.id !== "dropdownForOutsideUser") {
      setClickedDropdownUser(false);
      setStyleDropdownUser("dropdownHidden");
    }
  });

  ///HAMBUERGEEER
  function handleClickHamburger() {
    setClickedHambuerger(!clickedHambuerger);
  }
  const productsLengths = useSelector((state) => state.cart).cartItems.length;
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

            {/* START SHOP */}
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
                  <Link to="/giftCards" className="linkDropdown">
                    Gift Cards
                  </Link>
                </div>
              </div>
            </li>
            {/* STOP SHOP */}

            <li className="user">
              <div className="dropdown" onClick={functionClickedDropdownUser}>
                <p className="nav-links" id="dropdownForOutsideUser">
                  <i className="fas fa-user-alt"></i>
                  {userInfo ? <> Hi, {userInfo.name}</> : ""}
                  <i className="bx bxs-chevron-down "></i>
                </p>

                {userInfo ? (
                  <>
                    {" "}
                    <div className={styleDropdownUser}>
                      
                    <Link to="/profile" className="linkDropdown">
                     Reset your password
                      </Link>
                      <Link
                        to="/ordersUser"
                        className="linkDropdown"
                      >
                     See your orders
                      </Link>
                      <Link
                        to="/"
                        className="linkDropdown"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styleDropdownUser}>
                      <Link to="/login" className="linkDropdown">
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="linkDropdown"
                        onClick={logoutHandler}
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </li>

            <li
              className="linkNavbar"
              style={{
                color: "white",
                paddingTop: "7px",
                paddingBottom: "10px",
              }}
            >
              <Link to="/cart">
                <span>
                  <i
                    className="fas fa-shopping-bag fa-lg"
                    style={{
                      color: "white",
                      textAling: "center",
                      marginTop: "5px",
                    }}
                  ></i>
                </span>
                <span className="badge rounded-pill badge-notification bg-danger">
                  {productsLengths}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="centered">
          It's not just coffee, it's an experience!
        </div>
      </div>
    </div>
  );
}

export default Navbar;
