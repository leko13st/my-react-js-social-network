import { ValidatorFieldType } from '../../../util/validators/validators';
import React from 'react';
import styles from './FormsControl.module.css'
import { Field, WrappedFieldProps } from 'redux-form';

type ElementType = {
    [x: string]: any
    input: any
    meta: {
        touched: boolean
        error: string
    }
}

// export const Textarea: React.FC<WrappedFieldProps> = ({meta: {touched, error}, ...props}) => {
export const Textarea: React.FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <textarea {...input} {...props}/>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta: {touched, error}, ...props}) => {
// export const Input: React.FC<ElementType> = ({meta: {touched, error}, ...props}) => {

    const hasError = touched && error;

    return(
        <div className={styles.formControl + " " + (hasError ? styles.error : '')}>
            <input {...input} {...props}/>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export function createField<LoginDataType extends string>(name: LoginDataType, placeholder: string | undefined, validators: Array<ValidatorFieldType> | null, component: React.FC<WrappedFieldProps>, type: string, text = '') {
    return (
        <div>
            <Field component={component} validate={validators} placeholder={placeholder} name={name} type={type} />
            {text}
        </div>
    );
}

export type GetStringKeys<T> = Extract<keyof T, string>