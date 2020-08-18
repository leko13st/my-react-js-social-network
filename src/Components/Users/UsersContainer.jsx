import React from 'react';
import * as axios from 'axios';
import { connect } from "react-redux";
import { followToogleAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC } from "../../Redux/users-reducer";
import Users from "./Users";
import preloader from "./../../assets/images/preloader.gif"
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`)
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         followToogle: (userId) => {
//             dispatch(followToogleAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageId) => {
//             dispatch(setCurrentPageAC(pageId));
//         },
//         setTotalUsersCount: (count) => {
//             dispatch(setTotalUsersCountAC(count));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         }
//     }
// }

const mapDispatchToProps = {    
        followToogle:followToogleAC,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPageAC,
        setTotalUsersCount: setTotalUsersCountAC,
        toggleIsFetching: toggleIsFetchingAC    
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);