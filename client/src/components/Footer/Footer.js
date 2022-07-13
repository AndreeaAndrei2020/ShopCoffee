import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-content">
          <h3>Restart</h3>
          <p>
          Our attention is focused on one dream: to develop the field of specialty coffee in Romania, to explore its potential in taste, following its entire path: from the farm, to the bakery and in the cup. We enjoy nothing more than your curiosity about coffee. We are here to answer all your questions, click to get in touch.
          </p>
          <div className="footer-menu">
            <ul className="f-menu">
              <li>
                <a href="/#">Home</a>
              </li>
              <li>
                <a href="/#">Contact</a>
              </li>
              <li>
                <a href="/#">Delivery</a>
              </li>
              <li>
                <a href="/#">Blog</a>
              </li>
              <li>
                <a href="/#">Info</a>
              </li>
            </ul>
          </div>

          <ul className="socials">
            <li>
              <a href="/#">
                <i className="fa fa-facebook"></i>
              </a>
            </li>
           
           
            <li>
              <a href="/#">
                <i className="fa fa-instagram"></i>
              </a>
            </li>
          </ul>

          
        </div>

       
      </footer>
    </div>
  );
}

export default Footer;
