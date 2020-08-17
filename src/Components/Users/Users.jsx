import React from 'react';
import styles from './Users.module.css';
import photoUser from './../../assets/images/FyIwsk1S_400x400.jpg'

let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i < pageCount + 1; i++)
        pages.push(i);
    
    return (
        <div>
            <div className={styles.pages}>
                {
                    pages.map(num => <span onClick={() => props.changePage(num)} className={props.currentPage === num ? styles.currentPage : undefined}>{num}</span>)
                }
            </div>
        {
            props.users.map(user => (
                <div key={user.id} className={styles.users}>
                    <span>
                        <div>
                            <img src={(user.photos.small == null) ? photoUser : user.photos.small} alt="papich-ava" width='10%' />
                        </div>
                        <div>
                            <button onClick={() => props.followToogle(user.id)}>{user.followed ? 'Unfollow' : 'Follow'}</button>
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