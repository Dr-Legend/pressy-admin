import { IAction } from "..";
import { MemberInfoDto } from "../../client/model/memberInfoDto";


export type SelectedMemberAction = SelectedMemberSetLoadingAction
  | SelectedMemberSetMemberAction;

interface SelectedMemberSetLoadingAction extends IAction {
  type: "SELECTED_MEMBER_SET_LOADING_ACTION";
  isLoading: boolean;
}

interface SelectedMemberSetMemberAction extends IAction {
  type: "SELECTED_MEMBER_SET_MEMBER_ACTION";
  member: MemberInfoDto;
}