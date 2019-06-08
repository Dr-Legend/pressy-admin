

export interface LoginState {
  email?: string;
  password?: string;
}

export let initialState: LoginState = {
  password: undefined,
  email: undefined
};