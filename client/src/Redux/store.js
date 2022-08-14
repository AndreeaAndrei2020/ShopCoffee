import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {  productListReducer,productDetailsReducer, foodListReducer, foodDetailsReducer, giftListReducer, giftDetailsReducer, coursesListReducer, courseDetailsReducer, equipmentListReducer, equipmentDetailsReducer } from './Reducers/ProductReducers';
import { cartReducer } from './Reducers/CartReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './Reducers/OrderReducers';

const reducer = combineReducers({
    productList : productListReducer,
    foodList: foodListReducer,
    coursesList: coursesListReducer,
    giftList : giftListReducer,
    productDetails: productDetailsReducer,
    foodDetails: foodDetailsReducer,
    giftDetails: giftDetailsReducer,
    cart: cartReducer,
    courseDetails: courseDetailsReducer,

    equipmentList : equipmentListReducer,
    equipmentDetails : equipmentDetailsReducer,
    
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
})

const cartItemsFormLocalStorage = localStorage.getItem("cartItems") 
? JSON.parse(localStorage.getItem("cartItems"))
: [];

//login
const userInfoFromLocalStorage = localStorage.getItem("userInfo") 
? JSON.parse(localStorage.getItem("userInfo"))
: null;


//shippingAddress
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") 
? JSON.parse(localStorage.getItem("shippingAddress"))  ///shippingAddress din cartACtions
: {};



const initialState = {
    cart: {
        cartItems : cartItemsFormLocalStorage,
        shippingAddress : shippingAddressFromLocalStorage
    },
    userLogin:{userInfo: userInfoFromLocalStorage}
} 

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;