import { Formik, Form, Field } from 'formik'
import React from 'react';
import { FilterType } from '../../Redux/users-reducer';

const UserSearchFormValidate = (values: any) => {
    const errors = {};    
    return errors;
}

type SetSubmittingType = {
    setSubmitting: (setSubmitting: boolean) => void
}

type UserSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UserSearchForm: React.FC<UserSearchFormPropsType> = React.memo((props) => {

    const Submit = (values: FilterType, { setSubmitting }: SetSubmittingType) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    }

    return(
        <Formik
        initialValues={{ term: '', friend: null}}
        validate={UserSearchFormValidate}
        onSubmit={Submit}
        >
        {({ isSubmitting }) => (
            <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
                Find
            </button>
            </Form>
        )}
        </Formik>
    )
})

export default UserSearchForm