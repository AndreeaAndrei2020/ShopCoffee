import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { listMyOrders } from "../../../Redux/Actions/OrderActions";
import Message from "../../LoadingError/Error";
import Loading from "../../LoadingError/Loading";
import NavbarSecond from "../../Navbar/NavbarSecond";

function OrdersUser() {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div >
      <NavbarSecond />
      <section className="h-100 gradient-custom" style={{height:'100vh'}} > 
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
          <div className=" px-4 py-5 " >
                      <h4 className=" mb-0" style={{ color: "white" }}>
                        
                          {" "}
                         Istoric comenzi <span></span>
                        
                      </h4>
                    </div>
            {orders.length > 0 ? (
              orders.map((item, index) => {
                return (
                  <div key={index}>
                    <h4 style={{ color: "rgb(168, 126, 70)" }}>
                      Comanda nr: {index + 1}, data :{" "}
                      {moment(item.createdAt).format("LL")}{" "}
                    </h4>
                    <div style={{overflowX:'auto' }}>
                    <table className="table" style={{ border: "1px solid white"}}>
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            style={{ color: "rgb(168, 126, 70)" }}
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            style={{ color: "rgb(168, 126, 70)" }}
                          >
                          PRODUS
                          </th>
                          <th
                            scope="col"
                            style={{ color: "rgb(168, 126, 70)" }}
                          >
                        CANTITATE
                          </th>
                          <th
                            scope="col"
                            style={{ color: "rgb(168, 126, 70)" }}
                          >
                            SUBTOTAL
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.orderItems.map((product, indexProduct) => {
                          return (
                            <tr key={index}>
                              <th scope="row" style={{ color: "white" }}>
                                {indexProduct + 1}
                              </th>
                              <td style={{ color: "white" }}>
                                {product.title}
                              </td>
                              <td style={{ color: "white" }}>{product.qty}</td>
                              <td style={{ color: "white" }}>
                                {product.qty * product.price} euro
                              </td>
                            </tr>
                          );
                        })}
                        <tr
                          style={{ color: "white", backgroundColor: "black" }}
                        >
                          <p style={{ padding: "10px" }}>
                            {" "}
                            TOTAL COMANDĂ : {item.totalPrice} euro
                          </p>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className=" px-4 py-5">
                <h4 className=" mb-0" style={{ color: "white" }}>
                  <i>Oops, nu aveți nicio comandă înregistrată.</i>
                </h4>
              </div>
            )}
          </>
        )}

        
      </section>


      
    </div>
  );
}

export default OrdersUser;
