import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})

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
const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to={'/login'} />
        else return <Component {...props} />
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;