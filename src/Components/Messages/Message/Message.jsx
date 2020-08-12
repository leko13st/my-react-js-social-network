import React from 'react';
import s from './../Messages.module.css';
import {NavLink} from "react-router-dom"

const Message = (props) => {
    return <div className={s.message}>{props.message}</div>
}

const MessageItem = (props) => {
    let messageItems = props.messageData.map(message => <Message id={message.id} message={message.text}/>)

    let inputMessage = React.createRef();
    let addMessage = () => {
        alert(inputMessage.current.value);
    }

    return(
        <div className={s.messages}>
            {messageItems}
            <textarea ref={inputMessage}></textarea>
            <button onClick={addMessage}>Добавить сообщение</button>
        </div>
    )
}

export default MessageItem;