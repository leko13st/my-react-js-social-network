import React from 'react';
import p from './Post.module.css';

const Post = (props) => {
    return (
        <div className={p.post}>
            {props.text}
        </div>
    )
}

export default Post;