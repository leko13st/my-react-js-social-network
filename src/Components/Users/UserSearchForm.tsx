import { Formik, Form, Field } from 'formik'
import React from 'react';
import { useSelector } from 'react-redux';
import { FilterType } from '../../Redux/users-reducer';
import { getUsersFilter } from '../../Redux/users-selectors';

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

type FriendFormType = 'true' | 'false' | 'null'

type FormType = {
    term: string
    friend: FriendFormType
}

const UserSearchForm: React.FC<UserSearchFormPropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const Submit = (values: FormType, { setSubmitting }: SetSubmittingType) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }

    return(
        <Formik
        enableReinitialize={true}
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType}}
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