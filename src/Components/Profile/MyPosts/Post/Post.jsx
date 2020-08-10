import React from 'react';
import p from './Post.module.css';

const Post = (props) => {
    return (
        <div className={p.post}>
            <div>
                <img width="5%" src="https://svirtus.cdnvideo.ru/FgUlX76zex7HazA1yBTdCDC_hO0=/0x0:800x450/1200x1200/filters:quality(100)/https://hb.bizmrg.com/cybersportru-media/b5/b5727b466f807f050dd4de2a40768b30.jpg?m=0117492f0743a6801205f51735095747" />
            </div>
            {props.text}
        </div>
    )
}

export default Post;