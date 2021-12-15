import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseCharacter } from "../store";

class CharacterBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { auth, products, character } = this.props;
    const myCharacters = products.filter((prod) => prod.userId === auth.id);

    return (
      <div>
        {myCharacters.map((ch) => {
          return (
            <img
              src={`/sprites/${ch.imageURL}`}
              key={ch.id}
              onClick={() => console.log(ch.name)}
              className="characters"
            />
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
    character: state.character,
  };
};

const mapDispatch = (dispatch) => {
  return {
    chooseCharacter() {
      dispatch(chooseCharacter());
    },
  };
};

export default connect(mapState, mapDispatch)(CharacterBoard);
