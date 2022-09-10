import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavbarSecond from "../../../Navbar/NavbarSecond";
import Message from "../../../LoadingError/Error";
import Loading from "../../../LoadingError/Loading";
import { listDrinks } from "../../../../Redux/Actions/ProductActions";
import "./drinks.css";

const API_URL = process.env.REACT_APP_API_URL;

function Drinks() {
  const dispatch = useDispatch();
  const drinksList = useSelector((state) => state.drinksList);
  const { loading, error, drinks } = drinksList;
  const [update, setUpdate] = useState();

  useEffect(() => {
    dispatch(listDrinks());
  }, [dispatch]);

  useEffect(() => {
    if (drinks.length > 0) setUpdate(drinks);
  }, [drinks]);



  return (
    <div>
      <NavbarSecond />
      <div style={{paddingLeft: '10px'}}>
        <label style={{ marginBottom: "3px", color: "white" }}>
          Ordonează după preț
        </label>
        <br></br>

        <div className="">
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option1"
            onChange={() => {
              setUpdate([...update].sort((a, b) => a.price - b.price));
            }}
          />
          <label
            className="btn btnCrescDesc"
            htmlFor="option1"
            style={{ marginBottom: "3px" }}
          >
            Crescător
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option2"
            onChange={() => {
              setUpdate([...update].sort((a, b) => b.price - a.price));
            }}
          />{" "}
          <br></br>
          <label
            className="btn btnCrescDesc"
            htmlFor="option2"
            style={{ marginBottom: "3px" }}
          >
            Descrescător
          </label>
          <br></br>

          <input
            type="radio"
            className="btn-check"
            name="options"
            id="option3"
            onChange={() => {
              setUpdate(drinks);
            }}
          />
          <label
            className="btn btnCrescDesc"
            htmlFor="option3"
            style={{ marginBottom: "3px" }}
          >
            Resetează
          </label>
        </div>
      </div>
      <h2 className="h2Menu">Coffee Menu : 07:00 - 20:00</h2>
      <div className="pro-container">
        {!update ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {update.map((product, index) => {
              return (
                <div className="pro" key={product._id}>
                  <Link to={`/drinks/${product._id}`}>
                    <div className="titleDrink">
                      <h3>{product.name}</h3>
                      <p>{product.price}.00 euro</p>
                    </div>
                    <div className="containerPhoto">
                      <img
                        src={`${API_URL}${product.image}`}
                        alt={product.name}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </>
        )}
      </div>{" "}
    </div>
  );
}

export default Drinks;
