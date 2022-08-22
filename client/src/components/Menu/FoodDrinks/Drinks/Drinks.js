import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavbarSecond from "../../../Navbar/NavbarSecond";
import Message from "../../../LoadingError/Error";
import Loading from "../../../LoadingError/Loading";
import { listProduct } from "../../../../Redux/Actions/ProductActions";
import "./drinks.css";

const API_URL = process.env.REACT_APP_API_URL;

function Drinks() {
  const dispatch = useDispatch();
  const drinksList = useSelector((state) => state.drinksList);
  const { loading, error, drinks } = drinksList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <div>
      <NavbarSecond />

      <h2 className="h2Menu">Coffee Menu : 07:00 - 20:00</h2>
      <div className="pro-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {
            
            drinks.map((product, index) => {
              if (index < 5)
                return (
                  <div className="pro" key={product._id}>
                    <Link to={`/drinks/${product._id}`}>
                      <div className="titleDrink">
                        <h3>{product.name}</h3>
                        <p>{product.price}.00  euro</p>
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
            {/* <div className="divH2">
              <h2>Alcohol Drink Menu: 20:00 -24:00</h2>
            </div> */}

            {/* {drinks.map((product, index) => {
              if (index > 4)
                return (
                  <div className="pro" key={product._id}>
                    <Link to={`/drinks/${product._id}`}>
                      <div className="titleDrink">
                        <h3>{product.name}</h3>
                        <p>{product.price}.00  euro</p>
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
            })} */}
          </>
        )}
      </div>
    </div>
  );
}

export default Drinks;
