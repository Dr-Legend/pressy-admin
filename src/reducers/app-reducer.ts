import { combineReducers } from "redux";
import { AppState } from "../states/app-state";
import { authReducer } from "./auth-reducer";


export let appReducer = combineReducers<AppState>({
  auth: authReducer
});