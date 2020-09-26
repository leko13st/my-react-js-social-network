import React, { ChangeEvent, useState } from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileInfoReduxForm from './ProfileInfoForm';
import { ProfileType, ContactsType } from '../../../types/types';
import userPhoto from './../../../assets/images/user-ava.jpg'

type PropsType = {
    profile: ProfileType | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);

    const onPhotoChanged = (e: ChangeEvent<HTMLInputElement>) => {
        //if (e.target.files && e.target.files.length
        if (e.target.files?.length)
            props.savePhoto(e.target.files[0]);
    }

    const onSubmit = (formData: ProfileType) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    }

    if (props.profile)
        return (
            <div className={s.profileInfo}>
                <img className={s.avatar} src={props.profile.photos.large || userPhoto} alt="profile-logo" width="100%" height="200px" />
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

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    toggleEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, toggleEditMode}) => {
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
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>)}
            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}: </b>{contactValue}</div>
}