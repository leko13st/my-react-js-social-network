import React from 'react';
import Post from "./Post/Post";
import { reduxForm, Field } from 'redux-form';

const MyPosts = (props) => {
    let PostsItems = props.postData.map(post => <Post id={post.id} key={post.id} text={post.text}/>)

    const addPost = (data) => {
        props.addPost(data.postText);
    }

    return (
        <div>
            <MyPostsReduxForm onSubmit={addPost}/>
            My Posts
            {PostsItems}
        </div>
    )
}

const MyPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'postText'} />
            <button>Добавить пост</button>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({
    form: 'posts'
})(MyPostForm)

export default MyPosts;