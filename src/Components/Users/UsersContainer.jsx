import React from 'react';
import { connect } from "react-redux";
import { followToggleAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC, isFollowChangingAC } from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import { followAPI, userAPI } from '../../api/api';

class UsersContainer extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.getUsersRequest(this.props.currentPage);
    }

    getUsersRequest = (currentPage) => {
        userAPI.getUsers(currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        })
    }

    changePage = (pageId) => {
        this.props.setCurrentPage(pageId);
        this.getUsersRequest(pageId);
    }

    followToogle = (userId) => {
        this.props.isFollowChanging(true, userId);
        followAPI.getCheckingFollowed(userId).then(data => {
            if (!data){
                followAPI.postFollow(userId).then(data => {
                    if(data.resultCode === 0)
                        this.props.followToogle(userId);
                    this.props.isFollowChanging(false, userId);
                })
            }
            else{
                followAPI.deleteFollow(userId).then(data => {
                    if(data.resultCode === 0)
                        this.props.followToogle(userId);
                    this.props.isFollowChanging(false, userId);
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
                followToogle={this.followToogle}
                followingProgress={this.props.followingProgress}/>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}

const mapDispatchToProps = {    
        followToogle:followToggleAC,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC,
        isFollowChanging: isFollowChangingAC    
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);