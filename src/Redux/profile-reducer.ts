import { profileAPI } from './../api/profile-api';
import { InferActionsTypes, BaseThunkType } from './redux-store';
import { PhotosType, PostDataType, ProfileType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";

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
export type ActionTypes = InferActionsTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type){
        case 'ADD_POST': {
            let newPost = {
                id: 10,
                text: action.newPostText,
            }

            return {
                ...state,
                postData: [...state.postData, newPost]
            }
        }
        case 'SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.file} as ProfileType 
            }
        }
        default:
            return state;
    }
}

export const actions = {
    addPostAC: (newPostText: string) => ({type: 'ADD_POST', newPostText} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatusAC: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccessAC: (file: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', file} as const)
}

type ThunkType = BaseThunkType<ActionTypes | FormAction>

export const getUserProfileTC = (userId: number | null): ThunkType => {
    
    if (!userId)
        userId = 11011;

    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfileAC(response.data));
    }
}

export const getStatusTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(actions.setStatusAC(response.data))
    }
}

export const updateStatusTC = (status: string): ThunkType => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0)
            dispatch(actions.setStatusAC(status))
    }
}

export const savePhotoTC = (file: Blob): ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0)
            dispatch(actions.savePhotoSuccessAC(data.data));
    }
}

export const saveProfileTC = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.id;
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