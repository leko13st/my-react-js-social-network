import React from 'react';
import { reduxForm } from 'redux-form';
import { required } from '../../util/validators/validators';
import Element from '../../hoc/withValidateComponent';
import { connect } from 'react-redux';
import { logoutTC, loginTC } from '../../Redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from './Login.module.css';
import { createField } from '../common/FormsControls/FormsControl';

const Login = ({login, isAuth}) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth)
        return <Redirect to={'/profile'}/>

    return (
    <div>
        <h1>Login Form</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
    )
}

const Input = Element('input');

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', 'Email', [required], Input, '')}
            {createField('password', 'Password', [required], Input, 'password')}
            {createField('rememberMe', null, null, Input, 'checkbox', 'Remember me?')}
            {error && <div className={styles.error}>
                 {error}
            </div>}
            
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = {
    login: loginTC,
    logout: logoutTC
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);