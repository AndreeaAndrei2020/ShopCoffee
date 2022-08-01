import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarSecond from '../Navbar/NavbarSecond';

const API_URL = process.env.REACT_APP_API_URL;

function GiftCard() {
    const { id } = useParams();
    console.log("id" ,id)
    const [giftCard, setGiftCard] = useState({});
    useEffect(() => {
      const fetchproduct = async () => {
        const { data } = await axios.get(`${API_URL}/api/giftCards/${id}`);
        console.log(1111, data);
        setGiftCard(data);
      };
      fetchproduct();
    }, [id]);
  
    const [amount, setAmount] = useState(1);
  
    const incrementFunction = () => setAmount(amount + 1);
    const decrementFunction = () => {
      if (amount > 0) setAmount(amount - 1);
    };
  
    return (
      <div>
        <NavbarSecond />
        <div className="singleDrinkComponent">
          <div className="small-container single-product">
            <div className="row">
              <div className="col2">
                <img src={`${API_URL}${giftCard.image}`} alt={giftCard.name}></img>
              </div>
              <div className="col2">
                <h1>{giftCard.name}</h1>
                <p className="description">{giftCard.description}</p>
                <h4>- {giftCard.price} ron -</h4>
                <button className="btnAddCard">Add to Card</button>
                <div className="buttonContainer">
                  <button id="decrement" onClick={decrementFunction}>
                    {" "}
                    -{" "}
                  </button>
                  <p className="inputValueAmount">{amount} </p>
                  <button id="increment" onClick={incrementFunction}>
                    {" "}
                    +{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
}

export default GiftCard;

