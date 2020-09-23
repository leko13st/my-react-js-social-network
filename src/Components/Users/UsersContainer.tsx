import React from 'react';
import { connect } from "react-redux";
import { actions, followToggleThunkCreator, getUsersThunkCreator } from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsersSuper, getPageSize, getCurrentPage, getTotalUsersCount, getIsFetching, getFollowingProgress } from '../../Redux/users-selectors';
import { UsersType } from '../../types/types';
import { AppStateType } from '../../Redux/redux-store';

type StatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingProgress: Array<number>
}

type DispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageId: number) => void
    followToogle: (idUser: number) => void
}

type OwnPropsType = {
    //Пропсы, проброшенные напрямую (не через connect)
}

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType>{
    
    componentWillMount(){
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onChangePage = (pageId: number) => {
        this.props.setCurrentPage(pageId);
        this.props.getUsers(pageId, this.props.pageSize);
    }

    followToogle = (userId: number) => {
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
                onChangePage={this.onChangePage}
                followToogle={this.followToogle}
                followingProgress={this.props.followingProgress}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        users: getUsersSuper(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}

const mapDispatchToProps: DispatchPropsType = {
    setCurrentPage: actions.setCurrentPageAC,
    followToogle: followToggleThunkCreator,
    getUsers: getUsersThunkCreator
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    //connect<StatePropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps) - alternative way!!!
    //withAuthRedirect
)(UsersContainer);