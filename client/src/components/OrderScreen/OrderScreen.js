import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { getOrderDetails, payOrder } from "../../Redux/Actions/OrderActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import NavbarSecond from "../Navbar/NavbarSecond";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../../Redux/Constants/OrderConstants";
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

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <div>
      <NavbarSecond />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <p style={{ color: "white" }}>{order.user.name}</p>
          <a href={`mailto:$${order.user.email}`} style={{ color: "white" }}>
            {order.user.email}
          </a>
          <p style={{ color: "white" }}>{order.shippingAddress.country}</p>
          <p style={{ color: "white" }}>{order.paymentMethod}</p>

          {order.isPaid ? (
            <div>
              <p style={{ color: "white" }}>
                {moment(order.paidAt).calendar()}
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: "white" }}>NOT PAID</p>
            </div>
          )}

          {order.orderItems.length === 0 ? (
            <div>
              <Message variant="alert-info mt-5">
                {" "}
                <p style={{ color: "white" }}>Your order is empty</p>
              </Message>
            </div>
          ) : (
            <div>
              <p style={{ color: "white" }}>
                {order.orderItems.map((item, index) => {
                  return (
                    <div>
                      <div>
                        <Link to={`/drinks/${item.product}`}>
                          {" "}
                          <img
                            style={{ width: "50px" }}
                            alt={item.name}
                            src={`${API_URL}${item.name}`}
                          ></img>
                        </Link>

                        <p>
                          <p style={{ color: "white" }}>{item.qty} </p>
                          <p style={{ color: "white" }}>price: {item.price} </p>
                          <p style={{ color: "white" }}>
                            {" "}
                            total price item: {item.price * item.qty}{" "}
                          </p>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </p>
            </div>
          )}

          {order.isDelivered ? (
            <div>
              <p style={{ color: "white" }}>
                Delivered on {moment(order.deliveredAt).calendar()}
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: "white" }}>NOT DELIVERED</p>
            </div>
          )}

          {!order.isPaid && (
            <div>
              {loadingPay && <Loading />}
              {!sdkReady ? (
                <Loading />
              ) : (
                <PayPalButton
                  amount={1}
                  onSuccess={successPaymentHandler}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OrderScreen;
