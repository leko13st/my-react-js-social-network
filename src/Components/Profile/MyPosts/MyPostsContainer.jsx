import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../Redux/profile-reducer'

const MyPostsContainer = (props) => {
    let newPostText = props.store.getState().profilePage.newPostText;

    let postData = props.store.getState().profilePage.postData;

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text);
        props.store.dispatch(action);
        debugger
    }

    return (<MyPosts updateNewPostText={onPostChange} 
                     addPost={addPost} 
                     postData={postData}
                     newPostText={newPostText}/>)
}

export default MyPostsContainer;