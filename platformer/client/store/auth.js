import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const ADD_COINS = "ADD_COINS";
const ZERO_OUT_COINS = "ZERO_OUT_COINS"

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const addCoins = (auth) => ({ type: ADD_COINS, auth });
const zeroOutCoins = (auth) => ({type: ZERO_OUT_COINS, auth});



/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

export const addCoinsToAccount = (auth) => {
  return async (dispatch) => {
    const { data: updatedCoinAmount } = await axios.put(`/api/users/${auth.id}`, auth);
    dispatch(addCoins(updatedCoinAmount));
  };
};

// Written this way if we wanted to eventually flex this to a reduction of any amount rather than just zeroing out.
export const zeroOutCoins = (auth) => {
  return async (dispatch) => {
    const {data: zeroedCoinAmount} = await axios.put(`/api/users/${auth.id}`, auth);
    dispatch(zeroOutCoins(zeroedCoinAmount));
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case ADD_COINS:
      return action.auth
    case ZERO_OUT_COINS:
      return action.auth
    default:
      return state
  }
}
