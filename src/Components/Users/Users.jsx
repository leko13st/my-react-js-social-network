import React from 'react';
import { createRef } from 'react';

let Users = (props) => {

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
                            <img src={user.photoUrl} alt="papich-ava" width='10%' />
                        </div>
                        <div>
                            <button onClick={() => follow_toogle(user.id)}>{user.followed ? 'Unfollow' : 'Follow'}</button>
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.country}</div>
                            <div>{user.location.city}</div>
                        </span>
                    </span>
                </div>
            ))            
        }
        </div>   
    )
}

export default Users;