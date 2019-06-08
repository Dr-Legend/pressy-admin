import { MemberInfoDto } from "../../client/model/memberInfoDto";


export interface SelectedMemberState {
  isLoading: boolean;
  selectedMember?: MemberInfoDto;
}

export let initialState: SelectedMemberState = {
  isLoading: false
};