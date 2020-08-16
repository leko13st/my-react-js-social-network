import React from 'react';
import { createRef } from 'react';
import * as axios from 'axios';
import photoUser from './../../assets/images/FyIwsk1S_400x400.jpg'

let Users = (props) => {

    if (props.users.length === 0){
        axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then((response) => {
            props.setUsers(response.data.items)
        })
    }

    let buttonRef = React.createRef();

    let follow_toogle = (userId) => {
        debugger
        props.follow_toogle(userId);
    }

    return (
        <div>
        {
            props.users.map(user => (
                <div key={user.id}>
                    <span>
                        <div>
                            <img src={(user.photos.small == null) ? photoUser : user.photos.small} alt="papich-ava" width='10%' />
                        </div>
                        <div>
                            <button onClick={() => follow_toogle(user.id)}>{user.followed ? 'Unfollow' : 'Follow'}</button>
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'user.location.country'}</div>
                            <div>{'user.location.city'}</div>
                        </span>
                    </span>
                </div>
            ))            
        }
        </div>   
    )
}

export default Users;