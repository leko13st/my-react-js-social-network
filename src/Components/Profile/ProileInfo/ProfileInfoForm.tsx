import React from 'react';
import { createField, GetStringKeys, Input, Textarea } from '../../common/FormsControls/FormsControl';
import { InjectedFormProps, reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';
import { ProfileType } from '../../../types/types';

type PropsType = {
    profile: ProfileType
    isOwner: boolean
}

type ProfileInfoFormKeys = GetStringKeys<ProfileType>

const ProfileInfoForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({ profile, isOwner, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {isOwner && <button>save</button>}
            {error && <div className={s.error}>
                 {error}
            </div>}            
            <div>
                <b>Full name: </b> {createField<ProfileInfoFormKeys>('fullName', 'Fullname', [], Input, 'text')}
            </div>
            <div>
                <b>lookingForAJob:</b> {createField<ProfileInfoFormKeys>('lookingForAJob', '', [], Input, 'checkbox')}
            </div>
            <div>
                <b>My professional skills: </b> {createField<ProfileInfoFormKeys>('lookingForAJobDescription', 'Skills', [], Textarea, 'text')}
            </div>
            <div>
                <b>About me: </b> {createField<ProfileInfoFormKeys>('aboutMe', 'About me', [], Textarea, 'text')}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => <div key={key} className={s.contact}>
                    <b>{key}: </b> {createField('contacts.' + key, key, [], Input, 'text')}
                </div>)}
            </div>
        </form>
    )
}

const ProfileInfoReduxForm = reduxForm<ProfileType, PropsType>({
    form: 'profileForm'
})(ProfileInfoForm)

export default ProfileInfoReduxForm;