import { SelectedMemberState, initialState } from "../../states/members-state/selected-member-state";
import { SelectedMemberAction } from "../../actions/members-actions/selected-member-actions";


export function selectedMemberReducer(state: SelectedMemberState = initialState, action: SelectedMemberAction): SelectedMemberState {
  switch(action.type) {
    case "SELECTED_MEMBER_SET_LOADING_ACTION":
      return {
        ...state,
        isLoading: action.isLoading
      };
    case "SELECTED_MEMBER_SET_MEMBER_ACTION":
      return {
        ...state,
        selectedMember: action.member
      };
  }
  return state;
}