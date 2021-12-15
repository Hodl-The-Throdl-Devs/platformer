import React from 'react'
import {connect} from 'react-redux'
import CharacterBoard from './CharacterBoard';

import { updateCoins } from "../store";

/**
 * COMPONENT
 */
export const Account = props => {
  const {auth, updateCoins, web3Props} = props

  const convertCoins = () => {
    console.log(`Your coins before: ${auth.coins}`)
    auth.coins = 0
    updateCoins(auth);
    console.log(`Your coins after: ${auth.coins}`)
  }

  return (
    <div>
      Account page.
      <button onClick={convertCoins}>Convert coins to tokens!</button>
      <CharacterBoard />
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
    updateCoins: (auth) => dispatch(updateCoins(auth)),
  };
};


export default connect(mapState, mapDispatch)(Account)