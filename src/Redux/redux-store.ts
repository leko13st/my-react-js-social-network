import {createStore, combineReducers, applyMiddleware, compose, Action} from 'redux';
import profileReducer from './profile-reducer';
import messagesReducer from './messages-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

// @ts-ignoreq
window.store = store;

export default store;