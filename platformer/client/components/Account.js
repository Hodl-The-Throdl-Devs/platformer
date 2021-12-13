import React from 'react'
import {connect} from 'react-redux'

import { zeroOutCoins } from "../store";


/**
 * COMPONENT
 */
export const Account = props => {
  const {username} = props

  return (
    <div>
      Account page.
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Account)
