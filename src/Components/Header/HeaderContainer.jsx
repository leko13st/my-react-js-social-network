import React from 'react';
import Header from './Header';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { setAuthUserDataAC } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {
    componentDidMount(){
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
        .then((response) => {
            if (response.data.resultCode === 0){
                let {id, email, login} = response.data.data;
                this.props.setAuthUserData(id, email, login);
            }
        })
    }
    
    render() {
        return(
            <Header {...this.props}/>
        )
    }   
}

const mapStateToProps = (state) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
    setAuthUserData: setAuthUserDataAC
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);