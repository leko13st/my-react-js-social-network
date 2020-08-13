import React from 'react';
import Post from "./Post/Post";
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../State/state'

const MyPosts = (props) => {
    let PostsItems = props.postData.map(post => <Post id={post.id} text={post.text}/>)

    let inputPost = React.createRef();
    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = inputPost.current.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <div>
            <form>
                <textarea onChange={onPostChange} ref={inputPost} value={props.newPostText} />
                <input type="button" value="Добавить пост" onClick={addPost}></input>
            </form>
            My Posts
           {PostsItems}
        </div>
    )
}

export default MyPosts;