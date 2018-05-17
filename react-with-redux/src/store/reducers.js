// @flow
import { combineReducers } from "redux";
import todoReducer from '../containers/reducer';



export default combineReducers({
  todoList: todoReducer,
});
