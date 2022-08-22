import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import NavbarSecond from "../Navbar/NavbarSecond";

// import { listCourses } from "../../Redux/Actions/ProductActions";
// import Loading from "../LoadingError/Loading";
// import Message from "../LoadingError/Error";
import "./baristaCourse.css";
import NavbarSecond from "../../Navbar/NavbarSecond";
import Loading from "../../LoadingError/Loading";
import { listCourses } from "../../../Redux/Actions/ProductActions";
import Message from "../../LoadingError/Error";
// import NavbarSecond from "../../Navbar/NavbarSecond";
// import Loading from "../../LoadingError/Loading";
// import Message from "../../LoadingError/Error";
// import { listCourses } from "../../../Redux/Actions/ProductActions";

const API_URL = process.env.REACT_APP_API_URL;

function BaristaCourse() {
  const dispatch = useDispatch();
  const coursesList = useSelector((state) => state.coursesList);
  const { loading, error, courses } = coursesList;

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);
  return (
    <div>
      <NavbarSecond />
      <div className="equipmentsComponent">
        <h2 className="h2Menu">Barista Courses</h2>
        <div className="pro-container equipmentsContainer">
          <div className="pro-container">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <>
                {courses.map((item, index) => {
                  return (
                    <div className="pro" key={index}>
                      <Link to={`/baristaCourses/${item._id}`}>
                        <div className="titleDrink ">
                          <p className="fs-4 titleBarista">{item.name}</p>
                          <p>{item.price}.00 euro</p>
                        </div>
                        <div className="containerPhoto">
                          <img
                            src={`${API_URL}${item.image}`}
                            alt={item.name}
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
      </div>
    </div>
  );
}

export default BaristaCourse;
