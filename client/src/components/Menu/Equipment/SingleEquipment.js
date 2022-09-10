import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listEquipmentDetails } from "../../../Redux/Actions/ProductActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import NavbarSecond from "../../Navbar/NavbarSecond";
import "./equipment.css";
import "./singleEquipment.css";

const API_URL = process.env.REACT_APP_API_URL;

const SingleEquipment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const equipmentDetails = useSelector((state) => state.equipmentDetails);
  const { loading, error, equipment } = equipmentDetails;

  useEffect(() => {
    dispatch(listEquipmentDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavbarSecond />
      <div className="singleDrinkComponent">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div
              className="small-container single-product"
              style={{ paddingTop: "120px" }}
            >
              <div className="row">
                <div className="col2">
                  <img
                    src={`${API_URL}${equipment.image}`}
                    alt={equipment.name}
                  ></img>
                </div>

                <div className="col2">
                  <h1>{equipment.name}</h1>
                  <p className="description">{equipment.description}</p>
                  <h4>- {equipment.price}.00 euro -</h4>
                  <p className="descriptionPayment">
                    PLATA ȘI COLECTAREA ACESTUI DISPOZITIV SE FACE STRICT LA
                    CAFENEA !
                  </p>
                  <p className="lh-1">
                    <i>CARACTERISTICI</i>
                  </p>
                  <p className="lh-sm">
                    <i>greutate : {equipment.weight}</i>
                  </p>
                  <p className="lh-base">
                    <i>marime : {equipment.size}</i>
                  </p>
                  <p className="lh-lg">
                    <i>putere : {equipment.power}</i>
                  </p>
                  <p className="lh-lg">
                    <i>Alimentare cu apă: rezervor / retea</i>
                  </p>{" "}
                  <p className="lh-1">
                    Puteți extrage un espresso sau pregăti un cappuccino cremos,
                    așa cum le-ați bea într-o cafenea de specialitate.
                    Tehnologiile încorporate permit extragerea optimă a cafelei
                    și te ajută să ai o crema de lapte bună, elastică, cremoasă
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>{" "}
    </div>
  );
};

export default SingleEquipment;
