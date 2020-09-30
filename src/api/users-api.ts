import { UsersType } from './../types/types';
import { instance, ResponseType } from './api';

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<UsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
                .then(response => response.data)
    }
}

export const followAPI = {
    getCheckingFollowed(userId: number) {
        return instance.get('follow/' + userId)
                .then(response => response.data)
    },    
    postFollow(userId: number) {
        return instance.post<ResponseType<any>>('follow/' + userId)
                .then(response => response.data)
    },    
    deleteFollow(userId: number) {
        return instance.delete<ResponseType<any>>('follow/' + userId)
                .then(response => response.data)
    }
}