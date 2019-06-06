import { LoginState } from "./login-state";


export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken?: string;
  login: LoginState;
}