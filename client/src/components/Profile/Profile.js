import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import noprofile from "./noprofil.jpg";
import NavbarSecond from "../Navbar/NavbarSecond";
import "./profile.css";
import moment from "moment";
import {
  getUserDetails,
  updateUserProfile,
} from "../../Redux/Actions/userActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { toast } from "react-toastify";

function Profile() {
  ///profile tabs
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("LET S GO");
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
    //password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects); ///sa nu apara Error decat o data cand apas de mai multe ori pe buton
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, name, lastName ,email, password }));
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
      <section className="container forms">
        <div className="form login">
          <div className="headerProfile">
            <div className="divImgProfile">
              <img src={noprofile} className="profileIMG"></img>
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
            {/* {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />} */}
            <form onSubmit={submitHandler}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="New Password"
                  className="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <i class='bx bx-hide eye-icon'></i> */}
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder=" Confirm Password"
                  className="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {/* <i class='bx bx-hide eye-icon'></i> */}
              </div>
              <div className="form-link">
                <Link to="/"></Link>
              </div>

              <div className="field button-field">
                <button className="btnLogin" type="submit">
                  UPDATE PROFILE
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
    </div>
  );
}

export default Profile;
