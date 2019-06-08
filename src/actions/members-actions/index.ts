import { IAction } from "..";
import { MemberInfoDto } from "../../client/model/memberInfoDto";
import { SelectedMemberAction } from "./selected-member-actions";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../states/app-state";
import { Container } from "inversify";
import { MembersService } from "../../client/api/members.service";
import { TYPES } from "../../client/variables";


export type MembersAction = MembersSetLoadingAction
  | MembersSetMemberListAction
  | MembersSetVisibleMemberListAction
  | SelectedMemberAction;

interface MembersSetLoadingAction extends IAction {
  type: "MEMBERS_SET_LOADING_ACTION";
  isLoading: boolean;
}

interface MembersSetMemberListAction extends IAction {
  type: "MEMBERS_SET_MEMBER_LIST_ACTION";
  members: MemberInfoDto[];
}

interface MembersSetVisibleMemberListAction extends IAction {
  type: "MEMBERS_SET_VISIBLE_MEMBER_LIST_ACTION";
  visibleMembers: MemberInfoDto[];
}

type MembersAsyncAction = ThunkAction<void, AppState, Container, MembersAction>;

export function loadMembers(): MembersAsyncAction {
  return async (dispatch, _, container) => {
    dispatch({ type: "MEMBERS_SET_LOADING_ACTION", isLoading: true });
    let membersService = container.get<MembersService>(TYPES.MembersService);
    let members = await membersService.memberGetAllMembers().toPromise();
    members = members.sort((lhs, rhs) => lhs.id - rhs.id);
    dispatch({ type: "MEMBERS_SET_LOADING_ACTION", isLoading: false });
    dispatch({ type: "MEMBERS_SET_MEMBER_LIST_ACTION", members });
    dispatch({ type: "MEMBERS_SET_VISIBLE_MEMBER_LIST_ACTION", visibleMembers: members });
  };
}

export function filterMembersWithConstraint(constraint: string): MembersAsyncAction {
  return (dispatch, getState) => {
    dispatch({ type: "MEMBERS_SET_LOADING_ACTION", isLoading: true });
    let members = getState().members.members;
    if (members) {
      let visibleMembers = members.filter(member => {
        return member.id.toString().toLowerCase().includes(constraint) 
          || member.firstName.toLowerCase().includes(constraint) 
          || member.lastName.toLowerCase().includes(constraint) 
          || member.email.toLowerCase().includes(constraint) 
          || member.phone.toLowerCase().includes(constraint);
      });
      dispatch({ type: "MEMBERS_SET_VISIBLE_MEMBER_LIST_ACTION", visibleMembers });
      dispatch({ type: "MEMBERS_SET_LOADING_ACTION", isLoading: false });
    }
  };
}