import axios from "axios";

import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../Constants/CartConstants'
const API_URL = process.env.REACT_APP_API_URL;

//ADD TO CART
export const addToCart = (id,qty) => async (dispatch , getState ) => {
    const { data } = await axios.get(`${API_URL}/api/drinks/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.image,
            price: data.price,
            countInStock : data.countInStock,
            qty
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

//REMOVE PRODUCT FROM CART
export const removefromcart = (id) => (dispatch,getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}