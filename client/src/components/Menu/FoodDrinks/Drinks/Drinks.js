import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { listProduct } from "../../../../../Redux/Actions/ProductActions";
// import NavbarSecond from "../../../../Navbar/NavbarSecond";
// import Loading from "../../../../LoadingError/Loading";
// import Message from "../../../../LoadingError/Error";
import "./drinks.css";
import NavbarSecond from "../../../Navbar/NavbarSecond";
import Message from "../../../LoadingError/Error";
import Loading from "../../../LoadingError/Loading";
import { listProduct } from "../../../../Redux/Actions/ProductActions";

const API_URL = process.env.REACT_APP_API_URL;

function Drinks() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

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
            {products.map((product, index) => {
              if (index < 5)
                return (
                  <div className="pro" key={product._id}>
                    <Link to={`/drinks/${product._id}`}>
                      <div className="titleDrink">
                        <h3>{product.name}</h3>
                        <p>{product.price} ron</p>
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
            <div className="divH2">
              <h2>Alcohol Drink Menu: 20:00 -24:00</h2>
            </div>

            {products.map((product, index) => {
              if (index > 4)
                return (
                  <div className="pro" key={product._id}>
                    <Link to={`/drinks/${product._id}`}>
                      <div className="titleDrink">
                        <h3>{product.name}</h3>
                        <p>{product.price} ron</p>
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
      </div>
    </div>
  );
}

export default Drinks;
