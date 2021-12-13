import React from 'react'
import {connect} from 'react-redux'

import { zeroOutCoins } from "../store";

/**
 * COMPONENT
 */
export const Account = props => {
  const {auth, zeroOutCoins} = props

  const convertCoins = () => {
    console.log(`Your coins before: ${auth.coins}`)
    auth.coins = 0
    zeroOutCoins(auth);
    console.log(`Your coins after: ${auth.coins}`)
  }


  return (
    <div>
      Account page.
      <button onClick={convertCoins}>Convert coins to tokens!</button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatch = dispatch => {
  return {
    zeroOutCoins: (auth) => dispatch(zeroOutCoins(auth)),
  };
};


export default connect(mapState, mapDispatch)(Account)
