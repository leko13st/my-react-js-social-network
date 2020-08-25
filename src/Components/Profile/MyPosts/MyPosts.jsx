import React from 'react';
import Post from "./Post/Post";
import { reduxForm, Field } from 'redux-form';

const MyPosts = (props) => {
    let PostsItems = props.postData.map(post => <Post id={post.id} key={post.id} text={post.text}/>)

    return (
        <div>
            <MyPostsReduxForm {...props}/>
            My Posts
            {PostsItems}
        </div>
    )
}

const MyPostForm = (props) => {
    let addPost = () => {
        props.addPost();
    }

    let onPostChange = (e) => {
        let text = e.currentTarget.value;
        props.updateNewPostText(text);
    }

    let newPostText = props.newPostText;

    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} onChange={onPostChange} value={newPostText} name={'postText'} />
            <button onClick={addPost}>Добавить пост</button>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({
    form: 'posts'
})(MyPostForm)

export default MyPosts;