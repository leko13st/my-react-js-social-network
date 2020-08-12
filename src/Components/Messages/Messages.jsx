import React from 'react';
import s from './Messages.module.css';
import DialogItem from './Dialog/Dialog';
import MessageItem from './Message/Message'

const Messages = (props) => {
    return(
        <div className={s.dialogs}>
            <DialogItem dialogData={props.state.dialogData}/>
            <MessageItem messageData={props.state.messageData}/>
        </div>
    )
}

export default Messages;