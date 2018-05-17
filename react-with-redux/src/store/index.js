import { createStore, applyMiddleware } from "redux";
import reducers  from './reducers';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

const middlewares = [
    promise(),
    thunk
  ];

export const getStore = () =>
createStore(
    reducers, 
    applyMiddleware(...middlewares)
);