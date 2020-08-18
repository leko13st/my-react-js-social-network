import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from './ProileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

class ProfileContainer extends React.Component{
    render() {
        return (
            <div className={s.profile}>
                <ProfileInfo />            
                <MyPostsContainer store={props.store}/>
            </div>
        )
    }
}

export default ProfileContainer;