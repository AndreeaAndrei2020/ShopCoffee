import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { listEquipmentDetails } from "../../Redux/Actions/ProductActions";
// import NavbarSecond from "../Navbar/NavbarSecond";
// import Loading from "../LoadingError/Loading";
// import Message from "../LoadingError/Error";
import "./equipment.css";
import "./singleEquipment.css";
import { listEquipmentDetails } from "../../../Redux/Actions/ProductActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import NavbarSecond from "../../Navbar/NavbarSecond";

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
    <div style={{height:'100vh'}}>
      <NavbarSecond />
     
      <div className="singleDrinkComponent">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="small-container single-product" style={{paddingTop:'120px'}}>
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
                  <h4>- {equipment.price}.00  euro -</h4>
                  <p className="descriptionPayment">
                    PAYMENT AND COLLECTION OF THIS DEVICE IS MADE STRICTLY AT
                    OUR CAFE !
                  </p>
                  <p className="lh-1"><i>CHARACTERISTICS</i></p>
                  <p className="lh-sm"><i>
                  weight : {equipment.weight}</i></p>
                  <p className="lh-base"><i>
                  Size : {equipment.size}</i></p>
                  <p className="lh-lg"><i>
                  Power: {equipment.power}</i></p>
                  <p className="lh-lg"><i>
                    Water supply: tank / mains</i></p> <p className="lh-1">You can extract an espresso or prepare a creamy cappuccino, as you would drink them in a specialty coffee shop. Built-in technologies allow optimal coffee extraction and help you have a good elastic, creamy milk cream.</p>
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
