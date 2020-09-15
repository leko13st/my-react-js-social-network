import { PhotosType, PostDataType, ProfileType } from './../types/types';
import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    postData: [
        {id: 1, text: "Hello, I'm Stas. It's my first post on this site!"},
        {id: 2, text: "Hey, what's up?"},
        {id: 3, text: "Hi, there is just a post: good luck!"}
    ] as Array<PostDataType>,
    status: '',
    profile: null as ProfileType | null
}
export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.file} as ProfileType 
            }
        }
        default:
            return state;
    }
}

type addPostType = {
    type: typeof ADD_POST
    newPostText: string
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type setStatusType = {
    type: typeof SET_STATUS
    status: string
}
type savePhotoType = {
    type: typeof SAVE_PHOTO_SUCCESS
    file: PhotosType
}

//Вызов данных методов возвращает объект action с тем или иным значением type: ADD_POST, UPDATE_NEW_POST_TEXT и т.д.
export const addPostAC = (newPostText: string): addPostType => ({type: ADD_POST, newPostText});
export const setUserProfileAC = (profile: ProfileType): setUserProfileType => ({type: SET_USER_PROFILE, profile});
export const setStatusAC = (status: string): setStatusType => ({type: SET_STATUS, status});
export const savePhotoSuccessAC = (file: PhotosType): savePhotoType => ({type: SAVE_PHOTO_SUCCESS, file});


export const getUserProfileTC = (userId: number) => {
    if (!userId)
        userId = 11011;

    return async (dispatch: any) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(setUserProfileAC(response.data));
    }
}

export const getStatusTC = (userId: number) => {
    return async (dispatch: any) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatusAC(response.data))
    }
}

export const updateStatusTC = (status: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0)
            dispatch(setStatusAC(status))
    }
}

export const savePhotoTC = (file: PhotosType) => {
    return async (dispatch: any) => {
        let response = await profileAPI.savePhoto(file)
        if (response.data.resultCode === 0)
            dispatch(savePhotoSuccessAC(response.data.data.photos));
    }
}

export const saveProfileTC = (profile: ProfileType) => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().auth.userId;
        const response = await profileAPI.saveProfile(profile)
        if (response.data.resultCode === 0)
            dispatch(getUserProfileTC(userId));
        else{
            let messageError = (response.data.messages.length) > 0 ? response.data.messages[0] : 'some error'; 
            //dispatch(stopSubmit('profileForm', {'contacts': {'facebook': messageError}}));
            dispatch(stopSubmit('profileForm', {_error: messageError}));
            return Promise.reject(messageError);
        }
    }
}

export default profileReducer;