import { AuthState } from "./auth-state";
import { MembersState } from "./members-state";


export interface AppState {
  auth: AuthState;
  members: MembersState;
}