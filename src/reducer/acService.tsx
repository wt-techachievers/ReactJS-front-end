import { Reducer } from 'redux';
import { IACServiceState } from 'components/ACService/BookingDetails';
import { BOOK_AC_SERVICE, SET_LOCATION } from '../action/types';
import { IAction } from 'action/acService';

export interface IBookingState{
  readonly Bookings:IACServiceState[]
}

const initialState:IBookingState = {
    Bookings:[],
}

export const acServiceReducer: Reducer<IBookingState> = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case BOOK_AC_SERVICE: {
        let newState = {...state};
        newState.Bookings.push(action.payload);
        return newState;
      }
      case SET_LOCATION: {
        let newState = {...state};
        newState.Bookings = action.payload;
        return newState;
      }
      default:
        return state;
    }
  };