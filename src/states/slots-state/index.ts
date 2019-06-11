import moment from "moment";


export interface SlotsState {
  startDate: Date;
  slotType: "standard" | "express";
  isSlotCreatedSnackbarOpen: boolean;
}


export let initialState: SlotsState = {
  startDate: moment(Date.now() + 3600 * 24 * 1000).toDate(),
  slotType: "standard",
  isSlotCreatedSnackbarOpen: false
}