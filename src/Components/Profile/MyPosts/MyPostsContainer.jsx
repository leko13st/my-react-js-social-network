import MyPosts from "./MyPosts";
import {actions} from '../../../Redux/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData
    }
}

let mapDispatchToProps = {
    addPost: actions.addPostAC
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;