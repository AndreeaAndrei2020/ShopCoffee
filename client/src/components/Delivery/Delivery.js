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
         Livrarea
        </p>
          <p className="fs-5" style={{ textAlign: "center" }}>
    
            Livrarea se face strict în București!
          </p>
          <p className="fs-5" style={{ textAlign: "center" }}>
          Transportul este gratuit pentru o comandă de minim 100 lei. Dacă optați pentru un
             coș cu o valoare mai mică, costul serviciului de curierat va fi
             2euro/colet.
          </p>{" "}
          <p className="fs-5" style={{ textAlign: "center" }}>
         Pentru vremea ploioasă, se adaugă taxă extra 1 euro. 
          </p>{" "}
          <p  className="fs-5" style={{ textAlign: "center" }}>
          Livrarea este foarte rapidă. Vă ajungem în 30 de minute după
             plasarea comenzii.
          </p>
          <p  className="fs-5" style={{ textAlign: "center" }}>
          PLATA doar în moneda virtuală ETH, prin portofelul digital Metamask. 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
