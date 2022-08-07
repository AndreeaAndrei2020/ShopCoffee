import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removefromcart } from "../../Redux/Actions/cartActions";
import NavbarSecond from "../Navbar/NavbarSecond";
import Header from "./Header";
import "./cartScreen.css";

const API_URL = process.env.REACT_APP_API_URL;

function CartScreen() {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = searchParams.get("qty"); /// 4
  const { search } = useLocation(); ///?qty=4

  const qty1 = search ? Number(search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems
    .reduce((a, i) => a + i.qty * i.price + 20, 0)
    .toFixed(2);

  const subTotal = cartItems
    .reduce((a, i) => a + i.qty * i.price, 0)
    .toFixed(2);
  console.log("dd", cartItems);
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id));
  };

  return (
    <div style={{ color: "white" }}>
      <NavbarSecond />
      <Header />

      <h1 style={{ textAlign: "center" }}>Cart Screen</h1>
      {cartItems.length === 0 ? (
        <div> YOUR CART IS EMPTY</div>
      ) : (
        <>
          <section className="h-100">
            <div className="container h-100 py-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-10">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                  </div>

                  {cartItems.map((item) => {
                    return (
                      <div key={item.product}>
                        {/* cart items details */}

                        <div className="card rounded-3 mb-4">
                          <div className="card-body p-4">
                            <div className="row d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={`${API_URL}${item.src}`}
                                  className="img-fluid rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <p
                                  className="lead fw-normal mb-2"
                                  style={{ color: "black" }}
                                >
                                  {item.title}
                                </p>
                              </div>

                       
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <select
                                  value={item.qty}
                                  onChange={(e) => {
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    );
                                  }}
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option
                                        key={x + 1}
                                        value={x + 1}
                                        style={{ color: "black" }}
                                      >
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0" style={{ color: "black" }}>
                                  {item.price}.00 Ron
                                </h5>
                              </div>
                              <div
                                className="col-md-1 col-lg-1 col-xl-1 text-end "
                                onClick={() =>
                                  removeFromCartHandle(item.product)
                                }
                              >
                                <a href="#!" className="text-danger">
                                  <i className="fas fa-trash fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* 
                        <div className="card mb-4">
                          <div className="card-body p-4 d-flex flex-row">
                            <div className="form-outline flex-fill">
                              <input
                                type="text"
                                id="form1"
                                className="form-control form-control-lg"
                              />
                              <label className="form-label" for="form1">
                                Discound code
                              </label>
                            </div>
                            <button
                              type="button"
                              className="btn btn-outline-warning btn-lg ms-3"
                            >
                              Apply
                            </button>
                          </div>
                        </div> */}
                      </div>
                    );
                  })}

                  <div className="card">
                    <div className="card-body">
                      <button
                        type="button"
                        className="btn btn-warning btn-block btn-lg"
                      >
                        Proceed to Pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="smallContainerCart cart-page">
            <div className="total-price">
              <table>
                <thead>
                  {" "}
                  <tr>
                    <td>Subtotal</td>
                    <td>{subTotal}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Shipping</td>
                    <td>20 ron</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
            <div className="CheckOut">
              <button>
                {" "}
                <Link to="/shipping"> Check out</Link>{" "}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartScreen;

// <div className="singleDrinkComponent">
// <div className="small-container single-product">
//   <div className="row">
//     <div className="col2">
//       <img
//         src={`${API_URL}${item.name}`}
//         alt={item.name}
//       ></img>
//     </div>
//     <div className="col2">
//       {/* <h1>{item.name}</h1> */}
//       {/* <p className="description">{item.description}</p> */}
//       <h4>- {item.price} ron -</h4>
//       <h5>QUANTITY</h5>

//       <div className="buttonContainer">
{
  /* <p className="inputValueAmount">
          {item.countInStock}{" "}
        </p> */
}
{
  /* <select
          value={item.qty}
          onChange={(e) => {
            dispatch(
              addToCart(
                item.product,
                Number(e.target.value)
              )
            );
          }}
        >
          {[...Array(item.countInStock).keys()].map(
            (x) => (
              <option
                key={x + 1}
                value={x + 1}
                style={{ color: "black" }}
              >
                {x + 1}
              </option>
            )
          )}
        </select>{" "}
      </div>

      <div
        className="buttonContainer"
        onClick={() =>
          removeFromCartHandle(item.product)
        }
      >
        REMOVE FROM CARD
      </div>
    </div>
  </div>
</div>
</div>{" "} */
}

////BOOOOOOOOOOTRSAAAAAAAAAAAAP
{
  /* <section class="h-100" style="background-color: #eee;">
  <div class="container h-100 py-5">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
          <div>
            <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                  class="fas fa-angle-down mt-1"></i></a></p>
          </div>
        </div>

        <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3" alt="Cotton T-shirt">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">Basic T-shirt</p>
                <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="2" type="number"
                  class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$499.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3" alt="Cotton T-shirt">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">Basic T-shirt</p>
                <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="2" type="number"
                  class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$499.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3" alt="Cotton T-shirt">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">Basic T-shirt</p>
                <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="2" type="number"
                  class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$499.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3" alt="Cotton T-shirt">
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">Basic T-shirt</p>
                <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                  <i class="fas fa-minus"></i>
                </button>

                <input id="form1" min="0" name="quantity" value="2" type="number"
                  class="form-control form-control-sm" />

                <button class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$499.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body p-4 d-flex flex-row">
            <div class="form-outline flex-fill">
              <input type="text" id="form1" class="form-control form-control-lg" />
              <label class="form-label" for="form1">Discound code</label>
            </div>
            <button type="button" class="btn btn-outline-warning btn-lg ms-3">Apply</button>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <button type="button" class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</section> */
}

///CE ERA  INAINTE

{
  /* <div className="smallContainerCart cart-page">
<table>
  <tr>
    <th>PRODUCT</th>
    <th>QUANTITY</th>
    <th>SUBTOTAL</th>
  </tr>
  <tr>
    <td>
      <div className="cart-info">
        <img src={`${API_URL}${item.name}`} alt="dd"></img>
        <div>
          {/* <p>{item.name}</p> */
}
//           <small>{item.price} ron</small>
//           <br></br>

//           <div
//             className="remove"
//             onClick={() => removeFromCartHandle(item.product)}
//           >
//             REMOVE
//           </div>
//         </div>
//       </div>
//     </td>
//     <td>
//       <select
//         value={item.qty}
//         onChange={(e) => {
//           dispatch(
//             addToCart(item.product, Number(e.target.value))
//           );
//         }}
//       >
//         {[...Array(item.countInStock).keys()].map((x) => (
//           <option
//             key={x + 1}
//             value={x + 1}
//             style={{ color: "black" }}
//           >
//             {x + 1}
//           </option>
//         ))}
//       </select>{" "}
//     </td>
//     <td>{item.price * item.qty}</td>
//   </tr>
// </table>
// </div> */}
