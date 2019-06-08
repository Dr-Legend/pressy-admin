import { AuthState, initialState } from "../../states/auth-state";
import { AuthAction } from "../../actions/auth-actions";
import { loginReducer } from "./login-reducer";


export function authReducer(state: AuthState = initialState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_AUTH_LOADING":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.accessToken
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isAuthenticated: false,
        accessToken: undefined
      };
    case "LOGIN_SET_EMAIL_ACTION":
    case "LOGIN_SET_PASSWORD_ACTION":
      return {
        ...state,
        login: loginReducer(state.login, action)
      };
  }
  return state;
}