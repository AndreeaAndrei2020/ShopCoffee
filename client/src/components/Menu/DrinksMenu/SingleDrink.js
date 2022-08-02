import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavbarSecond from "../../Navbar/NavbarSecond";
import { listProductDetails } from "../../../Redux/Actions/ProductActions";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import "./singleDrinks.css";

const API_URL = process.env.REACT_APP_API_URL;

const SingleDrink = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    console.log(e);
    navigate(`/cart/${id}?qty=${qty}`);

  };
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
            <div className="small-container single-product">
              <div className="row">
                <div className="col2">
                  <img
                    src={`${API_URL}${product.image}`}
                    alt={product.name}
                  ></img>
                </div>

                <div className="col2">
                  <h1>{product.name}</h1>
                  <p className="description">{product.description}</p>
                  <h4>- {product.price} ron -</h4>
                  {product.countInStock > 0 ? (
                    <p className="description">Status : Available</p>
                  ) : (
                    <p className="description"> Status: UNAVAILABLE </p>
                  )}

                  {product.countInStock > 0 ? (
                    <>
                      <div className="divDetails">
                        <button
                          onClick={AddToCartHAndle}
                          className="btnAddCard"
                        >
                          Add to Card
                        </button>
                      </div>
                      <div className="divDetails">
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                              style={{ color: "black" }}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </select>{" "}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>{" "}
    </div>
  );
};
{
  /* {drink.name} */
}

export default SingleDrink;
