import { IAction } from "..";
import { MemberInfoDto } from "../../client/model/memberInfoDto";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../states/app-state";
import { Container } from "inversify";
import { MembersService } from "../../client/api/members.service";
import { TYPES } from "../../client/variables";


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

/* TODO: Decomment when update member profile is implemented on the server
interface SelectedMemberSetEmailAction extends IAction {
  type: "SELECTED_MEMBER_SET_EMAIL_ACTION";
  email: string;
}

interface SelectedMemberSetPhoneAction extends IAction {
  type: "SELECTED_MEMBER_SET_PHONE_ACTION";
  phone: string;
}

interface SelectedMemberSetFirstNameAction extends IAction {
  type: "SELECTED_MEMBER_SET_FIRST_NAME_ACTION";
  firstName: string;
}

interface SelectedMemberSetLastNameAction extends IAction {
  type: "SELECTED_MEMBER_SET_LAST_NAME_ACTION";
  lastName: string;
}
*/

type SelectedMemberAsyncAction = ThunkAction<void, AppState, Container, SelectedMemberAction>; 

export function loadMemberProfile(id: string): SelectedMemberAsyncAction {
  return async (dispatch, getState, container) => {
    dispatch({ type: "SELECTED_MEMBER_SET_LOADING_ACTION", isLoading: true });
    let member: MemberInfoDto | undefined;
    if (getState().members.members) {
      member = getState().members.members.find(member => member.id.toString() === id);
      if (!member) {
        dispatch({ type: "SELECTED_MEMBER_SET_LOADING_ACTION", isLoading: false });
        alert(`Membre nº ${id} non trouvé`);
        return
      }
    }
    try {
      let membersService = container.get<MembersService>(TYPES.MembersService);
      member = await membersService.memberGetMember(Number(id));
    } catch {
      dispatch({ type: "SELECTED_MEMBER_SET_LOADING_ACTION", isLoading: false });
      alert(`Membre nº ${id} non trouvé`);
      return
    }
    dispatch({ type: "SELECTED_MEMBER_SET_MEMBER_ACTION", member: member });
    dispatch({ type: "SELECTED_MEMBER_SET_LOADING_ACTION", isLoading: false });
  }
}