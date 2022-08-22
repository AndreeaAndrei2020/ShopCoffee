import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  foodListReducer,
  foodDetailsReducer,
  giftListReducer,
  giftDetailsReducer,
  coursesListReducer,
  courseDetailsReducer,
  equipmentListReducer,
  equipmentDetailsReducer,
} from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer
} from "./Reducers/OrderReducers";

const reducer = combineReducers({
  cart: cartReducer,

  drinksList: productListReducer,
  drinkDetails: productDetailsReducer,

  foodList: foodListReducer,
  foodDetails: foodDetailsReducer,

  coursesList: coursesListReducer,
  courseDetails: courseDetailsReducer,
  giftList: giftListReducer,

  giftDetails: giftDetailsReducer,

  equipmentList: equipmentListReducer,
  equipmentDetails: equipmentDetailsReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFormLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems")) ///daca gaseste in local storage, le face parse si baga in store
  : [];
const totalPriceFormLocalStorage = localStorage.getItem("totalPrice")
  ? JSON.parse(localStorage.getItem("totalPrice"))
  : [];

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress")) ///shippingAddress din cartACtions
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFormLocalStorage,
    totalPrice: totalPriceFormLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
