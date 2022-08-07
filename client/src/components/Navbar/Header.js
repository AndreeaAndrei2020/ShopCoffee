import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Actions/userActions";
function Header() {

const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () =>{
    dispatch(logout());
  }
  return (
    <div>
      <h1 style={{ color: "white" }}>HEADER</h1>
      {userInfo ? (
        <>
          <p>
            <Link style={{ color: "white" }} to="/profile">
              Profile
            </Link>
          </p>
          <Link style={{ color: "white" }} to="/" onClick={logoutHandler}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <p>
            <Link style={{ color: "white" }} to="/login">
              Login
            </Link>
          </p>
          <Link style={{ color: "white" }} to="/register">
            Register
          </Link>
        </>
      )}
      <div>
        {userInfo ? (
          <div style={{ color: "white" }}>HI, {userInfo.name} </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
