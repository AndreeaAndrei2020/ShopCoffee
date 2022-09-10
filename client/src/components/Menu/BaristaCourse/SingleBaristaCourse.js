import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavbarSecond from "../../Navbar/NavbarSecond.js";
import Loading from "../../LoadingError/Loading.js";
import Message from "../../LoadingError/Error.js";
import { listCoursesDetails } from "../../../Redux/Actions/ProductActions.js";
import { addToCart } from "../../../Redux/Actions/cartActions.js";

const API_URL = process.env.REACT_APP_API_URL;

const SingleBaristaCourse = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [qty1, setQty1] = useState(1);
  const dispatch = useDispatch();
  const courseDetails = useSelector((state) => state.courseDetails);
  const { loading, error, course } = courseDetails;
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    dispatch(listCoursesDetails(id));
  }, [dispatch, id]);

  const AddToCartHAndle = (e) => {
    e.preventDefault();
    dispatch(addToCart(id, qty, "baristaCourses"));
    setBanner(true);
    setQty1(qty)
  };

  return (
    <div >
      <NavbarSecond />
      {banner ? (
        <div
          className="alert alert-dark banner"
          role="alert"
          style={{ color: "white" }}
        >
          <h5>
            {qty1}x {course.name} was added to cart{" "}
          </h5>
        </div>
      ) : (
        ""
      )}
      <div className="singleDrinkComponent" >
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="small-container single-product" >
              <div className="row">
                <div className="col2">
                  <img
                    src={`${API_URL}${course.image}`}
                    alt={course.name}
                  ></img>
                </div>

                <div className="col2">
                  <h2>{course.name}</h2>
                  <p className="description">{course.description}</p>
                  <h4>- {course.price}.00  euro -</h4>
                 {course.countInStock > 0 ? (
                    <p className="description">Status : DISPONIBIL</p>
                  ) : (
                    <p className="description"> Status: INDISPONIBIL </p>
                  )} 
                  
                  {course.countInStock > 0 ? (
                  <>
                    <div className="divDetails">
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="selectSingleDrink"
                      >
                        {[...Array(course.countInStock).keys()].map((x) => (
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
                      <button onClick={AddToCartHAndle} className="btnAddCard">
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


export default SingleBaristaCourse;