import { LoginState, initialState } from "../../states/auth-state/login-state";
import { LoginAction } from "../../actions/auth-actions/login-actions";


export function loginReducer(state: LoginState = initialState, action: LoginAction): LoginState {
  switch (action.type) {
    case "LOGIN_SET_EMAIL_ACTION":
      return {
        ...state,
        email: action.email
      };
    case "LOGIN_SET_PASSWORD_ACTION":
      return {
        ...state,
        password: action.password
      };
  }
  return state;
}