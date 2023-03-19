import { createStore } from "redux";
import authReducer from "./Auth/authReducer";
import { combineReducers } from "redux";
import loaderReducer from "./Loader/loaderReducer";
import { modalReducer } from "./Modal/Reducer";
const rootReducer = combineReducers({
  loader: loaderReducer,
  modal: modalReducer,
  auth: authReducer,
});
const store = createStore(rootReducer);
export const Store = store;
