import { IAction } from "..";
import { ThunkAction } from "redux-thunk";
import { AppState } from "../../states/app-state";
import { Container } from "inversify";
import { SlotsService } from "../../client/api/slots.service";
import { TYPES } from "../../client/variables";


export type SlotsAction = SlotsSetSlotTypeAction
  | SlotsSetStartDateAction
  | SlotsSetCreatedSnackbarVisibleAction
  | SlotsSetDriverCountAction;


interface SlotsSetStartDateAction extends IAction {
  type: "SLOTS_SET_START_DATE_ACTION";
  startDate: string;
}

interface SlotsSetSlotTypeAction extends IAction {
  type: "SLOTS_SET_SLOT_TYPE_ACTION";
  sloyType: string;
}

interface SlotsSetCreatedSnackbarVisibleAction extends IAction {
  type: "SLOTS_SET_CRAETED_SNACKBAR_VISIBLE_ACION";
  isVisible: boolean;
}

interface SlotsSetDriverCountAction extends IAction {
  type: "SLOTS_SET_DRIVER_COUNT_ACTION";
  driverCount: number;
}

type SlotsAsyncAction = ThunkAction<void, AppState, Container, SlotsAction>; 

export function setSlotStartDate(startDate: string): SlotsAction {
  return { type: "SLOTS_SET_START_DATE_ACTION", startDate: startDate };
}

export function setSlotTypeDate(type: string): SlotsAction {
  return { type: "SLOTS_SET_SLOT_TYPE_ACTION", sloyType: type };
}

export function setDriverCount(count: number): SlotsAction {
  return { type: "SLOTS_SET_DRIVER_COUNT_ACTION", driverCount: count };
}

export function createSlot(): SlotsAsyncAction {
  return async (dispatch, getState, container) => {
    let slotsService = container.get<SlotsService>(TYPES.SlotsService);
    let { startDate, slotType, driverCount } = getState().slots;
    await slotsService.slotCreateSlot({
      startDate: startDate,
      type: slotType === "standard" ? "1" : "2",
      availableDrivers: driverCount // TODO: Add a text field to pass this a parameter
    }).toPromise();
    dispatch({ type: "SLOTS_SET_CRAETED_SNACKBAR_VISIBLE_ACION", isVisible: true });
    setTimeout(() => {
      dispatch({ type: "SLOTS_SET_CRAETED_SNACKBAR_VISIBLE_ACION", isVisible: false });
    }, 2000);    
  }
}