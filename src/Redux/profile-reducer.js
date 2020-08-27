import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postData: [
        {id: 1, text: "Hello, I'm Stas. It's my first post on this site!"},
        {id: 2, text: "Hey, what's up?"},
        {id: 3, text: "Hi, there is just a post: good luck!"}
    ],
    status: '',
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST: {
            let newPost = {
                id: 10,
                text: action.newPostText,
            }

            return {
                ...state,
                postData: [...state.postData, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

//Вызов данных методов возвращает объект action с тем или иным значением type: ADD_POST, UPDATE_NEW_POST_TEXT и т.д.
export const addPostAC = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfileAC = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status) => ({type: SET_STATUS, status});

export const getUserProfileTC = (userId) => {
    if (!userId)
        userId = 11011;

    return (dispatch) => {
        profileAPI.getProfile(userId)
        .then((response) => {
                dispatch(setUserProfileAC(response.data));
        })
    }
}

export const getStatusTC = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
        .then((response) => {
            dispatch(setStatusAC(response.data))
        })
    }
}

export const updateStatusTC = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
        .then((response) => {
            if (response.data.resultCode === 0)
                dispatch(setStatusAC(status))
        })
    }
}

export default profileReducer;