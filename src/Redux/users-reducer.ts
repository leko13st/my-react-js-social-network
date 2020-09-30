import { followAPI, userAPI } from './../api/users-api';
import { UserType } from './../types/types';
import { Dispatch } from 'redux';
import { AppStateType, InferActionsTypes } from './redux-store';
import { ThunkAction } from 'redux-thunk';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type){
        case 'FOLLOW_TOGGLE': {
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
        case 'SET_USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.pageId
            }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.usersCount
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'IS_FOLLOW_CHANGING': {
            return {
                ...state,
                followingProgress: action.isFetching
                ? [...state.followingProgress, action.userId]
                : [...state.followingProgress.filter(id => id !== action.userId)],
            }
        }
        case 'SET_FILTER':{
            return {
                ...state,
                filter: action.payload
            }
        }
        default:
            return state;
    }
}
type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    followToggleAC: (userId: number) => ({type: 'FOLLOW_TOGGLE', userId} as const),
    setUsersAC: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPageAC: (pageId: number) => ({type: 'SET_CURRENT_PAGE', pageId} as const),
    setTotalUsersCountAC: (usersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', usersCount} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    isFollowChangingAC: (isFetching: boolean, userId: number) => ({type: 'IS_FOLLOW_CHANGING', isFetching, userId} as const),
    setFilterAC: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const)
}

//type GetStateType = () => AppStateType          В данном случае не обязательно: пример как использовать типизацию для GetState в thunk
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

//1-ый способ типизации Thunk (общая типизация thunk'а через ThunkAction)
export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetchingAC(true))
        //dispatch(actions.setCurrentPageAC(currentPage))
        dispatch(actions.setFilterAC(filter))

        let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetchingAC(false));
        dispatch(actions.setUsersAC(data.items));
        dispatch(actions.setTotalUsersCountAC(data.totalCount));
    }
}

//2-ый способ типизации Thunk (типизация пропсов)
export const followToggleThunkCreator = (userId: number) => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.isFollowChangingAC(true, userId));
        
        let followed = await followAPI.getCheckingFollowed(userId);
        let data;
        if (!followed)
            data = await followAPI.postFollow(userId)
        else
            data = await followAPI.deleteFollow(userId)

        if(data.resultCode === 0)
            dispatch(actions.followToggleAC(userId));
        dispatch(actions.isFollowChangingAC(false, userId));
    }
}

export default usersReducer