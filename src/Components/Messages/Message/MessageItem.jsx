import React from 'react';
import s from './../Messages.module.css';
import { reduxForm, Field } from 'redux-form';

const Message = (props) => {
    return <div className={s.message}>{props.message}</div>
}

const MessageItem = (props) => {
    let messageItems = props.messageData.map(message => <Message id={message.id} message={message.text} key={message.id}/>)

    return(
        <div className={s.messages}>
            {messageItems}
            <MessageReduxForm {...props}/>
        </div>
    )
}

const MessageForm = (props) => {
    let addMessage = () => {
        props.addMessage();
    }

    let updateMessage = (e) => {
        let text = e.currentTarget.value;
        props.updateNewMessage(text);
    }

    let newMessage = props.newMessage;

    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} onChange={updateMessage} value={newMessage} name={'messageText'} />
            <button onClick={addMessage}>Добавить сообщение</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    form: 'message'
})(MessageForm)

export default MessageItem;