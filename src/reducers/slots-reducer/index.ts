import { SlotsState, initialState } from "../../states/slots-state";
import { SlotsAction } from "../../actions/slots-actions";
import moment from "moment";


export function slotsReducer(state: SlotsState = initialState, action: SlotsAction): SlotsState {
  switch (action.type) {
    case "SLOTS_SET_START_DATE_ACTION": 
      return {
        ...state ,
        startDate: moment(action.startDate).toDate()
      };
    case "SLOTS_SET_SLOT_TYPE_ACTION": 
      return {
        ...state,
        slotType: action.sloyType === "express" ? "express" : "standard"
      };
    case "SLOTS_SET_CRAETED_SNACKBAR_VISIBLE_ACION":
      return {
        ...state,
        isSlotCreatedSnackbarOpen: action.isVisible
      };
    case "SLOTS_SET_DRIVER_COUNT_ACTION":
      return {
        ...state,
        driverCount: action.driverCount
      };
  }
  return state;
}