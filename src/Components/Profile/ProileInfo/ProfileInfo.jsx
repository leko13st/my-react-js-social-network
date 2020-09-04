import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {

    const onPhotoChanged = (e) => {
        if (e.target.files.length)
            props.savePhoto(e.target.files[0]);
    }
    debugger
    return (
        <div className={s.profileInfo}>
            <img className={s.avatar} src={props.profile && props.profile.photos.large} alt="profile-logo" width="100%" height="200px" />
            {props.isOwner && <input type={'file'} onChange={onPhotoChanged}/>}
            <h3>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>                
            </h3>
            Description ^_^;
            {/* <img src={props.profile ? props.profile.photos.large : 'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'} alt="profile-image"/> */}
            
        </div>
    )
}

export default ProfileInfo;