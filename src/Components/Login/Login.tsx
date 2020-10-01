import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../util/validators/validators';
import Element from '../../hoc/withValidateComponent';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from '../../Redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from './Login.module.css';
import { createField } from '../common/FormsControls/FormsControl';
import { AppStateType } from '../../Redux/redux-store';

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginDataTypeKeys = Extract<keyof LoginDataType, string>

type OwnPropsType = {
    captchaUrl: string | null
}

export const LoginPage = () => {
    
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: LoginDataType) => {
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha))
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

const LoginForm: React.FC<InjectedFormProps<LoginDataType, OwnPropsType> & OwnPropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginDataTypeKeys>('email', 'Email', [required], Input, '')}
            {createField<LoginDataTypeKeys>('password', 'Password', [required], Input, 'password')}
            {createField<LoginDataTypeKeys>('rememberMe', '', null, Input, 'checkbox', 'Remember me?')}

            {captchaUrl && <img src={captchaUrl} alt='captcha' />}
            {captchaUrl && createField<LoginDataTypeKeys>('captcha', 'Captcha', [required], Input, '')}

            {error && <div className={styles.error}>
                 {error}
            </div>}
            
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginDataType, OwnPropsType>({
    form: 'login'
})(LoginForm)