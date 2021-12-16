import axios from "axios";

const TOKEN = "token";

const SET_ASSETS = "SET_ASSETS";
const CREATE_ASSET = "CREATE_ASSET";
const DESTROY_ASSET = "DESTROY_ASSET";
const UPDATE_ASSET = "UPDATE_ASSET";

const _setAssets = (assets) => {
  return {
    type: SET_ASSETS,
    assets,
  };
};

const _createAsset = (asset) => {
  return {
    type: CREATE_ASSET,
    asset,
  };
};

const _destroyAsset = (asset) => {
  return {
    type: DESTROY_ASSET,
    asset,
  };
};

const _updateAsset = (asset) => {
  return {
    type: UPDATE_ASSET,
    asset,
  };
};

///////////////////// THUNK CREATOR ///////////////////////
export const fetchAssets = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/assets");
    dispatch(_setAssets(data));
  };
};

export const createAsset = (assetInfo) => {
  return async (dispatch) => {
    console.log(assetInfo);
    try {
      const { data } = await axios.post("/api/assets", assetInfo);
      dispatch(_createAsset(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateAsset = (assetInfo) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/assets/${assetInfo.id}`,
        assetInfo
      );
      dispatch(_updateAsset(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const destroyAsset = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/assets/${id}`, {
        headers: { authorization: token },
      });
      dispatch(_destroyAsset({ id: id * 1 }));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSETS:
      return action.assets;
    case CREATE_ASSET:
      return [...state, action.asset];

    case UPDATE_ASSET:
      return [
        ...state,
        state.map((asset) =>
          asset.id === action.asset.id ? action.asset : asset
        ),
      ];
    case DESTROY_ASSET:
      return state.filter((asset) => asset.id !== action.asset.id);

    default:
      return state;
  }
};
