import React from 'react';
import s from './../Messages.module.css';

const Message = (props) => {
    return <div className={s.message}>{props.message}</div>
}

const MessageItem = (props) => {
    let messageItems = props.messageData.map(message => <Message id={message.id} message={message.text}/>)

    let inputMessage = React.createRef();
    let addMessage = () => {
        props.addMessage();
    }

    let updateMessage = () => {
        let text = inputMessage.current.value;
        props.updateNewMessage(text);
    }

    let newMessage = props.newMessage;

    return(
        <div className={s.messages}>
            {messageItems}
            <form>
                <textarea onChange={updateMessage} ref={inputMessage} value={newMessage}></textarea>
                <input type="button" value="Добавить сообщение" onClick={addMessage}></input>
            </form>
        </div>
    )
}

export default MessageItem;