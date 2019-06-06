import { IAction } from "..";


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