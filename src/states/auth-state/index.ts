import { LoginState, initialState as LoginStateInitialState } from "./login-state";


export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken?: string;
  login: LoginState;
}

export let initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  accessToken: undefined,
  login: LoginStateInitialState
};