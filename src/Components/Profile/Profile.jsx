import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts"

const Profile = () => {
    return(
        <div className={s.profile}>
            <div>
                <img src="https://memepedia.ru/wp-content/uploads/2018/08/papich.jpg" width="100%" height="200px"/>          
            </div>
            <div>
                <img width="20%" src="https://svirtus.cdnvideo.ru/FgUlX76zex7HazA1yBTdCDC_hO0=/0x0:800x450/1200x1200/filters:quality(100)/https://hb.bizmrg.com/cybersportru-media/b5/b5727b466f807f050dd4de2a40768b30.jpg?m=0117492f0743a6801205f51735095747"/>
            </div>
            <MyPosts />
         </div>
    )
}

export default Profile;