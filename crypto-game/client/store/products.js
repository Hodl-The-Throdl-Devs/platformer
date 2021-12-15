import axios from "axios";

const TOKEN = "token";

const SET_PRODUCTS = "SET_PRODUCTS";
const CREATE_PRODUCT = "CREATE_PRODUCT";
const DESTROY_PRODUCT = "DESTROY_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const _createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const _destroyProduct = (product) => {
  return {
    type: DESTROY_PRODUCT,
    product,
  };
};

const _updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
};

///////////////////// THUNK CREATOR ///////////////////////
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    dispatch(_setProducts(data));
  };
};

export const createProduct = (productInfo) => {
  return async (dispatch) => {
    console.log(productInfo);
    try {
      const { data } = await axios.post("/api/products", productInfo);
      dispatch(_createProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (productInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/products/${productInfo.id}`,
        productInfo
      );
      dispatch(_updateProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyProduct = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/products/${id}`, {
        headers: { authorization: token },
      });
      dispatch(_destroyProduct({ id: id * 1 }));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];

    case UPDATE_PRODUCT:
      return [
        ...state,
        state.map((product) =>
          product.id === action.product.id ? action.product : product
        ),
      ];
    case DESTROY_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);

    default:
      return state;
  }
};