import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logoutTC } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {
    
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
    logout: logoutTC
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);