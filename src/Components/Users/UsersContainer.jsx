import { connect } from "react-redux";
import { followToogleAC, setUsersAC } from "../../Redux/users-reducer";
import Users from "./Users";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        follow_toogle: (userId) => {
            dispatch(followToogleAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);