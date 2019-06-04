import {BOOK_AC_SERVICE, SET_LOCATION } from './types';
import { IACServiceState } from 'components/ACService/BookingDetails';

export interface IAction{
    type: typeof BOOK_AC_SERVICE | typeof SET_LOCATION;
    payload: IACServiceState | IACServiceState[];
}

export function bookAcService(booking:IACServiceState){
    return {type: BOOK_AC_SERVICE, payload: booking};
}

export function updateLocationAcService(booking:IACServiceState[]){
    return {type: SET_LOCATION, payload: booking};
}