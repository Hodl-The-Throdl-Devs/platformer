const SET_WEB3_PROPS = "SET_WEB3_PROPS";

const _setWeb3Props = (web3Props) => {
  return {
    type: SET_WEB3_PROPS,
    web3Props,
  };
};

export const setWeb3Props = (web3Props) => {
  return async (dispatch) => {
    dispatch(_setWeb3Props(web3Props));
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WEB3_PROPS:
      return action.web3Props;
    default:
      return state;
  }
};