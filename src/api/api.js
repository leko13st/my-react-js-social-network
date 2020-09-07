import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "470d5265-9930-42af-9165-b27ca47b6e0e"
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
                .then(response => response.data)
    }
}

export const followAPI = {
    getCheckingFollowed(userId) {
        return instance.get('follow/' + userId)
                .then(response => response.data)
    },    
    postFollow(userId) {
        return instance.post('follow/' + userId)
                .then(response => response.data)
    },    
    deleteFollow(userId) {
        return instance.delete('follow/' + userId)
                .then(response => response.data)
    }
}

export const authAPI = {
    authUser() {
        return instance.get('auth/me')
                .then(response => response.data);
    },
    login(email, password, rememberMe = false, captcha) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
                .then(response => response.data);
    },
    logout() {
        return instance.delete('auth/login')
                .then(response => response.data);;
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get('profile/' + (userId ? userId : ''));
    },
    getStatus(userId){
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status){
        return instance.put('profile/status', {status})
    },
    savePhoto(file){
        let formData = new FormData();
        formData.append('image', file);

        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile){
        return instance.put('profile', profile)
    }
}

export const securityAPI = {
    getCaptcha(){
        return instance.get('security/get-captcha-url')
        .then(response => response.data);
    }
}

