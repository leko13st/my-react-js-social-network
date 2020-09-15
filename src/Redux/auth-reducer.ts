import { stopSubmit } from 'redux-form';
import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

export type InitialStateType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}

let initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: any) : InitialStateType => {
    switch (action.type){
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.payload
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
    payload: { captchaUrl: string }
}

export const setAuthUserDataAC = (id: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataType => ({type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}});
export const setCaptchaUrlAC = (captchaUrl: string): setCaptchaUrlType => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}});

export const getAuthUserDataTC = () => async (dispatch: any) => {    
    let data = await authAPI.authUser();

    if (data.resultCode === 0){
        let {id, email, login} = data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
    }        
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    
    if (data.resultCode === 0){
        dispatch(getAuthUserDataTC());
    }
    else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrlTC())
        }
        let message = (data.messages.length > 0) ? data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
} 

export const logoutTC = () => async (dispatch: any) => {
    let data = await authAPI.logout();
    
    if (data.resultCode === 0){
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
} 

export const getCaptchaUrlTC = () => async (dispatch: any) => {
    const data = await securityAPI.getCaptcha();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrlAC(captchaUrl));
}

export default authReducer;