import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listEquipment } from "../../../Redux/Actions/ProductActions";
import NavbarSecond from "../../Navbar/NavbarSecond";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import "./equipment.css";

const API_URL = process.env.REACT_APP_API_URL;

function HomeEquipment() {
  const dispatch = useDispatch();
  const equipmentList = useSelector((state) => state.equipmentList);
  const { loading, error, equipment } = equipmentList;

  useEffect(() => {
    dispatch(listEquipment());
  }, [dispatch]);

  return (
    <div style={{ height: "100vh" }}>
      <NavbarSecond />
      <div>
        <h2 className="h2Menu">Home Equipments</h2>
        <div className="pro-container">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {equipment.map((item, index) => {
                return (
                  <div className="pro" key={index}>
                    <Link to={`/equipment/${item._id}`}>
                      <div className="titleDrink">
                        <h3>{item.name}</h3>
                        <p>{item.price}.00 euro</p>
                      </div>
                      <div className="containerPhoto">
                        <img src={`${API_URL}${item.image}`} alt={item.name} />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeEquipment;
