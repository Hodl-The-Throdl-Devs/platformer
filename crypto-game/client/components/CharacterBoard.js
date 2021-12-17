import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { chooseCharacter } from "../store";

import { Grid, Typography, Box } from "@mui/material";

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
        <br />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Grid
            container
            alignItems="center"
            item
            xs={12}
            sm={8}
            spacing={3}
            sx={{ m: 0, mb: 18 }}
          >
            {myCharacters.map((ch) => {
              return (
                <Grid item xs={11} sm={6} md={4} lg={3} key={ch.id}>
                  <Link to="/game">
                    <img
                      src={`/spritesPixelAdventure/characters/previews/${ch.spritePreview}`}
                      onClick={() => chooseCharacter(ch)}
                      className="characters"
                    />
                    <h6>{ch.name}</h6>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Box>
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
