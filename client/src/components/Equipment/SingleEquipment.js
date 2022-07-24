import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./equipment.css";
import './singleEquipment.css'
import NavbarSecond from "../Navbar/NavbarSecond";

const API_URL = process.env.REACT_APP_API_URL;

const SingleEquipment = () => {
  const { id } = useParams();
  const [equipment, setDrink] = useState({});
  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get(`${API_URL}/api/equipment/${id}`);
      console.log(1111, data);
      setDrink(data);
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
      <div className="Product">
        <div className="small-container single-product">
          <div className="row">
            <div className="col2">
              <img
                src={`${API_URL}${equipment.image}`}
                alt={equipment.name}
              ></img>
            </div>
            <div className="col2">
              <h1 className="nameEquipment">{equipment.name}</h1>
              <p className="description">{equipment.description}</p>
              <h4>- {equipment.price} ron -</h4>
              <button className="btnAddCard">Add to Card</button>
              <div className="buttonContainer">
                <button id="decrement" onClick={decrementFunction}>
                  {" "}
                  -{" "}
                </button>
                <p className="inputValue">{amount} </p>
                <button id="increment" onClick={incrementFunction}>
                  {" "}
                  +{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="detailsEquipment">
        <p >
          Prin tehnologie și design depășeșste multe granițe și aduce performața
          din cafena, în casele iubitorilor de cafea.
        </p>
        <p>
          Oferă constanță, prin retețele care se pot seta în aplicația online.
          Permite transmiterea comenzilor prin aplicatie spre prepararea rapidă
          a băuturii.
        </p>
        <p>
          Motorul NEO ajută espressorul să funcționeze aproape instant.
          Folosește un mecanism unic de izolație, care reduce nu numai dispersia
          căldurii, ci și consumul de energie.
        </p>
      </div>
    </div>
  );
};
{
  /* {drink.name} */
}

export default SingleEquipment;
