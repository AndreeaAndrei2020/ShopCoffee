import React from "react";
import NavbarSecond from "../Navbar/NavbarSecond";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './giftCards.css'
const API_URL = process.env.REACT_APP_API_URL;

function GiftCards() {
  const [giftCards, setGiftCards] = useState([""]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/giftCards`);
      setGiftCards(data["giftCardsRoute"]);
      console.log(11111, data);
    };
    fetchproducts();
  }, []);

  return (
    <div>
      <NavbarSecond />
      <div className="equipmentsComponent">
        <h1 className="h1HomeEquipment">Gift Cards</h1>
        <div className="pro-container equipmentsContainer">
          {giftCards.map((giftCard, index) => {
            return (
              <div className="pro equipmentContainer" key={index}>
                <Link to={`/giftCards/${giftCard._id}`}>
                  <div className=" giftCardDetails">
                    <h4 className="giftText">{giftCard.name}</h4>
                    <p className=" giftText">- {giftCard.price} ron -</p>
                  </div>
                  <div className="containerPhoto">
                    <img
                      src={`${API_URL}${giftCard.image}`}
                      alt={giftCard.name}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default GiftCards;
