import { UserType } from './../types/types';
import { userAPI, followAPI } from "../api/api";
import { Dispatch } from 'redux';
import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk';

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const IS_FOLLOW_CHANGING = 'IS_FOLLOW_CHANGING';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>
}

const usersReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type){
        case FOLLOW_TOGGLE: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId){
                        return {...user, followed: !user.followed};
                    };
                    return user;
                })
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.pageId
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case IS_FOLLOW_CHANGING: {
            return {
                ...state,
                followingProgress: action.isFetching
                ? [...state.followingProgress, action.userId]
                : [...state.followingProgress.filter(id => id !== action.userId)],
            }
        }
        default:
            return state;
    }
}

type FollowToggleType = {
    type: typeof FOLLOW_TOGGLE
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    pageId: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    usersCount: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type IsFollowChangingType = {
    type: typeof IS_FOLLOW_CHANGING
    userId: number
    isFetching: boolean
}

type ActionsTypes = FollowToggleType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | IsFollowChangingType

export const followToggleAC = (userId: number): FollowToggleType => ({type: FOLLOW_TOGGLE, userId});
export const setUsersAC = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});
export const setCurrentPageAC = (pageId: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, pageId});
export const setTotalUsersCountAC = (usersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, usersCount});
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});
export const isFollowChangingAC = (isFetching: boolean, userId: number): IsFollowChangingType => ({type: IS_FOLLOW_CHANGING, isFetching, userId});

//type GetStateType = () => AppStateType          В данном случае не обязательно: пример как использовать типизацию для GetState в thunk
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

//1-ый способ типизации Thunk (общая типизация thunk'а через ThunkAction)
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true))

        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(data.users));
        dispatch(setTotalUsersCountAC(data.totalCount));
    }
}

//2-ый способ типизации Thunk (типизация пропсов)
export const followToggleThunkCreator = (userId: number) => {
    return async (dispatch: DispatchType) => {
        dispatch(isFollowChangingAC(true, userId));
        
        let followed = await followAPI.getCheckingFollowed(userId);
        if (!followed){
            let data = await followAPI.postFollow(userId)
            if(data.resultCode === 0)
                dispatch(followToggleAC(userId));
            dispatch(isFollowChangingAC(false, userId));
        }
        else{
            let data = await followAPI.deleteFollow(userId)
            if(data.resultCode === 0)
                dispatch(followToggleAC(userId));
            dispatch(isFollowChangingAC(false, userId));
        }
    }
}

export default usersReducer;