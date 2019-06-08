import { MembersState, initialState } from "../../states/members-state";
import { MembersAction } from "../../actions/members-actions";
import { selectedMemberReducer } from "./selected-member-reducer";


export function membersReducer(state: MembersState = initialState, action: MembersAction): MembersState {
  switch (action.type) {
    case "MEMBERS_SET_LOADING_ACTION":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "MEMBERS_SET_MEMBER_LIST_ACTION":
      return {
        ...state,
        members: action.members
      };
    case "MEMBERS_SET_VISIBLE_MEMBER_LIST_ACTION":
      return {
        ...state,
        visibleMembers: action.visibleMembers
      };
    case "SELECTED_MEMBER_SET_LOADING_ACTION":
    case "SELECTED_MEMBER_SET_MEMBER_ACTION":
      return {
        ...state,
        selectedMemberState: selectedMemberReducer(state.selectedMemberState, action)
      }
  }
  return state;
}