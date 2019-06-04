import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { acServiceReducer, IBookingState } from 'reducer/acService';
import { composeWithDevTools } from "redux-devtools-extension";
import { IAction } from 'action/acService';
import { AuthReducer, IAuthState } from 'reducer/auth';

export interface IAppState {
    serviceState: IBookingState;
    authState: IAuthState
  }

const rootReducer = combineReducers<IAppState, IAction>({
    serviceState: acServiceReducer,
    authState: AuthReducer
});


const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);
export default store;