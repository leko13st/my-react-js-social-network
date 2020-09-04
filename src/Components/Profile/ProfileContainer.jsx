import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfileTC, getStatusTC, updateStatusTC, savePhotoTC } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
    
    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) userId = this.props.authId;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
    
    componentDidMount(){
        this.refreshProfile();        
    }

    componentDidUpdate(prevProps){
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
            savePhoto={this.props.savePhoto}/>
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    authId: state.auth.id
})

const mapDispatchToProps = {
    getUserProfile: getUserProfileTC,
    getStatus: getStatusTC,
    updateStatus: updateStatusTC,
    savePhoto: savePhotoTC
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);