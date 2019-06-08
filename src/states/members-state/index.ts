import { MemberInfoDto } from "../../client/model/memberInfoDto";
import { SelectedMemberState, initialState as SelectedMemberStateInitialState } from "./selected-member-state";


export interface MembersState {
  isLoading: boolean;
  members?: MemberInfoDto[];
  visibleMembers?: MemberInfoDto[];
  selectedMemberState: SelectedMemberState;
}

export let initialState: MembersState = {
  isLoading: false,
  selectedMemberState: SelectedMemberStateInitialState
};