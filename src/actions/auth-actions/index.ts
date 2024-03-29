import { ThunkAction } from "redux-thunk";
import { Container } from "inversify";
import { IAction } from "..";
import { AppState } from "../../states/app-state";
import { AuthCredentialsDto } from "../../client/model/authCredentialsDto";
import { AuthenticationService } from "../../client/api/authentication.service";
import { TYPES } from "../../client/variables";
import { LoginAction } from "./login-actions";
import { IAPIConfiguration } from "../../client/IAPIConfiguration";

export type AuthAction = SetAuthLoadingAction
  | SetLoggedInAction
  | SetLoggedOutAction
  | LoginAction;

interface SetAuthLoadingAction extends IAction {
  type: "SET_AUTH_LOADING";
  isLoading: boolean;
}

interface SetLoggedInAction extends IAction {
  type: "SET_LOGGED_IN";
  accessToken: string;
}

interface SetLoggedOutAction extends IAction {
  type: "SET_LOGGED_OUT";
}

type AuthAsyncAction = ThunkAction<void, AppState, Container, AuthAction>;
export let ACCESS_TOKEN_STORAGE_KEY = "@PRESSY/ACCESS_TOKEN";

export function initializeAuth(): AuthAsyncAction {
  return async (dispatch, _, container) => {
    dispatch({ type: "SET_AUTH_LOADING", isLoading: true });
    let accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
    if (!accessToken) {
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      dispatch({ type: "SET_LOGGED_OUT" });
      return;
    }
    let authCredentials: AuthCredentialsDto = JSON.parse(accessToken);
    let authService = container.get<AuthenticationService>(TYPES.AuthenticationService);
    let freshCredentials = await authService.authRefreshCredentials({
      refreshToken: authCredentials.refreshToken
    });
    let apiConfiguration = container.get<IAPIConfiguration>(TYPES.IAPIConfiguration);
    apiConfiguration.apiKeys = {
      Authorization: `Bearer ${freshCredentials.accessToken}`
    };
    dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
    dispatch({ type: "SET_LOGGED_IN", accessToken: freshCredentials.accessToken });
  }
}


export function setEmail(email: string): AuthAsyncAction {
  return dispatch => {
    dispatch({ type: "LOGIN_SET_EMAIL_ACTION", email: email });
  }
}

export function setPassword(password: string): AuthAsyncAction {
  return dispatch => {
    dispatch({ type: "LOGIN_SET_PASSWORD_ACTION", password: password });
  }
}

export function login(): AuthAsyncAction {
  return async (dispatch, getState, container) => {
    let authService = container.get<AuthenticationService>(TYPES.AuthenticationService);
    let { email, password } = getState().auth.login;
    if (!email || !password || email.length === 0 || password.length === 0) {
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      alert("Un ou plusieurs champs sont vides");
      return;
    }
    try {
      let response = await authService.authLogin({
        email: email,
        password: password
      });
      console.log(response);
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, JSON.stringify(response));
      console.log(response);
      let apiConfiguration = container.get<IAPIConfiguration>(TYPES.IAPIConfiguration);
      console.log(response);
      apiConfiguration.apiKeys = {
        Authorization: `Bearer ${response.accessToken}`
      };
      console.log(response);
      dispatch({ type: "SET_LOGGED_IN", accessToken: response.accessToken });
      console.log(response);
    } catch (exception) {
      console.log(exception);
      alert(JSON.stringify(exception, null, 2));
      console.log(exception);
    } finally {
      console.log("finally");
      dispatch({ type: "SET_AUTH_LOADING", isLoading: false });
      console.log("finally");
    }
    console.log("done");
  }
}