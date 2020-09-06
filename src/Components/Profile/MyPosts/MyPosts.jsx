import React from 'react';
import Post from "./Post/Post";
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthCreator } from '../../../util/validators/validators';
import Element from '../../../hoc/withValidateComponent';
import styles from './MyPosts.module.css';

const MyPosts = React.memo((props) => {
    let PostsItems = [...props.postData] // [...props.postData] --- необходимо брать копию пропсов, так что reverse() работал всегда одинаково. Иначе props будут меняться постоянно.
                     .reverse()
                     .map(post => <Post id={post.id} key={post.id} text={post.text}/>)

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
})

const Textarea = Element('textarea');
const maxLength10 = maxLengthCreator(10);

const MyPostForm = (props) => {
    return(
        <form className={styles.post} onSubmit={props.handleSubmit}>
            <Field component={Textarea} name={'postText'} validate={[required, maxLength10]}/>
            <button>Добавить пост</button>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({
    form: 'posts'
})(MyPostForm)

export default MyPosts;