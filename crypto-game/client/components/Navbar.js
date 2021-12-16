import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div id="navdiv">
    <h1>hodl the throdl</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/account">Account</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <p>Hodl Coins: {auth.hodlCoins}</p>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link
            to="/signup"
            onClick={() => {
              alert("Remember not to use the same password you use elsewhere!");
            }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
