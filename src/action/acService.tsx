import {BOOK_AC_SERVICE, UPDATE_BOOK_AC_SERVICE } from './types';
import { IACServiceState } from 'components/ACService/BookingDetails';

export interface IAction{
    type: typeof BOOK_AC_SERVICE | typeof UPDATE_BOOK_AC_SERVICE;
    payload: IACServiceState | IACServiceState[];
}

export function bookAcService(booking:IACServiceState){
    return {type: BOOK_AC_SERVICE, payload: booking};
}

export function updateLocationAcService(booking:IACServiceState[]){
    return {type: UPDATE_BOOK_AC_SERVICE, payload: booking};
}