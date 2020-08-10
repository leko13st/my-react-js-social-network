import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from './ProileInfo/ProfileInfo';


const Profile = () => {
    return(
        <div className={s.profile}>
            <ProfileInfo />            
            <MyPosts />
        </div>
    )
}

export default Profile;