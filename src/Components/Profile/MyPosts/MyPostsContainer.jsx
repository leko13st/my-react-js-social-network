import React from 'react';
import MyPosts from "./MyPosts";
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../Redux/profile-reducer';
import { connect } from 'react-redux';

// const MyPostsContainer = (props) => {
//     return (
//         <StoreContext.Consumer> 
//         {
//             (store) => {
//                 let newPostText = store.getState().profilePage.newPostText;

//                 let postData = store.getState().profilePage.postData;

//                 let addPost = () => {
//                     store.dispatch(addPostActionCreator());
//                 }

//                 let onPostChange = (text) => {
//                     let action = updateNewPostTextActionCreator(text);
//                     store.dispatch(action);
//                 }
//                 return <MyPosts updateNewPostText={onPostChange} 
//                                 addPost={addPost} 
//                                 postData={postData}
//                                 newPostText={newPostText}/>
//             }
//         }    
//         </StoreContext.Consumer>
//     )    
// }

let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text);
            dispatch(action);
        }
    }
}

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;