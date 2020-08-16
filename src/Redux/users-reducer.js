const FOLLOW_TOOGLE = 'FOLLOW-TOOGLE';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';

let initialState = {
    users: [
        // {id: 1, photoUrl: 'https://sun9-14.userapi.com/impf/c847123/v847123629/16d660/w9Hu6NWRFQ8.jpg?size=200x0&quality=90&sign=5e976c09b94b30bcfdc828b6e0396c95&ava=1', followed: true, fullName: 'Jhon', status: 'I\'m busy', location: {country: 'Russia', city: 'Perm'}},
        // {id: 2, photoUrl: 'https://game2day.ru//images/made/7b4f3a1209326b54/papich8_360_208_s_c1.jpg', followed: false, fullName: 'Vitaly Tsal', status: 'I\'m streaming', location: {country: 'Ukraine', city: 'Vinnitsa'}},
        // {id: 3, photoUrl: 'https://pbs.twimg.com/profile_images/1060286056342474752/FyIwsk1S_400x400.jpg', followed: true, fullName: 'Microchel', status: 'Arthas\' fan', location: {country: 'Russia', city: 'Moscow'}}
    ],
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1
}

const usersReducer = (state = initialState, action) => {
    switch (action.type){
        case 'FOLLOW-TOOGLE': {
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
        case 'SET-USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SET-CURRENT-PAGE': {
            return {
                ...state,
                currentPage: action.pageId
            }
        }
        case 'SET-TOTAL-USERS-COUNT': {
            return {
                ...state,
                totalUsersCount: action.usersCount > 50 ? 50 : action.usersCount
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

export default usersReducer;