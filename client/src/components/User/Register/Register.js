import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";
import { register } from "../../../Redux/Actions/userActions";
import Message from "../../LoadingError/Error";
import Loading from "../../LoadingError/Loading";
import NavbarSecond from "../../Navbar/NavbarSecond";
import "./register.css";

function Register() {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const toastId = React.useRef(null);
  const navigate = useNavigate();

  const redirect = "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  const Toastobjects = {
    pauseOnFocussLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.length === 0 || email.length === 0 || lastName.length === 0) {
      ///toate cimpurile sa fie completate
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Este nevoie să completezi toate câmpurile!",
          Toastobjects
        );
      }
    } else if (!isValidEmail(email)) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Email-ul este invalid", Toastobjects);
      }
    } else if (confirmPassword !== password) {
      ///daca parolele nu corespund
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Parolele introduse nu ce potrivesc!", Toastobjects);
      }
    } else if (password.length < 8) {
      ///daca parola e prea scurta
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error(
          "Parola ta trebuie sa contina cel putin 8 caractere!",
          Toastobjects
        );
      }
    } else dispatch(register(name, lastName, email, password)); ///toate indeplinite, are loc inregistrarea user-ului
  };

  return (
    <div>
      <NavbarSecond />
      <ToastContainer />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>Register</header>
            {error && (
              <Message variant="alert-danger alertRegister">{error}</Message>
            )}
            {loading && <Loading />}
            <form onSubmit={submitHandler}>
              <div className="field input-field inputProfile ">
                <input
                  type="text"
                  placeholder="Prenumele"
                  className="input"
                  value={name}
                  minLength={3}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field input-field inputProfile">
                <input
                  type="text"
                  placeholder="Numele"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="field input-field inputProfile">
                <input
                  placeholder="Email"
                  className="inputEmailRegister"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field inputProfile">
                <input
                  type="password"
                  placeholder="Parola"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="field input-field inputProfile">
                <input
                  type="password"
                  placeholder="Confirmare parola"
                  className="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="field button-field inputProfile">
                <button className="btnLogin" type="submit">
                Inregistreaza-te
                </button>
              </div>

              <div className="form-link createAccount inputProfile">
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Aveti deja un cont?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
