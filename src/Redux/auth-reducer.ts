import { ResultCodeEnum, ResultCodeForCaptchaEnum } from './../api/resultCodesAPI';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { authAPI, securityAPI } from "../api/api";
import { AppStateType } from './redux-store';

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes) : InitialStateType => {
    switch (action.type){
        case SET_AUTH_USER_DATA: 
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}

type setAuthUserDataPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA
    payload: setAuthUserDataPayloadType
}

type setCaptchaUrlType = {
    type: typeof GET_CAPTCHA_URL
    payload: { captchaUrl: string | null }
}

type ActionsTypes = setAuthUserDataType | setCaptchaUrlType

export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}});
export const setCaptchaUrlAC = (captchaUrl: string): setCaptchaUrlType => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}});

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserDataTC = (): ThunkType => async (dispatch) => {    
    let data = await authAPI.authUser();

    if (data.resultCode === ResultCodeEnum.Success){
        let {id, email, login} = data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
    }        
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    
    if (data.resultCode === ResultCodeEnum.Error){
        dispatch(getAuthUserDataTC());
    }
    else {
        if (data.resultCode === ResultCodeForCaptchaEnum.Captcha) {
            dispatch(getCaptchaUrlTC())
        }
        let message = (data.messages.length > 0) ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
} 

export const logoutTC = (): ThunkType => async (dispatch) => {
    let data = await authAPI.logout();
    
    if (data.resultCode === ResultCodeEnum.Success){
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
} 

export const getCaptchaUrlTC = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrlAC(captchaUrl));
}

export default authReducer;