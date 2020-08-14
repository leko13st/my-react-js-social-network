import React from 'react';
import {addMessageActionCreator, updateNewMessageActionCreator} from '../../../Redux/messages-reducer';
import MessageItem from './MessageItem';

const MessageItemContainer = (props) => {

    let newMessage = props.store.getState().messagePage.newMessage;

    let messageData = props.store.getState().messagePage.messageData;

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }

    let updateNewMessage = (text) => {
        props.store.dispatch(updateNewMessageActionCreator(text));
    }

    return(
        <MessageItem addMessage={addMessage} 
                     updateNewMessage={updateNewMessage} 
                     messageData={messageData} 
                     newMessage={newMessage}/>
    )
}

export default MessageItemContainer;