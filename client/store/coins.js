import axios from "axios";
import history from "../history";

/**
 * ACTION TYPES
 */
const ADD_COINS = "ADD_COINS";

/**
 * ACTION CREATORS
 */
const addCoins = (user) => ({ type: ADD_COINS, user });

/**
 * THUNK CREATORS
 */
export const addCoinsToAccount = (user) => {
  return async (dispatch) => {
    const { data: updatedCoinAmount } = await axios.put(`/api/users/${user.id}`, user);
    dispatch(addCoins(updatedCoinAmount));
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case ADD_COINS:
      return action.user;
    default:
      return state;
  }
}
