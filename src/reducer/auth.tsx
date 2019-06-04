import { Reducer } from 'redux';
import { IRegistrationState } from 'components/Registration';
import { ADD_USER } from '../action/types';

export interface IAuthState{
  readonly Users:IRegistrationState[]
}

const initialState:IAuthState = {
    Users:[],
}

export const AuthReducer: Reducer<IAuthState> = (
    state = initialState,
    action
  ) => {
    switch (action.type) {
      case ADD_USER: {
        let newState = {...state};
        newState.Users.push(action.payload);
        return newState;
      }
      default:
        return state;
    }
  };