import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUserDataAC } from '../../Redux/auth-reducer'
import { authAPI } from '../../api/api';

class HeaderContainer extends React.Component {
    componentDidMount(){
        authAPI.authUser().then((data) => {
            if (data.resultCode === 0){
                let {id, email, login} = data.data;
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