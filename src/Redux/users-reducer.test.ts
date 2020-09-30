import usersReducer, { actions, InitialStateType } from './users-reducer';

let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'user 0', followed: false, photos: {small: null, large: null}, status: 'Status 0'
            },
            {
                id: 1, name: 'user 1', followed: true, photos: {small: null, large: null}, status: 'Status 1'
            },
            {
                id: 2, name: 'user 2', followed: true, photos: {small: null, large: null}, status: 'Status 2'
            },
            {
                id: 3, name: 'user 3', followed: false, photos: {small: null, large: null}, status: 'Status 3'
            }            
        ],
        pageSize: 5,
        totalUsersCount: 10,
        currentPage: 1,
        isFetching: true,
        followingProgress: []
    }
})

test('follow/unfollow check', () => {
    const newState = usersReducer(state, actions.followToggleAC(0))
    
    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeFalsy()
})