import React from 'react';
import styles from './Users.module.css';
import * as axios from 'axios';
import photoUser from './../../assets/images/FyIwsk1S_400x400.jpg'

class Users extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.getUsersRequest(this.props.currentPage);
    }

    getUsersRequest(currentPage){
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    ChangePage(pageId){
        this.props.setCurrentPage(pageId);
        this.getUsersRequest(pageId);
    }

    follow_toogle = (userId) => {
        this.props.follow_toogle(userId);
    }

    render() {

        let pageCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i < pageCount + 1; i++)
            pages.push(i);

        return (
            <div>
                <div className={styles.pages}>
                    {
                       pages.map(num => <span onClick={() => this.ChangePage(num)} className={this.props.currentPage === num ? styles.currentPage : undefined}>{num}</span>)
                    }
                </div>
            {
                this.props.users.map(user => (
                    <div key={user.id} className={styles.users}>
                        <span>
                            <div>
                                <img src={(user.photos.small == null) ? photoUser : user.photos.small} alt="papich-ava" width='10%' />
                            </div>
                            <div>
                                <button onClick={() => this.follow_toogle(user.id)}>{user.followed ? 'Unfollow' : 'Follow'}</button>
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
}

export default Users;