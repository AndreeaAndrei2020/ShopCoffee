import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {  productListReducer,productDetailsReducer } from './Reducers/ProductReducers';
import { cartReducer } from './Reducers/CartReducers';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const cartItemsFormLocalStorage = localStorage.getItem("cartItems") 
? JSON.parse(localStorage.getItem("cartItems"))
: [];
console.log("1111fff",cartItemsFormLocalStorage)

const initialState = {
    cart: {
        cartItems : cartItemsFormLocalStorage,
    }
} 

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store;