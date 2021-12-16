const CHOOSE_CHARACTER = "CHOOSE_CHARACTER";

const selectCharacter = (character) => {
  return {
    type: CHOOSE_CHARACTER,
    character,
  };
};

export const chooseCharacter = (character) => {
  return (dispatch) => {
    dispatch(selectCharacter(character));
  };
};

// const initialState = "bean";

const initialState = {
  id: 0,
  name: "MaskDude",
  spritePreview: "MaskDude_Preview.png",
  spriteSheet: "MaskDude_Sheet.png",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_CHARACTER:
      return action.character;
    default:
      return state;
  }
};
