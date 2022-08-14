import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../../Redux/Actions/userActions";
import NavbarSecond from "../../Navbar/NavbarSecond";
import Message from "../../LoadingError/Error";
import Loading from "../../LoadingError/Loading";

function Register() {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = search ? search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);

  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, lastName, email, password));
  };

  return (
    <div>
      <NavbarSecond />
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
                  placeholder="First Name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field input-field inputProfile">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
          
              <div className="field input-field inputProfile">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field inputProfile">
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* <div className="field input-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
     
              </div> */}
              {/* <div className="form-link">
                <Link to="/"></Link>
              </div> */}

              <div className="field button-field inputProfile">
                <button className="btnLogin" type="submit">
                  Register now
                </button>
              </div>

              <div className="form-link createAccount inputProfile">
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Have an Account Already?
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
