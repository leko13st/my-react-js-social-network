import React from 'react';
import {UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    followingProgress: Array<number>
    onChangePage: (page: number) => void
    followToogle: (idUser: number) => void
}

let Users: React.FC<PropsType> = (props) => {
    return (
        <div>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onChangePage={props.onChangePage}/>        
            {
                props.users && 
                props.users.map(user => (
                    <User key={user.id} user={user} followingProgress={props.followingProgress} followToogle={props.followToogle}/>
                ))
            }
        </div>
    )
}

export default Users;