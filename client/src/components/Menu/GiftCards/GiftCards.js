import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./giftCards.css";
import Loading from "../../LoadingError/Loading";
import Message from "../../LoadingError/Error";
import { listGiftCards } from "../../../Redux/Actions/ProductActions";
import NavbarSecond from "../../Navbar/NavbarSecond";

const API_URL = process.env.REACT_APP_API_URL;

function GiftCards() {
  const dispatch = useDispatch();
  const giftList = useSelector((state) => state.giftList);
  const { loading, error, gift } = giftList;
  useEffect(() => {
    dispatch(listGiftCards());
  }, [dispatch]);

  return (
    <div>
      <NavbarSecond />
      <h2 className="h2Menu">Gift cards</h2>
      <div className="pro-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {gift.map((item, index) => {
              return (
                <div className="pro" key={index}>
                  <Link to={`/giftCards/${item._id}`}>
                    <div className="titleDrink">
                      <h4 style={{padding:'10px'}}>{item.name}</h4>
                      <p>{item.price}.00  euro</p>
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
  );
}
export default GiftCards;
