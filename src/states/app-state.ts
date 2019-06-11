import { AuthState } from "./auth-state";
import { MembersState } from "./members-state";
import { SlotsState } from "./slots-state";


export interface AppState {
  auth: AuthState;
  members: MembersState;
  slots: SlotsState;
}