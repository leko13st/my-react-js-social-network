import { instance } from './api';

type GetCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha(){
        return instance.get<GetCaptchaType>('security/get-captcha-url')
        .then(response => response.data);
    }
}