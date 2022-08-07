import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavbarSecond from "../Navbar/NavbarSecond";
import { login } from "../../Redux/Actions/userActions";
import "./login.css";
import Message from "../LoadingError/Error.js";
import Loading from "../LoadingError/Loading.js";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const { search } = useLocation();

//   const redirect = search ? search.split("=")[1]:"/";

//   const userLogin = useSelector((state) => state.userLogin);
//   const { error, loading, userInfo } = userLogin;

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [userInfo,navigate,redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//    dispatch(login(email,password))
//   };

//   return (
//     <div className="bodyLogin">
//       <NavbarSecond />
//       <div className="centerContainerLogin">
//         <h1>Login</h1>

//         {error && <Message variant="alert-danger">{error}</Message>}
//         {loading && <Loading/>}

//         <form  onSubmit={submitHandler}>
//           <div className="txt_field">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="txt_field">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="txt_field">
//             <button type="submit" style={{color: "white"}}>Login</button>
//             <p>
//               {" "}
//               <Link
//                 to={redirect ? `/register?redirect=${redirect}` : "/register"}
//               >
//                 Create Account
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

function Login() {
  window.scrollTo(0,0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = search ? search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div>
      <NavbarSecond />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>Login</header>
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            <form onSubmit={submitHandler}>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <i class='bx bx-hide eye-icon'></i> */}
              </div>
              <div className="form-link">
                <Link to="/"></Link>
              </div>

              <div className="field button-field">
                <button className="btnLogin" type="submit">
                  Login
                </button>
              </div>

              <div className="form-link createAccount">
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
