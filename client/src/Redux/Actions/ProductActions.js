import axios from "axios";
import {
  FOOD_DETAILS_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductConstants";

const API_URL = process.env.REACT_APP_API_URL;

// PRODUCT LIST
export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/drinks`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

  } catch (error) {
    console.log("error" ,error)
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/drinks/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error" ,error)
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// FOOOOOOOOOOOOOOOOOOOD 
// PRODUCT LIST
export const listFood = () => async (dispatch) => {
  try {
    dispatch({ type: FOOD_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/food`);

    dispatch({ type: FOOD_LIST_SUCCESS, payload: data });

  } catch (error) {
    console.log("error" ,error)
    dispatch({
      type: FOOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// SINGLE FOOD
export const listFoodDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOOD_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/food/${id}`);
    dispatch({ type: FOOD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error" ,error)
    dispatch({
      type: FOOD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
