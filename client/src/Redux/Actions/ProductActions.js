import axios from "axios";
import {
  COURSES_DETAILS_FAIL,
  COURSES_DETAILS_REQUEST,
  COURSES_DETAILS_SUCCESS,
  COURSES_LIST_FAIL,
  COURSES_LIST_REQUEST,
  COURSES_LIST_SUCCESS,
  EQUIPMENT_DETAILS_FAIL,
  EQUIPMENT_DETAILS_REQUEST,
  EQUIPMENT_DETAILS_SUCCESS,
  EQUIPMENT_LIST_FAIL,
  EQUIPMENT_LIST_REQUEST,
  EQUIPMENT_LIST_SUCCESS,
  FOOD_DETAILS_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  GIFT_DETAILS_FAIL,
  GIFT_DETAILS_REQUEST,
  GIFT_DETAILS_SUCCESS,
  GIFT_LIST_FAIL,
  GIFT_LIST_REQUEST,
  GIFT_LIST_SUCCESS,
  DRINK_DETAILS_FAIL,
  DRINK_DETAILS_REQUEST,
  DRINK_DETAILS_SUCCESS,
  DRINK_LIST_FAIL,
  DRINK_LIST_REQUEST,
  DRINK_LIST_SUCCESS,
} from "../Constants/ProductConstants";

const API_URL = process.env.REACT_APP_API_URL;

// DRINK LIST
export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: DRINK_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/drinks`);
    dispatch({ type: DRINK_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: DRINK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE DRINK
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DRINK_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/drinks/${id}`);
    dispatch({ type: DRINK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: DRINK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// FOOOOOOOOOOOOOOOOOOOD
// DRINK LIST
export const listFood = () => async (dispatch) => {
  try {
    dispatch({ type: FOOD_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/food`);

    dispatch({ type: FOOD_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: FOOD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// BARISTA COURSES BARISTA LIST
export const listCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSES_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/baristaCourses`);

    dispatch({ type: COURSES_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: COURSES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GIIIIFT
// GIFT CARD LIST
export const listGiftCards = () => async (dispatch) => {
  try {
    dispatch({ type: GIFT_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/giftCards`);
    dispatch({ type: GIFT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GIFT_LIST_FAIL,
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
    console.log("error", error);
    dispatch({
      type: FOOD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE GIFT
export const listGiftDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GIFT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/giftCards/${id}`);
    dispatch({ type: GIFT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: GIFT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE baristaCourses
export const listCoursesDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSES_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/baristaCourses/${id}`);
    dispatch({ type: COURSES_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: COURSES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE EQUIPMENT
export const listEquipmentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EQUIPMENT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/equipment/${id}`);
    dispatch({ type: EQUIPMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: EQUIPMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// EQUIPMENT LIST
export const listEquipment = () => async (dispatch) => {
  try {
    dispatch({ type: EQUIPMENT_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/equipment`);

    dispatch({ type: EQUIPMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: EQUIPMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
