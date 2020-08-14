import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from './ProileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return(
        <div className={s.profile}>
            <ProfileInfo />            
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;