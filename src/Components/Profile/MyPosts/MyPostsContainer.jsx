import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../Redux/profile-reducer'
import StoreContext from '../../../StoreContext';

const MyPostsContainer = (props) => {
    return (
        <StoreContext.Consumer> 
        {
            (store) => {
                let newPostText = store.getState().profilePage.newPostText;

                let postData = store.getState().profilePage.postData;

                let addPost = () => {
                    store.dispatch(addPostActionCreator());
                }

                let onPostChange = (text) => {
                    let action = updateNewPostTextActionCreator(text);
                    store.dispatch(action);
                }
                return <MyPosts updateNewPostText={onPostChange} 
                                addPost={addPost} 
                                postData={postData}
                                newPostText={newPostText}/>
            }
        }    
        </StoreContext.Consumer>
    )    
}

export default MyPostsContainer;