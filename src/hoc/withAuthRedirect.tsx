import { AppStateType } from '../Redux/redux-store';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

type MapStateType = {
    isAuth: boolean
}

// const withAuthRedirect = (Component) => {
//     class RedirectComponent extends React.Component{
//         render(){
//             if (!this.props.isAuth) return <Redirect to={'/login'}/>
//             else return <Component {...this.props} />
//         }
//     }

//     return connect(mapStateToPropsForRedirect)(RedirectComponent);
// }

//Обёртка функциональной компоненты в HOC 
const withAuthRedirect = <WCP extends {}>(WrappedComponent: React.ComponentType<WCP>) => {
    const RedirectComponent = (props: MapStateType) => {

        let {isAuth, ...restProps} = props
        

        if (!props.isAuth) return <Redirect to={'/login'} />
        return <WrappedComponent {...restProps as WCP} />
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;