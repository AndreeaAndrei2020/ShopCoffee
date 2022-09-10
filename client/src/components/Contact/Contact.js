import React from "react";
import { Link } from "react-router-dom";
import NavbarSecond from "../Navbar/NavbarSecond";


const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
          <p className="fs-5" style={{ textAlign: "center", color:'white' }}>
          e-mail : {label}
          </p>
     
        </Link>
    );
};


function Contact() {
  return (
    <div>
      <NavbarSecond />
      <div className="small-container">
        <div style={{ height: "100vh" }}>
          <p
            className="fs-1"
            style={{
              textAlign: "center",
              paddingBottom: "50px",
            }}
          >
            Contact
          </p>
          <p className="fs-5" style={{ textAlign: "center" }}>
            Servicii : +4 0330 402 109
          </p>

          <p className="fs-5" style={{ textAlign: "center" }}>
           Adresa : Strada Zorilor 20, Bucharest, Romania
          </p>

          {/* <p className="fs-5" style={{ textAlign: "center" }}>
           e-mail :{""} restart.coffee@restartcoffee.ro

          </p> */}
          <ButtonMailto label="restart.coffee@restartcoffee.ro" mailto="mailto:restart.coffee@restartcoffee.rom" />
        </div>
      </div>
    </div>
  );
}

export default Contact;
