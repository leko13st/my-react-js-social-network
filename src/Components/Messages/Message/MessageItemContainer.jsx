import React from 'react';
import {addMessageActionCreator, updateNewMessageActionCreator} from '../../../Redux/messages-reducer';
import MessageItem from './MessageItem';
import StoreContext from '../../../StoreContext';
import { connect } from 'react-redux';

// const MessageItemContainer = (props) => {    
//     return(
//         <StoreContext.Consumer> 
//         {
//             (store) => {
//                 let newMessage = store.getState().messagePage.newMessage;
            
//                 let messageData = store.getState().messagePage.messageData;
            
//                 let addMessage = () => {
//                     store.dispatch(addMessageActionCreator());
//                 }
            
//                 let updateNewMessage = (text) => {
//                     store.dispatch(updateNewMessageActionCreator(text));
//                 }
                
//                 return <MessageItem addMessage={addMessage} 
//                                     updateNewMessage={updateNewMessage} 
//                                     messageData={messageData} 
//                                     newMessage={newMessage}/>            
//             }
//         }            
//         </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        messageData: state.messagePage.messageData,
        newMessage: state.messagePage.newMessage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        updateNewMessage: (text) => {
            dispatch(updateNewMessageActionCreator(text))
        }
    }
}

let MessageItemContainer = connect(mapStateToProps, mapDispatchToProps)(MessageItem);

export default MessageItemContainer;