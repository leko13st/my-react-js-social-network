import React from 'react';
import { reduxForm } from 'redux-form';
import { required } from '../../util/validators/validators';
import Element from '../../hoc/withValidateComponent';
import { connect } from 'react-redux';
import { logoutTC, loginTC } from '../../Redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from './Login.module.css';
import { createField } from '../common/FormsControls/FormsControl';

const Login = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth)
        return <Redirect to={'/profile'}/>

    return (
    <div>
        <h1>Login Form</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
    )
}

const Input = Element('input');

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('email', 'Email', [required], Input, '')}
            {createField('password', 'Password', [required], Input, 'password')}
            {createField('rememberMe', null, null, Input, 'checkbox', 'Remember me?')}

            {captchaUrl && <img src={captchaUrl} alt='captcha' />}
            {captchaUrl && createField('captcha', 'Captcha', [required], Input, '')}

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

const mapStateToProps = (state) => ({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
})

const mapDispatchToProps = {
    login: loginTC,
    logout: logoutTC
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);