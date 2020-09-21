import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfileTC, getStatusTC, updateStatusTC, savePhotoTC, saveProfileTC } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/redux-store';
import { ProfileType } from '../../types/types';

type StateType = {
    profile: ProfileType
    status: string
    isAuth: boolean,
    authId: number

    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: () => void
    savePhoto: () => void
    saveProfile: () => void
}

type DispatchType = {

}

type PropsType = StateType & DispatchType;

class ProfileContainer extends React.Component<PropsType>{
    
    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) 
            userId = this.props.authId;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    
    componentDidMount(){
        this.refreshProfile();        
    }

    componentDidUpdate(prevProps: PropsType){
        if (this.props.match.params.userId !== prevProps.match.params.userId)
            this.refreshProfile();
    }

    render() {
        return <Profile 
            {...this.props} 
            isOwner={!this.props.match.params.userId} 
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            saveProfile={this.props.saveProfile}
        />
    }
}

const mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authId: state.auth.id
})

const mapDispatchToProps = {
    getUserProfile: getUserProfileTC,
    getStatus: getStatusTC,
    updateStatus: updateStatusTC,
    savePhoto: savePhotoTC,
    saveProfile: saveProfileTC
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);