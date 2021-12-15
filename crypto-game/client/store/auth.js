import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_COINS = "UPDATE_COINS";
const UPDATE_HODL_COINS = "UPDATE_HODL_COINS";
const SWAP_PROFILE = "SWAP_PROFILE";
/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _updateCoins = (auth) => ({ type: UPDATE_COINS, auth });
const _updateHodlCoins = (auth) => ({ type: UPDATE_HODL_COINS, auth });
const swapProfile = (auth) => ({ type: SWAP_PROFILE, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const updateCoins = (auth) => {
  return async (dispatch) => {
    const { data: updatedCoinAmount } = await axios.put(
      `/api/users/${auth.id}`,
      auth
    );
    dispatch(_updateCoins(updatedCoinAmount));
  };
};

export const updateHodlCoins = (auth) => {
  return async (dispatch) => {
    const { data: updatedHodlCoinAmount } = await axios.put(
      `/api/users/${auth.id}`,
      auth
    );
    dispatch(_updateHodlCoins(updatedHodlCoinAmount));
  };
};

//Swap the profile with a purchased product
export const swapAuthProfile = (profile) => {
  return async (dispatch) => {
    // getState（）safest way to get the state
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await axios.put(
        "/api/users",
        { profile },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return dispatch(swapProfile(res.data));
    }
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_COINS:
      return action.auth;
    case UPDATE_HODL_COINS:
      return action.auth;
    case SWAP_PROFILE:
      return action.auth;
    default:
      return state;
  }
}
