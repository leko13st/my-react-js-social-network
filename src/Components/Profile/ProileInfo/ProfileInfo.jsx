import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileInfoReduxForm from './ProfileInfoForm';

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);

    const onPhotoChanged = (e) => {
        if (e.target.files.length)
            props.savePhoto(e.target.files[0]);
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    if (props.profile)
        return (
            <div className={s.profileInfo}>
                <img className={s.avatar} src={props.profile && props.profile.photos.large} alt="profile-logo" width="100%" height="200px" />
                {props.isOwner && <input type={'file'} onChange={onPhotoChanged}/>}
                <h3>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>                
                </h3>
                {editMode 
                ? <ProfileInfoReduxForm initialValues={props.profile} profile={props.profile} isOwner={props.isOwner} onSubmit={onSubmit}/>
                : <ProfileData toggleEditMode={() => setEditMode(true)} profile={props.profile} isOwner={props.isOwner}/> }
            </div>    
        )
    else return (
        <div></div>
    )
}

export default ProfileInfo;

const ProfileData = ({profile, isOwner, toggleEditMode, error}) => {
    return (
        <div>
            {isOwner && <button onClick={toggleEditMode}>edit</button>}
            <div>
                Full name: <b>{profile.fullName}</b>
            </div>
            <div>
                Looking for a job: <b>{profile.lookingForAJob ? 'yes' : 'no'}</b>
            </div>
            <div>
                My professional skills: <b>{profile.lookingForAJobDescription}</b>
            </div>
            <div>
                About me: <b>{profile.aboutMe}</b>
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>)}
            </div>
        </div>
    )
}

export const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
}