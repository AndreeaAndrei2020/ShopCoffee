import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import NavbarSecond from "../Navbar/NavbarSecond";
import "./equipment.css";

const API_URL = process.env.REACT_APP_API_URL;

function HomeEquipment() {
  const [equipments, setEquipments] = useState([""]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/equipment`);
      setEquipments(data["equipments"]);
    };
    fetchproducts();
  }, []);

  return (
    <div>
      <NavbarSecond />
      <div className="equipmentsComponent">
        <h1 className="h1HomeEquipment">Home Equipment</h1>
        <div className="pro-container equipmentsContainer">
          {equipments.map((equipment, index) => {
            return (
              <div className="pro equipmentContainer" key={index}>
                <Link to={`/equipment/${equipment._id}`}>
                  <div equipment="titleDrink" >
                    <h3 className="equipmentText">{equipment.name}</h3>
                    <p className="equipmentText">- {equipment.price} ron -</p>
                  </div>
                  <div className="containerPhoto">
                    <img
                      src={`${API_URL}${equipment.image}`}
                      alt={equipment.name}
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

export default HomeEquipment;
