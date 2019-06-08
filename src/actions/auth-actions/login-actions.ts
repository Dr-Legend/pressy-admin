import { IAction } from "..";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../states/app-state";
import { Container } from "inversify";
import { AuthAction, ACCESS_TOKEN_STORAGE_KEY } from ".";


export type LoginAction = LoginSetEmailAction
  | LoginSetPasswordAction;

interface LoginSetEmailAction extends IAction {
  type: "LOGIN_SET_EMAIL_ACTION";
  email: string;
}

interface LoginSetPasswordAction extends IAction {
  type: "LOGIN_SET_PASSWORD_ACTION";
  password: string;
}

type LoginAsyncAction = ThunkAction<void, AppState, Container, AuthAction>;

export function logout(): LoginAsyncAction {
  return dispatch => {
    dispatch({ type: "SET_AUTH_LOADING", isLoading: true });
    dispatch({ type: "SET_LOGGED_OUT" });
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
  }
}