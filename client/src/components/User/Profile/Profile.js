import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

import { updateUserProfile } from "../../../Redux/Actions/userActions";
import noprofile from "./noprofil.jpg";
import Toast from "../../LoadingError/Toast.js";
import Message from "../../LoadingError/Error";
import NavbarSecond from "../../Navbar/NavbarSecond";
import Loading from "../../LoadingError/Loading";
import "./profile.css";

function Profile() {
  ///profile tabs
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocussLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  ///profile tabs
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  ///profile tabs
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    //  dispatch(getUserDetails("profile"))
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      if (!toast.isActive(toastId.current))
        toastId.current = toast.error("Password too short", Toastobjects);
    }

    //password match
    else if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects); ///sa nu apara Error decat o data cand apas de mai multe ori pe buton
      }
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, lastName, email, password })
      );
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects); ///sa nu apara Error decat o data cand apas de mai multe ori pe buton
      }
    }
  };

  return (
    <div>
      <NavbarSecond />
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      {userInfo ? (
        <section className="container forms">
          <div className="form login">
            <div className="headerProfile">
              <div className="divImgProfile">
                <img src={noprofile} className="profileIMG" alt="profile"></img>
                {userInfo ? (
                  <div>
                    <h4 style={{ color: "white", margin: "22px" }}>
                      HI, {userInfo.name}
                      <br></br>
                      <div
                        style={{
                          height: "1px",
                          backgroundColor: "#EAEFF5",
                          margin: "4px",
                        }}
                      ></div>
                      <small style={{ color: "white", margin: "2px" }}>
                        Joined {moment(userInfo.createdAt).format("LL")}{" "}
                      </small>
                    </h4>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-content">
              <form onSubmit={submitHandler}>
                {/* <div className="field input-field inputProfile">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div> */}
                {/* <div className="field input-field inputProfile">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}
                <div className="field input-field inputProfile">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="field input-field inputProfile">
                  <input
                    type="password"
                    placeholder=" Confirm Password"
                    className="password"
                    value={confirmPassword}
                    required

                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="form-link">
                  <Link to="/"></Link>
                </div>

                <div className="field button-field inputProfile">
                  <button className="btnLogin" type="submit">
                    RESET THE PASSWORD
                  </button>
                </div>

                <div className="form-link createAccount">
                  {/* <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Create Account
                </Link> */}
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div className="alert alert-danger cartEmpty" role="alert">
          <h4 className="textCartIsEmpty">
            Can`t update your profile before login or register
          </h4>
        </div>
      )}
    </div>
  );
}

export default Profile;
