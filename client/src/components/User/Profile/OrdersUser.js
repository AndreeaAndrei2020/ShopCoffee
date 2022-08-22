import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../../../Redux/Actions/OrderActions";
import { getUserDetails } from "../../../Redux/Actions/userActions";
import Message from "../../LoadingError/Error";
import Loading from "../../LoadingError/Loading";
import NavbarSecond from "../../Navbar/NavbarSecond";
import moment from "moment";
function OrdersUser() {
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyOrders());
    // dispatch(getUserDetails("profile"));
  }, [dispatch]);

  return (
    <div >
      <NavbarSecond />
      <section className="h-100 gradient-custom">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {orders.length > 0 ? (
              orders.map((item, index) => {
                return (
                  <>
                    <div className=" px-4 py-5">
                      <h4 className=" mb-0" style={{ color: "white" }}>
                        <i>
                          {" "}
                          Here is your orders <span></span>
                        </i>
                      </h4>
                    </div>
                    <h4 style={{ color: "rgb(168, 126, 70)" }}>
                      Order nr: {index + 1} , date:{" "}
                      {moment(item.createdAt).format("LL")}{" "}
                    </h4>
                    <table class="table" style={{ border: "1px solid white" }}>
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
                            PRODUCT
                          </th>
                          <th
                            scope="col"
                            style={{ color: "rgb(168, 126, 70)" }}
                          >
                            QTY
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
                            <tr>
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
                          <h6 style={{ padding: "10px" }}>
                            {" "}
                            TOTAL ORDER : {item.totalPrice} euro
                          </h6>
                        </tr>
                      </tbody>
                    </table>
                  </>
                );
              })
            ) : (
              <div className=" px-4 py-5">
                <h4 className=" mb-0" style={{ color: "white" }}>
                  <i>Oops, you haven't placed an order yet</i>
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
