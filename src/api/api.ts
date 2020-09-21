import { UsersType } from './../types/types';
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from './resultCodesAPI';
import axios from 'axios';
import { ProfileType } from '../types/types';

type CommonType = {
    data: any
    resultCode: ResultCodeEnum
    messages: Array<string>
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "470d5265-9930-42af-9165-b27ca47b6e0e"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
    }
}

export const followAPI = {
    getCheckingFollowed(userId: number) {
        return instance.get('follow/' + userId)
                .then(response => response.data)
    },    
    postFollow(userId: number) {
        return instance.post<CommonType>('follow/' + userId)
                .then(response => response.data)
    },    
    deleteFollow(userId: number) {
        return instance.delete<CommonType>('follow/' + userId)
                .then(response => response.data)
    }
}

type AuthUserType = {
    data: {             //Вложенный тип. Так нужно для понимания, как проще владеть типами
        id: number 
        email: string 
        login: string 
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

type LoginType = {
    data: {             //Вложенный тип. Так нужно для понимания, как проще владеть типами
        userId: number
    }
    resultCode: ResultCodeEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    authUser() {
        return instance.get<AuthUserType>('auth/me')
                .then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<LoginType>('auth/login', {email, password, rememberMe, captcha})
                .then(response => response.data);
    },
    logout() {
        return instance.delete<CommonType>('auth/login')
                .then(response => response.data);;
    }
}

type SavePhotoType = {
    data: {
        small?: string 
        large?: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>('profile/' + (userId ? userId : ''));
    },
    getStatus(userId: number){
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string){
        return instance.put<CommonType>('profile/status', {status})
    },
    savePhoto(file: Blob){ // ?????
        let formData = new FormData();
        formData.append('image', file);

        return instance.put<SavePhotoType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType){
        return instance.put<CommonType>('profile', profile)
    }
}

type GetCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha(){
        return instance.get<GetCaptchaType>('security/get-captcha-url')
        .then(response => response.data);
    }
}

