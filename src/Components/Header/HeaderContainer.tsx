import React from 'react';
import Header, { DispatchPropsType, StatePropsType } from './Header';
import { connect } from 'react-redux';
import { logoutTC } from '../../Redux/auth-reducer'
import { AppStateType } from '../../Redux/redux-store';

class HeaderContainer extends React.Component<StatePropsType & DispatchPropsType> {
    
    render() {
        return(
            <Header {...this.props}/>
        )
    }   
}

const mapStateToProps = (state: AppStateType) => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = {
    logout: logoutTC
}

export default connect<StatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer);