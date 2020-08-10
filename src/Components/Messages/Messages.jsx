import React from 'react';
import s from './Messages.module.css';
import {NavLink} from "react-router-dom"

const DialogItem = (props) => {
    return (
        <div className={s.dialogName}>
                <NavLink to={"/messages/" + props.id}>
                    {props.name}
                </NavLink>
        </div>
    )
}

const Message = (props) => {
return <div className={s.message}>{props.message}</div>
}

let dialogData = [
    {id: "1", name: "Viktor"},
    {id: "2", name: "Sasha"},
    {id: "3", name: "Pasha"},
    {id: "4", name: "Zhenya"}
]

let dialogItems = dialogData.map(person => <DialogItem name={person.name} id={person.id}/>)

let messageData = [
    {id: "1", text: "Hi"},
    {id: "2", text: "How are you?"},
    {id: "3", text: "What are you doing?"}

]

let messageItems = messageData.map(message => <Message id={message.id} message={message.text}/>)

const Messages = () => {
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                Dialogs:
                {dialogItems}
            </div>
            <div className={s.messages}>
                {messageItems}
            </div>
        </div>
    )
}

export default Messages;