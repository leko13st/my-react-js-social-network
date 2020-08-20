import React from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfileAC } from '../../Redux/profile-reducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component{

    componentDidMount(){
        let userId = this.props.match.params.userId;

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + (userId ? userId : ''), {
            withCredentials: true
        })
        .then((response) => {
            this.props.setUserProfile(response.data);
        })
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile} />
    }
}

const mapStateToProps = (state) => ({
    profile: state.profilePage.profile
})

const mapDispatchToProps = {
    setUserProfile: setUserProfileAC
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, mapDispatchToProps)(WithUrlDataContainerComponent);