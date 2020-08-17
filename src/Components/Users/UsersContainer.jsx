import { connect } from "react-redux";
import { followToogleAC, setUsersAC, setCurrentPageAC, setTotalUsersCountAC } from "../../Redux/users-reducer";
import UsersAPIContainer from "./UsersAPIContainer";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followToogle: (userId) => {
            dispatch(followToogleAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageId) => {
            dispatch(setCurrentPageAC(pageId));
        },
        setTotalUsersCount: (count) => {
            dispatch(setTotalUsersCountAC(count));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersAPIContainer);