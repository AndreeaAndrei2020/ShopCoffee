import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-content">
          <h3>Restart</h3>
          <p>
          Restart is a community of creative, open people who share experiences and life stories, while carefully preparing all the details for a specialty coffee. Order now or come to us!
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
                <a href="/delivery">Delivery</a>
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
