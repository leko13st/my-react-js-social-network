import React from 'react';
import Post from "./Post/Post";

let PostsData = [
    {id: "1", text: "Hello, I'm Stas. It's my first post on this site!"},
    {id: "2", text: "Hey, wthat's up?"},
    {id: "3", text: "Hi, there is just a post: good luck!"}
]

let PostsItems = PostsData.map(post => <Post id={post.id} text={post.text}/>)

const MyPosts = () => {
    return (
        <div>
            <form>
                <textarea></textarea>
                <input type="button" value="Добавить пост"></input>
            </form>
            My Posts
           {PostsItems}
        </div>
    )
}

export default MyPosts;