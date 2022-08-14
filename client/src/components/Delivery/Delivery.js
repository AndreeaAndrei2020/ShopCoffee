import React from "react";
import NavbarSecond from "../Navbar/NavbarSecond";

function Delivery() {
  return (
    <div>
      <NavbarSecond />
      <div className="small-container">
       
        <div style={{ height: "100vh" }}>
        <p
          className="fs-1"
          style={{
            textAlign: "center",
            paddingBottom:'50px'
          }}
        >
          Delivery
        </p>
          <p className="fs-5" style={{ textAlign: "center" }}>
            The delivery is made strictly in Bucharest!
          </p>
          <p className="fs-5" style={{ textAlign: "center" }}>
            Shipping is free for a minimum order of 100 lei. If you opt for a
            basket with a lower value, the cost of the courier service will be
            10 lei/parcel
          </p>{" "}
          <p  className="fs-5" style={{ textAlign: "center" }}>
            The delivery is very fast. We reach you within 30 minutes after
            placing the order.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
