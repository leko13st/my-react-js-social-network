import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return(
        <div className={s.profile}>
            <ProfileInfo profile={props.profile}/>            
            <MyPostsContainer store={props.store}/>
        </div>
    )
}

export default Profile;