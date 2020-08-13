import React from 'react';
import s from './Messages.module.css';
import DialogItem from './Dialog/Dialog';
import MessageItem from './Message/Message'

const Messages = (props) => {
    return(
        <div className={s.dialogs}>
            <DialogItem dialogData={props.messagePage.dialogData}/>
            <MessageItem messageData={props.messagePage.messageData}
                         newMessage={props.messagePage.newMessage}
                         dispatch={props.dispatch}/>
        </div>
    )
}

export default Messages;