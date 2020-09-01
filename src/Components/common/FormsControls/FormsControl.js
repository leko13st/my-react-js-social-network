import React from 'react';
import styles from './FormsControl.module.css'
import { Field } from 'redux-form';

export const Textarea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    debugger

    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <textarea {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    debugger

    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <input {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (name, placeholder, validators, component, type, text = '') => {
    return(
        <div>
            <Field component={component} validate={validators} placeholder={placeholder} name={name} type={type}/>
            {text}
        </div>
    )

}