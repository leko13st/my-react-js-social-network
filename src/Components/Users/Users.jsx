import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = (props) => {

    return (
        <div>
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