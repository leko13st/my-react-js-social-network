import MyPosts, { MyPostsDispatchType, MyPostsStateType } from "./MyPosts";
import {actions} from '../../../Redux/profile-reducer';
import { connect } from 'react-redux';
import { AppStateType } from "../../../Redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        postData: state.profilePage.postData
    }
}

let mapDispatchToProps = {
    addPost: actions.addPostAC
}

let MyPostsContainer = connect<MyPostsStateType, MyPostsDispatchType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;