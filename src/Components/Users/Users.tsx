import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, FilterType, followToggleThunkCreator, getUsersThunkCreator } from '../../Redux/users-reducer';
import { getCurrentPage, getFollowingProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSuper } from '../../Redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import UserSearchForm from './UserSearchForm';

type PropsType = {
    // users: Array<UserType>
    // //totalUsersCount: number
    // //pageSize: number
    // //currentPage: number
    // followingProgress: Array<number>
    // //onChangePage: (page: number) => void
    // followToogle: (idUser: number) => void
    // onFilterChanged: (filter: FilterType) => void
}

let Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsersSuper)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingProgress = useSelector(getFollowingProgress)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [currentPage, pageSize, filter, dispatch])

    const onPageChanged = (page: number) => {
        dispatch(actions.setCurrentPageAC(page))
        dispatch(getUsersThunkCreator(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }

    const onFollowingToggled = (userId: number) => {
        dispatch(followToggleThunkCreator(userId))
    }

    return (
        <div>
            <UserSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onChangePage={onPageChanged}/>        
            {
                users.map(user => (
                    <User key={user.id} user={user} followingProgress={followingProgress} followToogle={onFollowingToggled}/>
                ))
            }
        </div>
    )
}

export default Users;