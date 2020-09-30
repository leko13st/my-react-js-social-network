import React from 'react';
import { connect } from "react-redux";
import { actions, FilterType, followToggleThunkCreator, getUsersThunkCreator } from "../../Redux/users-reducer";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getUsersSuper, getPageSize, getCurrentPage, getTotalUsersCount, getIsFetching, getFollowingProgress, getUsersFilter } from '../../Redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/redux-store';

class UsersContainer extends React.Component<PropsType>{
    
    componentWillMount(){
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
    }

    onChangePage = (pageId: number) => {
        this.props.setCurrentPage(pageId);
        this.props.getUsers(pageId, this.props.pageSize, this.props.filter);
    }

    followToogle = (userId: number) => {
        this.props.followToogle(userId);
    }

    onFilterChanged = (filter: FilterType) => {
        const {pageSize, currentPage} = this.props
        this.props.getUsers(currentPage, pageSize, filter);
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
                onFilterChanged={this.onFilterChanged}
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
        followingProgress: getFollowingProgress(state),
        filter: getUsersFilter(state)
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

type StatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingProgress: Array<number>
    filter: FilterType
}

type DispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    setCurrentPage: (pageId: number) => void
    followToogle: (idUser: number) => void    
}

type OwnPropsType = {
    //Пропсы, проброшенные напрямую (не через connect)
}

type PropsType = StatePropsType & DispatchPropsType & OwnPropsType
