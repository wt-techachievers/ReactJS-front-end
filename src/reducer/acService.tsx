import { Reducer } from 'redux';
import { IACServiceState } from 'components/ACService/BookingDetails';
import { BOOK_AC_SERVICE, UPDATE_BOOK_AC_SERVICE } from '../action/types';
import { IAction } from 'action/acService';

export interface IServiceProviderInfo{
  area: string;
  coordinates:number[];
  rating:number
}

export interface IBookingState{
  Bookings:IACServiceState[],
  ServiceProviderInfo: IServiceProviderInfo[]
}

const initialState:IBookingState = {
    Bookings:[],
    ServiceProviderInfo: [
      {
        area: "Dumas",
        coordinates:[72.7431, 21.1205],
        rating:4
      },
      {
        area: "Varachha",
        coordinates:[72.8673, 21.2021],
        rating:4.2
      }
    ]
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
      case UPDATE_BOOK_AC_SERVICE: {
        let newState = {...state};
        newState.Bookings = action.payload;
        return newState;
      }
      default:
        return state;
    }
  };