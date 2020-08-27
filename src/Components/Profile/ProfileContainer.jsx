import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfileTC, getStatusTC, updateStatusTC } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component{
    componentDidMount(){
        let userId = this.props.match.params.userId;
        if (!userId) userId = this.props.authorizedUserId;
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
    getUserProfile: getUserProfileTC,
    getStatus: getStatusTC,
    updateStatus: updateStatusTC
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    //withAuthRedirect
)(ProfileContainer);