import React from 'react';
import styles from './Users.module.css';
import photoUser from './../../assets/images/FyIwsk1S_400x400.jpg'
import { NavLink } from 'react-router-dom';
import { UsersType } from '../../types/types';

type PropsType = {
    user: UsersType
    followingProgress: Array<number>
    followToogle: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingProgress, followToogle}) => {

    return (
        <div className={styles.users}>
            <span>
                <div>
                    <NavLink to={'profile/' + user.id} >
                        <img src={(user.photos.small == null) ? photoUser : user.photos.small} alt="papich-ava" width='10%' />
                    </NavLink>
                </div>
                <div>
                    <button disabled={followingProgress.some(id => id === user.id)} onClick={() => followToogle(user.id)}>{user.followed ? 'Unfollow' : 'Follow'}</button>
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
    )
}

export default User;