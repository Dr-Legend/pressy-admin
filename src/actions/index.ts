import { Action } from "redux";

export interface IAction extends Action<string> {
  [key: string]: any;
}