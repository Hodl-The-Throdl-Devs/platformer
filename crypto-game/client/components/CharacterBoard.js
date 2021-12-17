import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseCharacter } from "../store";

class CharacterBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { auth, products, chooseCharacter } = this.props;
    const myCharacters = products.filter(
      (prod) => prod.userId === auth.id || prod.name === "MaskDude"
    );

    return (
      <div>
        {myCharacters.map((ch) => {
          return (
            <Link to="/game" key={ch.id}>
              <img
                src={`/spritesPixelAdventure/characters/previews/${ch.spritePreview}`}
                onClick={() => chooseCharacter(ch)}
                className="characters"
              />
              <h6>{ch.name}</h6>
            </Link>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    chooseCharacter(character) {
      dispatch(chooseCharacter(character));
    },
  };
};

export default connect(mapState, mapDispatch)(CharacterBoard);
