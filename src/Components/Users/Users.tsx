import React from 'react';
import { FilterType } from '../../Redux/users-reducer';
import {UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import UserSearchForm from './UserSearchForm';

type PropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingProgress: Array<number>
    onChangePage: (page: number) => void
    followToogle: (idUser: number) => void
    onFilterChanged: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = (props) => {

    // let usersArr: Array<UserType>
    // if (props.users) 
    //     usersArr = props.users.filter(() => true)
    // else 
    //     usersArr = []

    return (
        <div>
            <UserSearchForm onFilterChanged={props.onFilterChanged}/>

            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onChangePage={props.onChangePage}/>        
            {
                props.users.map(user => (
                    <User key={user.id} user={user} followingProgress={props.followingProgress} followToogle={props.followToogle}/>
                ))
            }
        </div>
    )
}

export default Users;