import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { addToCart } from "../../../../../Redux/Actions/cartActions";
// import { listProductDetails } from "../../../../../Redux/Actions/ProductActions";
// import Loading from "../../../../LoadingError/Loading";
// import Message from "../../../../LoadingError/Error";
// import NavbarSecond from "../../../../Navbar/NavbarSecond";
import "./singleDrinks.css";
import NavbarSecond from "../../../Navbar/NavbarSecond";
import Loading from "../../../LoadingError/Loading";
import Message from "../../../LoadingError/Error";
import { addToCart } from "../../../../Redux/Actions/cartActions";
import { listProductDetails } from "../../../../Redux/Actions/ProductActions";

const API_URL = process.env.REACT_APP_API_URL;

const SingleDrink = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
 
  const { loading, error, product } = productDetails;
  const typeOfProduct = product.typeOfProduct;
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    // navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id, qty,typeOfProduct));
    setBanner(true);
  };

  return (
    <div>
      <NavbarSecond />
      {banner ? (
        <div
          className="alert alert-dark banner"
          role="alert"
          style={{ color: "white" }}
        >
          <h5>
            {qty}x {product.name} was added to cart{" "}
          </h5>
        </div>
      ) : (
        ""
      )}
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
                  {/* <p className="description">{product.description}</p> */}
                  <h4>- {product.price} ron -</h4>
                  {product.countInStock > 0 ? (
                    <p className="description">Status : Available</p>
                  ) : (
                    <p className="description"> Status: UNAVAILABLE </p>
                  )}

                  {product.countInStock > 0 ? (
                    <>
                      <div className="divDetails">
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          className="selectSingleDrink"
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
                      <div className="divDetails">
                        <button
                          onClick={AddToCartHAndle}
                          className="btnAddCard"
                        >
                          Add to Card
                        </button>
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
