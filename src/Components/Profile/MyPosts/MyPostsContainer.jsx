import MyPosts from "./MyPosts";
import {addPostAC} from '../../../Redux/profile-reducer';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData
    }
}

let mapDispatchToProps = {
    addPost: addPostAC
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;