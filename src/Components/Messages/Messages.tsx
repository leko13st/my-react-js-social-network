import React from 'react';
import s from './Messages.module.css';
//import DialogItem from './Dialog/DialogItem';
import MessageItemContainer from './Message/MessageItemContainer'

const Messages = () => {
    return(
        <div className={s.dialogs}>
            {/* <DialogItem dialogData={props.store.getState().messagePage.dialogData}/> */}
            <MessageItemContainer/>
        </div>
    )
}

export default Messages;