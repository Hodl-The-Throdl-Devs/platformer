import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import character from './character'
import products from './products'
import web3Props from "./web3Props";

const reducer = combineReducers({ auth, products, web3Props, character})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store
export * from './auth'
export * from "./products"
export * from "./web3Props";
export * from "./character";