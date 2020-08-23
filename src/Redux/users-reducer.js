import { userAPI, followAPI } from "../api/api";

const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const IS_FOLLOW_CHANGING = 'IS_FOLLOW_CHANGING';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: true,
    followingProgress: []
}

const usersReducer = (state = initialState, action) => {
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
                totalUsersCount: action.usersCount > 50 ? 50 : action.usersCount
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

export const followToggleAC = (userId) => ({type: FOLLOW_TOGGLE, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (pageId) => ({type: SET_CURRENT_PAGE, pageId});
export const setTotalUsersCountAC = (usersCount) => ({type: SET_TOTAL_USERS_COUNT, usersCount});
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const isFollowChangingAC = (isFetching, userId) => ({type: IS_FOLLOW_CHANGING, isFetching, userId});

export const getUsersThunkCreator = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetchingAC(true))

        userAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false));
            dispatch(setUsersAC(data.items));
            dispatch(setTotalUsersCountAC(data.totalCount));
        })
    }
}

export const followToggleThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(isFollowChangingAC(true, userId));
        followAPI.getCheckingFollowed(userId).then(data => {
            if (!data){
                followAPI.postFollow(userId).then(data => {
                    if(data.resultCode === 0)
                    dispatch(followToggleAC(userId));
                    dispatch(isFollowChangingAC(false, userId));
                })
            }
            else{
                followAPI.deleteFollow(userId).then(data => {
                    if(data.resultCode === 0)
                    dispatch(followToggleAC(userId));
                    dispatch(isFollowChangingAC(false, userId));
                })
            }
        })
    }
}

export default usersReducer;