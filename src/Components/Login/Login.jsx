import React from 'react';
import { reduxForm, Field } from 'redux-form';
//import { Input } from '../common/Preloader/FormsControls/FormsControl';
import { required } from '../../util/validators/validators';
import Element from '../../hoc/withValidateComponent';
import { connect } from 'react-redux';
import { logoutTC, loginTC } from '../../Redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from './Login.module.css';

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth)
        return <Redirect to={'/profile'}/>

    return (
    <div>
        <h1>Login Form</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
    )
}

const Input = Element('input');

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} validate={required} placeholder="Email" name="email"/>
            </div>
            <div>
                <Field component={Input} validate={required} placeholder="Password" name="password" type="password"/>
            </div>
            <div>
                <Field component={Input} type={"checkbox"} name="rememberMe"/> Remember me?
            </div>
            {props.error && <div className={styles.error}>
                 {props.error}
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