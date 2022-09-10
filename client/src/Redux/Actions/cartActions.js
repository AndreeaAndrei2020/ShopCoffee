import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_WEATHER,
} from "../Constants/CartConstants";
const API_URL = process.env.REACT_APP_API_URL;

//ADD TO CART
export const addToCart =
  (id, qty, productName) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API_URL}/api/${productName}/${id}`);

    const apiKey = "98c355d73f22c6eb33c4bc0bd22031fe";
    const lat = 44.439663;
    const lon = 26.096306;

    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const json = await weather.json();
    const currentWeather = json.weather[0].main;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        title: data.name,
        name: data.image,
        lastName: data.lastName,
        price: data.price,
        countInStock: data.countInStock,
        typeOfProduct: productName,
        qty,
        weather: currentWeather,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

///ADD WEAHTER
export const addWeather = () => async (dispatch, getState) => {
  const apiKey = "98c355d73f22c6eb33c4bc0bd22031fe";

  const latitude = 44.439663;
  const longitude = 26.096306;

  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  const weatherJson = await weatherData.json();
  const weatherCondition =  weatherJson.weather[0].main;

  dispatch({
    type: CART_SAVE_WEATHER,
    payload: weatherCondition,
  });
  localStorage.setItem("weather", JSON.stringify(getState().cart.weather));
  
};

//REMOVE DRINK FROM CART
export const removefromcart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)); ///dupa ce am bagat in store cart Items curent, adaugam si in localStorage .
};

//SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

//SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
