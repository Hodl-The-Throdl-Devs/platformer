import axios from "axios";

const TOKEN = "token";

const GET_PURCHASED = "GET_PURCHASED"; // for a single user
const PURCHASE_PRODUCT = "URCHASE_PRODUCT"; 

const _getPurchased = (products) => {
    return {
      type: GET_PURCHASED,
      products,
    };
  };


const _purchaseProduct = (product) => {
  return {
    type: PURCHASE_PRODUCT,
    product,
  };
};

///////////////////// THUNK CREATOR ///////////////////////

//get all the purchased items for one user
export const purchaseProduct = (productInfo) => {
    return async (dispatch) => {
      console.log(productInfo);
      try {
        const { data } = await axios.post("/api/products", productInfo);
        dispatch(_purchaseProduct(data));
      } catch (err) {
        console.log(err);
      }
    };
  };

//purchase single product
export const purchaseProduct = (productInfo) => {
  return async (dispatch) => {
    console.log(productInfo);
    try {
      const { data } = await axios.post("/api/products", productInfo);
      dispatch(_purchaseProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};


const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {  
    case GET_PURCHASED:
        return [action.product]

    case PURCHASE_PRODUCT:
    return [...state, action.product];  // add to the list of the purchased characters of the user

    default:
      return state;
  }
};
 