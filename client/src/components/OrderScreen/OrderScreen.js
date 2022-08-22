import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOrderDetails, payOrder } from "../../Redux/Actions/OrderActions";
import { ORDER_PAY_RESET } from "../../Redux/Constants/OrderConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import NavbarSecond from "../Navbar/NavbarSecond";
import axios from "axios";
import CryptoPaymentsForm from "./CryptoPaymentsForm";

const API_URL = process.env.REACT_APP_API_URL;

function OrderScreen() {
  window.scrollTo(0, 0);

  const [sdkReady, setSdkReady] = useState(false);

  const { id } = useParams();
  const orderId = id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        `${API_URL}/api/config/paypal`
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  
  return (
    <div style={{ height: "100vh"}}>
      <NavbarSecond />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <CryptoPaymentsForm totalPrice={order.totalPrice} />
          <br></br>
          <br></br>

     
        </>
      )}





    </div>
  );
}

export default OrderScreen;
