import axios from "axios";

const TOKEN = "token";

const PURCHASE_PRODUCT = "PURCHASE_PRODUCT"; //similar to "add to cart"
const SWAP_PRODUCT = "SWAP_PRODUCT"; //similar to "checkout"

const _purchaseProduct = (product) => {
  return {
    type: PURCHASE_PRODUCT,
    product,
  };
};

const _swapProduct = (product) => {
  return {
    type: SWAP_PRODUCT,
    product,
  };
};

///////////////////// THUNK CREATOR ///////////////////////


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

//swap profile to current product (Q: how to make the button change into swap after the user purchases it?)
export const swapProduct = (productInfo) => {
  return async (dispatch) => {
    console.log(productInfo);
    try {
      const { data } = await axios.put(
        `/api/products/${productInfo.id}`,
        productInfo
      );
      dispatch(_swapProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {  
    case PURCHASE_PRODUCT:
    return [...state, action.product];  // add to the list of the purchased characters of the user

    case SWAP_PRODUCT:
    return action.product; //swap for the profile

    default:
      return state;
  }
};


//purchase single product


//swap profile to current product