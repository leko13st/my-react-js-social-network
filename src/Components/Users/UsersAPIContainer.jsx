import React from 'react';
import * as axios from 'axios';
import Users from './Users';

class UsersAPIContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.getUsersRequest(this.props.currentPage);
    }

    getUsersRequest(currentPage){
        debugger
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
            .then((response) => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                debugger
            })
    }

    changePage(pageId){
        this.props.setCurrentPage(pageId);
        this.getUsersRequest(pageId);
    }

    followToogle = (userId) => {
        this.props.followToogle(userId);
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      currentPage={this.props.currentPage}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      changePage={this.changePage}
                      followToogle={this.followToogle}/>
    }
}

export default UsersAPIContainer;