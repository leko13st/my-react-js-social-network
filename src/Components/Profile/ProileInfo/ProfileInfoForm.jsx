import React from 'react';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControl';
import { reduxForm } from 'redux-form';
import s from './ProfileInfo.module.css';

const ProfileInfoForm = ({ profile, isOwner, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            {isOwner && <button>save</button>}
            {error && <div className={s.error}>
                 {error}
            </div>}            
            <div>
                <b>Full name: </b> {createField('fullName', 'Fullname', [], Input, 'text')}
            </div>
            <div>
                <b>lookingForAJob:</b> {createField('lookingForAJob', null, [], Input, 'checkbox')}
            </div>
            <div>
                <b>My professional skills: </b> {createField('lookingForAJobDescription', 'Skills', [], Textarea, 'text')}
            </div>
            <div>
                <b>About me: </b> {createField('aboutMe', 'About me', [], Textarea, 'text')}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => <div key={key} className={s.contact}>
                    <b>{key}: </b> {createField('contacts.' + key, key, [], Input, 'text')}
                </div>)}
            </div>
        </form>
    )
}

const ProfileInfoReduxForm = reduxForm({
    form: 'profileForm'
})(ProfileInfoForm)

export default ProfileInfoReduxForm;