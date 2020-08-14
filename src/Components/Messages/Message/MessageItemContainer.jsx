import React from 'react';
import {addMessageActionCreator, updateNewMessageActionCreator} from '../../../Redux/messages-reducer';
import MessageItem from './MessageItem';
import StoreContext from '../../../StoreContext';

const MessageItemContainer = (props) => {    
    return(
        <StoreContext.Consumer> 
        {
            (store) => {
                let newMessage = store.getState().messagePage.newMessage;
            
                let messageData = store.getState().messagePage.messageData;
            
                let addMessage = () => {
                    store.dispatch(addMessageActionCreator());
                }
            
                let updateNewMessage = (text) => {
                    store.dispatch(updateNewMessageActionCreator(text));
                }
                
                return <MessageItem addMessage={addMessage} 
                                    updateNewMessage={updateNewMessage} 
                                    messageData={messageData} 
                                    newMessage={newMessage}/>            
            }
        }            
        </StoreContext.Consumer>
    )
}

export default MessageItemContainer;