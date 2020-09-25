import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (formData: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
    return(
        <div className={s.profile}>
            <ProfileInfo profile={props.profile} 
                         status={props.status} 
                         updateStatus={props.updateStatus} 
                         isOwner={props.isOwner} 
                         savePhoto={props.savePhoto} 
                         saveProfile={props.saveProfile}/>            
            <MyPostsContainer />
        </div>
    )
}

export default Profile;