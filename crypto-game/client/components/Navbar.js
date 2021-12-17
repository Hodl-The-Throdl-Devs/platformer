import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

// import homeButton from "assetsUI/buttons/buttonHome.png";
// import playButton from "../../public/assetsUI/buttons/button_play.png";
// import shopButton from "../../public/assetsUI/buttons/button_shop.png";
// import accountButton from "../../public/assetsUI/buttons/button_account.png";

// const homeButton = "https://imgur.com/ely84EM";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div id="navdiv">
    <h1>hodl the throdl!</h1>
    <p>developed by: Alex, Spencer, Riviere, and Luna</p>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="menubuttons">
            Home
          </Link>
          <Link to="/game" className="menubuttons">
            Game
          </Link>
          <Link to="/shop" className="menubuttons">
            Shop
          </Link>
          <Link to="/account" className="menubuttons">
            Account
          </Link>
          <a href="#" onClick={handleClick} className="logoutbutton">
            Logout
          </a>
          <p>Hodl Coins: {auth.hodlCoins}</p>
          <br />
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="menubuttons">
            Login
          </Link>
          <Link
            to="/signup"
            className="menubuttons"
            onClick={() => {
              alert("Remember not to use the same password you use elsewhere!");
            }}
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
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
