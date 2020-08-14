import {createStore, combineReducers} from 'redux';
import profileReducer from './profile-reducer';
import messagesReducer from './messages-reducer';

let reducers = combineReducers({
    profilePage: profileReducer,
    messagePage: messagesReducer
});

let store = createStore(reducers);

export default store;