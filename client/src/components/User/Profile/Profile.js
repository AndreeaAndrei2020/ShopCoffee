import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

import { updateUserProfile } from "../../../Redux/Actions/userActions";
import noprofile from "./noprofil.jpg";
import Toast from '../../LoadingError/Toast.js'
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
  const { loading, error, userInfo : user }  = userLogin;

  ///profile tabs
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      if (!toast.isActive(toastId.current))
        toastId.current = toast.error("Parola ta trebuie să conțină cel putin 8 caractere!", Toastobjects);
    }

    //password match
    else if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Parolele introduse nu ce potrivesc!", Toastobjects); ///sa nu apara Error decat o data cand apas de mai multe ori pe buton
      }
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, lastName, email, password })
      );
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Parola resetată", Toastobjects); ///sa nu apara Error decat o data cand apas de mai multe ori pe buton
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
      {user ? (
        <section className="container forms">
          <div className="form login">
            <div className="headerProfile">
              <div className="divImgProfile">
                <img src={noprofile} className="profileIMG" alt="profile"></img>
                {user ? (
                  <div>
                    <h4 style={{ color: "white", margin: "22px" }}>
                      HI, {user.name}
                      <br></br>
                      <div
                        style={{
                          height: "1px",
                          backgroundColor: "#EAEFF5",
                          margin: "4px",
                        }}
                      ></div>
                      <small style={{ color: "white", margin: "2px" }}>
                        Joined {moment(user.createdAt).format("LL")}{" "}
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
          
                <div className="field button-field inputProfile">
                  <button className="btnLogin" type="submit">
                    RESET THE PASSWORD
                  </button>
                </div>

                <div className="form-link createAccount">
               
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
