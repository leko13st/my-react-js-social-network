import React from 'react';
import Post from "./Post/Post";
import { reduxForm, InjectedFormProps } from 'redux-form';
import { required, maxLengthCreator } from '../../../util/validators/validators';
import Element from '../../../hoc/withValidateComponent';
import styles from './MyPosts.module.css';
import { createField, GetStringKeys } from '../../common/FormsControls/FormsControl';
import { PostDataType } from '../../../types/types';

type MyPostsType = {
    postData: Array<PostDataType>
    addPost: (postText: string) => void
}

const MyPosts: React.FC<MyPostsType> = (props) => {
    let PostsItems = [...props.postData] // [...props.postData] --- необходимо брать копию пропсов, так что reverse() работал всегда одинаково. Иначе props будут меняться постоянно.
                     .reverse()
                     .map(post => <Post id={post.id} key={post.id} text={post.text}/>)

    const addPost = (data: AddPostFormValuesType) => {
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

const Textarea = Element('textarea');
const maxLength10 = maxLengthCreator(10);

type MyPostFormType = {}

type AddPostFormValuesType = {
    postText: string
}

type AddPostFormValuesKeys = GetStringKeys<AddPostFormValuesType>

const MyPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, MyPostFormType> & MyPostFormType> = (props) => {
    return(
        <form className={styles.post} onSubmit={props.handleSubmit}>
            { createField<AddPostFormValuesKeys>('postText', 'Type a text', [required, maxLength10], Textarea, '', '')}
            <button>Добавить пост</button>
        </form>
    )
}

const MyPostsReduxForm = reduxForm<AddPostFormValuesType>({
    form: 'posts'
})(MyPostForm)

const MyPostsMemo = React.memo(MyPosts)

export default MyPostsMemo;