const FOLLOW_TOOGLE = 'FOLLOW_TOOGLE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    isFetching: true
}

const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case 'FOLLOW_TOOGLE': {
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
                totalUsersCount: action.usersCount > 50 ? 50 : action.usersCount
            }
        }
        case 'TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

export const followToogleAC = (userId) => ({type: FOLLOW_TOOGLE, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});
export const setCurrentPageAC = (pageId) => ({type: SET_CURRENT_PAGE, pageId});
export const setTotalUsersCountAC = (usersCount) => ({type: SET_TOTAL_USERS_COUNT, usersCount});
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export default usersReducer;