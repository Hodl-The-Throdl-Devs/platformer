const SET_CONTRACTS = "SET_CONTRACTS";

const _setContracts = (contracts) => {
  return {
    type: SET_CONTRACTS,
    contracts,
  };
};

export const setContracts = (contracts) => {
  return async (dispatch) => {
    dispatch(_setContracts(contracts));
  };
};

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTRACTS:
      return action.contracts;
    default:
      return state;
  }
};
