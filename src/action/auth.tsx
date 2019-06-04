import {ADD_USER } from './types';
import { IRegistrationState } from 'components/Registration';

export interface IAuthAction{
    type: typeof ADD_USER ;
    payload: IRegistrationState ;
}

export function addUser(booking:IRegistrationState){
    return {type: ADD_USER, payload: booking};
}
