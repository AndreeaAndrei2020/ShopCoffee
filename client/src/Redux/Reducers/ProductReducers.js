import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  FOOD_LIST_REQUEST,
  FOOD_LIST_SUCCESS,
  FOOD_LIST_FAIL,
  FOOD_DETAILS_REQUEST,
  FOOD_DETAILS_SUCCESS,
  FOOD_DETAILS_FAIL,
  GIFT_LIST_REQUEST,
  GIFT_LIST_SUCCESS,
  GIFT_LIST_FAIL,
  GIFT_DETAILS_SUCCESS,
  GIFT_DETAILS_FAIL,
  GIFT_DETAILS_REQUEST,
  COURSES_LIST_REQUEST,
  COURSES_LIST_SUCCESS,
  COURSES_LIST_FAIL,
  COURSES_DETAILS_REQUEST,
  COURSES_DETAILS_SUCCESS,
  COURSES_DETAILS_FAIL,
  EQUIPMENT_LIST_REQUEST,
  EQUIPMENT_LIST_SUCCESS,
  EQUIPMENT_LIST_FAIL,
  EQUIPMENT_DETAILS_REQUEST,
  EQUIPMENT_DETAILS_SUCCESS,
  EQUIPMENT_DETAILS_FAIL
} from "../Constants/ProductConstants";


//PRODUCT LIST
export const productListReducer = (state = { products:[] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//COURSES LIST
export const coursesListReducer = (state = { courses:[] }, action) => {
  switch (action.type) {
    case COURSES_LIST_REQUEST:
      return { loading: true, courses: [] };
    case COURSES_LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case COURSES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


//FOOD LIST
export const foodListReducer = (state = { food:[] }, action) => {
  switch (action.type) {
    case FOOD_LIST_REQUEST:
      return { loading: true, food: [] };
    case FOOD_LIST_SUCCESS:
      return { loading: false, food: action.payload };
    case FOOD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//GIFT LIST
export const giftListReducer = (state = { gift:[] }, action) => {
  switch (action.type) {
    case GIFT_LIST_REQUEST:
      return { loading: true, gift: [] };
    case GIFT_LIST_SUCCESS:
      return { loading: false, gift: action.payload };
    case GIFT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



//EQUIPMENT LIST
export const equipmentListReducer = (state = { equipment:[] }, action) => {
  switch (action.type) {
    case EQUIPMENT_LIST_REQUEST:
      return { loading: true, equipment: [] };
    case EQUIPMENT_LIST_SUCCESS:
      return { loading: false, equipment: action.payload };
    case EQUIPMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//SINGLE PRODUCT 
export const productDetailsReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state ,loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//SINGLE FOOD 
export const foodDetailsReducer = (state = { food: [] }, action) => {
  switch (action.type) {
    case FOOD_DETAILS_REQUEST:
      return { ...state ,loading: true };
    case FOOD_DETAILS_SUCCESS:
      return { loading: false, food: action.payload };
    case FOOD_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

///SINGLE GIFT
export const giftDetailsReducer = (state = { gift: [] }, action) => {
  switch (action.type) {
    case GIFT_DETAILS_REQUEST:
      return { ...state ,loading: true };
    case GIFT_DETAILS_SUCCESS:
      return { loading: false, gift: action.payload };
    case GIFT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


///SINGLE COURSE
export const courseDetailsReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case COURSES_DETAILS_REQUEST:
      return { ...state ,loading: true };
    case COURSES_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case COURSES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

///SINGLE COURSE
export const equipmentDetailsReducer = (state = { equipment: [] }, action) => {
  switch (action.type) {
    case EQUIPMENT_DETAILS_REQUEST:
      return { ...state ,loading: true };
    case EQUIPMENT_DETAILS_SUCCESS:
      return { loading: false, equipment: action.payload };
    case EQUIPMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


