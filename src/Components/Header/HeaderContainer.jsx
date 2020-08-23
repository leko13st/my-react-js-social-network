import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthUserDataTC } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {
    componentDidMount(){
        this.props.getAuthUserData();
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
    getAuthUserData: getAuthUserDataTC
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);