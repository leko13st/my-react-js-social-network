import { ResultCodeEnum } from './resultCodesAPI';
import axios from 'axios';

export type ResponseType<D = {}, RC = ResultCodeEnum> = { // Response - потому что это ответные данные пришедшие от запроса на авторизацию
    data: D
    resultCode: RC
    messages: Array<string>
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "470d5265-9930-42af-9165-b27ca47b6e0e"
    }
})

//export type GetItemsType