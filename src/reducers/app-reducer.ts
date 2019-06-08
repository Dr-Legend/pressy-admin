import { combineReducers } from "redux";
import { AppState } from "../states/app-state";
import { authReducer } from "./auth-reducer";
import { membersReducer } from "./members-reducer";


export let appReducer = combineReducers<AppState>({
  auth: authReducer,
  members: membersReducer
});