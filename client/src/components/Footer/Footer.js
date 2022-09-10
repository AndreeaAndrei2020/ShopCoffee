import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-content">
          <h3>Restart</h3>
          <p>Restart este o comunitate de oameni creativi, deschiși, care împărtășesc experiențe și povești de viață, în timp ce pregătesc cu atenție toate detaliile pentru o cafea de specialitate. Comanda acum sau vino la noi!
          </p>
          <div className="footer-menu">
            <ul className="f-menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/delivery">Livrare</a>
              </li>
             
            </ul>
          </div>

        </div>
       
      </footer>
    </div>
  );
}

export default Footer;
