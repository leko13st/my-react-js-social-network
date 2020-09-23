import { ResultCodeEnum, ResultCodeForCaptchaEnum } from './resultCodesAPI';
import { instance, ResponseType } from './api';

type AuthUserType = {
    id: number 
    email: string 
    login: string 
}

type LoginType = {
    userId: number    
}

export const authAPI = {
    authUser() {
        return instance.get<ResponseType<AuthUserType>>('auth/me')
                .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<ResponseType<LoginType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', {email, password, rememberMe, captcha})
                .then(response => response.data);
    },
    logout() {
        return instance.delete<ResponseType<any>>('auth/login')
                .then(response => response.data);;
    }
}