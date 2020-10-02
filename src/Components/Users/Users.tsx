import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions, FilterType, followToggleThunkCreator, getUsersThunkCreator } from '../../Redux/users-reducer';
import { getCurrentPage, getFollowingProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSuper } from '../../Redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import UserSearchForm from './UserSearchForm';
import * as queryString from 'querystring';

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

type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
}

let Users: FC<PropsType> = (props) => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsersSuper)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingProgress = useSelector(getFollowingProgress)

    const dispatch = useDispatch()
    const history = useHistory()    

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = +parsed.page
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage, history])

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