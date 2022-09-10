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
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./Reducers/userReducers";
import {
  orderCreateReducer,
  orderListMyReducer,
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
  userUpdateProfile: userUpdateProfileReducer,

  orderCreate: orderCreateReducer,
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
  
//Weather
const weatherAddressFromLocalStorage = localStorage.getItem("weather")
  ? JSON.parse(localStorage.getItem("weather")) ///shippingAddress din cartACtions
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFormLocalStorage,
    totalPrice: totalPriceFormLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    weather: weatherAddressFromLocalStorage,
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
