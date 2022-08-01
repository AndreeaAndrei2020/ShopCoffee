import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavbarSecond from "../Navbar/NavbarSecond";
// import "./equipment.css";
const API_URL = process.env.REACT_APP_API_URL;

function BaristaCourse() {
  const [baristaCourses, setBaristaCourses] = useState([""]);

  useEffect(() => {
    const fetchproducts = async () => {
      const { data } = await axios.get(`${API_URL}/api/baristaCourses`);
          setBaristaCourses(data['baristaCourses']);
          console.log("fd",data)
    };
    fetchproducts();
  }, []);
  return (
    <div>
      <NavbarSecond />
      <div className="equipmentsComponent">
        <h1 className="h1HomeEquipment">Barista Courses</h1>
        <div className="pro-container equipmentsContainer">
          {baristaCourses.map((baristaCourse, index) => {
            return (
              <div className="pro equipmentContainer" key={index}>
                <Link to={`/baristaCourses/${baristaCourse._id}`}>
                  <div className="titleDrinkBaristaCourse">
                    <h3 className="equipmentText" style={{color: 'white'}}>{baristaCourse.name}</h3>
                    <p className="equipmentText">- {baristaCourse.price} ron -</p>
                  </div>
                  <div className="containerPhoto">
                    <img
                      src={`${API_URL}${baristaCourse.image}`}
                      alt={baristaCourse.name}
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

export default BaristaCourse;
