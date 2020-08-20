import React from 'react';
import * as axios from 'axios';
import { connect } from "react-redux";
import { followToggleAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC } from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';

class UsersContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.getUsersRequest(this.props.currentPage);
    }

    getUsersRequest = (currentPage) => {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })
            .then((response) => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            })
    }

    changePage = (pageId) => {
        this.props.setCurrentPage(pageId);
        this.getUsersRequest(pageId);
    }

    followToogle = (userId) => {
        axios.get('https://social-network.samuraijs.com/api/1.0/follow/' + userId, {
            withCredentials: true
        })
        .then((response) => {
            if (!response.data){
                axios.post('https://social-network.samuraijs.com/api/1.0/follow/' + userId, null, {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "470d5265-9930-42af-9165-b27ca47b6e0e"
                    }
                })
                .then((response) => {
                    debugger
                    if(response.data.resultCode === 0)
                        this.props.followToogle(userId);
                })
            }
            else{
                axios.delete('https://social-network.samuraijs.com/api/1.0/follow/' + userId, {
                    withCredentials: true,
                    headers: {
                        "API-KEY": "470d5265-9930-42af-9165-b27ca47b6e0e"
                    }
                })
                .then((response) => {
                    debugger
                    if(response.data.resultCode === 0)
                        this.props.followToogle(userId);
                })
            }
        })

        
        
    }

    render() 
    {
        return <>
        {
            this.props.isFetching ? <Preloader /> : undefined
        }
        <Users totalUsersCount={this.props.totalUsersCount}
                      currentPage={this.props.currentPage}
                      pageSize={this.props.pageSize}
                      users={this.props.users}
                      changePage={this.changePage}
                      followToogle={this.followToogle}/>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

const mapDispatchToProps = {    
        followToogle:followToggleAC,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC    
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);