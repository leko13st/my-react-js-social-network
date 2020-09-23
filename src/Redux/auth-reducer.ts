import { stopSubmit } from 'redux-form';
import { authAPI } from './../api/auth-api';
import { securityAPI } from './../api/security-api';
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from './../api/resultCodesAPI';
import { InferActionsTypes, BaseThunkType } from './redux-store';

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
type ActionTypes = InferActionsTypes<typeof actions>

const authReducer = (state = initialState, action: ActionTypes) : InitialStateType => {
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

export const actions = {
    setAuthUserDataAC: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}} as const
    ),
    setCaptchaUrlAC: (captchaUrl: string) => ({type: GET_CAPTCHA_URL, payload: {captchaUrl}})
}

type ThunkType = BaseThunkType<ActionTypes | ReturnType<typeof stopSubmit>>

export const getAuthUserDataTC = (): ThunkType => async (dispatch) => {    
    let data = await authAPI.authUser();

    if (data.resultCode === ResultCodeEnum.Success){
        let {id, email, login} = data.data;
        dispatch(actions.setAuthUserDataAC(id, email, login, true));
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
        dispatch(actions.setAuthUserDataAC(null, null, null, false));
    }
} 

export const getCaptchaUrlTC = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptcha();
    const captchaUrl = data.url;
    dispatch(actions.setCaptchaUrlAC(captchaUrl));
}

export default authReducer;