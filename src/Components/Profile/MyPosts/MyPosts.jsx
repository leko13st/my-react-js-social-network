import React from 'react';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            My Posts
            <Post text="Hello, I'm Stas. It's my first post on this site!"/>
            <Post text="Hi, there is just a post: good luck!"/>
        </div>
    )
}

export default MyPosts;