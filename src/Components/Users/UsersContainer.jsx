import React from 'react';
import { connect } from "react-redux";
import {getUsersThunkCreator, followToggleThunkCreator, setCurrentPageAC } from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsersSuper, getPageSize, getCurrentPage, getTotalUsersCount, getIsFetching, getFollowingProgress } from '../../Redux/users-selectors';

class UsersContainer extends React.Component{
    
    componentWillMount(){
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    changePage = (pageId) => {
        this.props.setCurrentPage(pageId);
        this.props.getUsers(pageId, this.props.pageSize);
    }

    followToogle = (userId) => {
        this.props.followToogle(userId);
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

// const mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingProgress: state.usersPage.followingProgress
//     }
// }

const mapStateToProps = (state) => {
    return {
        users: getUsersSuper(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}
// const disp = (dispatch) => {
//     return{
//         func: (body) => dispatch(funcAC(body))
//     }
// }

const mapDispatchToProps = {
    setCurrentPage: setCurrentPageAC,
    followToogle: followToggleThunkCreator,
    getUsers: getUsersThunkCreator
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer);