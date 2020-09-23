import { ResultCodeEnum } from './resultCodesAPI';
import { ProfileType } from './../types/types';
import { instance, ResponseType } from './api';

type SavePhotoType = {
    small?: string 
    large?: string
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<ProfileType>('profile/' + (userId ? userId : ''));
    },
    getStatus(userId: number){
        return instance.get<string>('profile/status/' + userId)
    },
    updateStatus(status: string){
        return instance.put<ResponseType<any>>('profile/status', {status})
    },
    savePhoto(file: Blob){ // ?????
        let formData = new FormData();
        formData.append('image', file);

        return instance.put<ResponseType<SavePhotoType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType){
        return instance.put<ResponseType<any>>('profile', profile)
    }
}