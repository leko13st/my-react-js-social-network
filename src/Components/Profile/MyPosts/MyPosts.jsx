import React from 'react';
import Post from "./Post/Post";

const MyPosts = (props) => {
    let PostsItems = props.postData.map(post => <Post id={post.id} text={post.text}/>)

    let inputPost = React.createRef();
    let addPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = inputPost.current.value;
        props.updateNewPostText(text);
    }

    let newPostText = props.newPostText;

    return (
        <div>
            <form>
                <textarea onChange={onPostChange} ref={inputPost} value={newPostText} />
                <input type="button" value="Добавить пост" onClick={addPost}></input>
            </form>
            My Posts
           {PostsItems}
        </div>
    )
}

export default MyPosts;