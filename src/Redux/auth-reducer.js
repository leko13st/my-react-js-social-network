import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
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
                captchaUrl: action.url
            }
        }
        default:
            return state;
    }
}

export const setAuthUserDataAC = (id, email, login, isAuth) => ({type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth}});
export const setCaptchaUrlAC = (url) => ({type: GET_CAPTCHA_URL, url});

export const getAuthUserDataTC = () => async dispatch => {    
    let data = await authAPI.authUser();

    if (data.resultCode === 0){
        let {id, email, login} = data.data;
        dispatch(setAuthUserDataAC(id, email, login, true));
    }        
}

export const loginTC = (email, password, rememberMe, captcha) => async dispatch => {
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

export const logoutTC = () => async (dispatch) => {
    let data = await authAPI.logout();
    
    if (data.resultCode === 0){
        dispatch(setAuthUserDataAC(null, null, null, false));
    }
} 

export const getCaptchaUrlTC = () => async (dispatch) => {
    const data = await securityAPI.getCaptcha();
    const captchaUrl = data.url;
    dispatch(setCaptchaUrlAC(captchaUrl));
}

export default authReducer;