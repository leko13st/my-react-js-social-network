import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts"
import ProfileInfo from './ProileInfo/ProfileInfo';

const Profile = (props) => {
    return(
        <div className={s.profile}>
            <ProfileInfo />            
            <MyPosts postData={props.profilePage.postData}
                     newPostText={props.profilePage.newPostText}
                     dispatch={props.dispatch}/>
        </div>
    )
}

export default Profile;