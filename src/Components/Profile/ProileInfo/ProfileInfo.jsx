import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) =>{
    debugger
    return (
        <div>
            <img src="https://memepedia.ru/wp-content/uploads/2018/08/papich.jpg" width="100%" height="200px" />
            <h3>
                <ProfileStatus status={'test status'}/>                
            </h3>
            Description ^_^;
            {/* <img src={props.profile ? props.profile.photos.large : 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'} alt="profile-image"/> */}
            
        </div>
    )
}

export default ProfileInfo;