import React from 'react';
import s from './../Messages.module.css';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { required, maxLengthCreator } from '../../../util/validators/validators';
import Element from '../../../hoc/withValidateComponent';
import { createField } from '../../common/FormsControls/FormsControl';

const Message: React.FC<MessageType> = (props) => {
    return <div className={s.message}>{props.text}</div>
}

const MessageItem: React.FC<MessagePropsType> = (props) => {

    let messageItems = props.messageData.map(message => <Message id={message.id} text={message.text} key={message.id}/>)

    const addMessage = (data: MessageFormValuesType) => {
        props.addMessage(data.newMessage)
    }

    return(
        <div className={s.messages}>
            {messageItems}
            <MessageReduxForm onSubmit={addMessage}/>
        </div>
    )
}

const Textarea = Element('textarea');
const maxLength = maxLengthCreator(300);

const MessageForm: React.FC<InjectedFormProps<MessageFormValuesType, PropsType> & PropsType> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            {createField<NewMessageFormValuesKeys>('newMessage', 'Enter a Message', [required, maxLength], Textarea, '', '')}            
        </form>
    )
}

const MessageReduxForm = reduxForm<MessageFormValuesType>({
    form: 'message'
})(MessageForm)

export default MessageItem;

type NewMessageFormValuesKeys = Extract<keyof MessageFormValuesType, string>
type PropsType = {}

type MessageType = {
    id: number
    text: string
}

type MessagePropsType = {
    messageData: Array<MessageType>
    addMessage: (messageText: string) => void
}

type MessageFormValuesType = {
    newMessage: string
}
