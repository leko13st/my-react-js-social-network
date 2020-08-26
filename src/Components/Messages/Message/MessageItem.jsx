import React from 'react';
import s from './../Messages.module.css';
import { reduxForm, Field } from 'redux-form';

const Message = (props) => {
    return <div className={s.message}>{props.message}</div>
}

const MessageItem = (props) => {
    let messageItems = props.messageData.map(message => <Message id={message.id} message={message.text} key={message.id}/>)

    const addMessage = (data) => {
        props.addMessage(data.messageText)
    }

    return(
        <div className={s.messages}>
            {messageItems}
            <MessageReduxForm onSubmit={addMessage}/>
        </div>
    )
}

const MessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'messageText'} />
            <button>Добавить сообщение</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    form: 'message'
})(MessageForm)

export default MessageItem;