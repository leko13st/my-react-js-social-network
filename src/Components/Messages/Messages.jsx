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

const Messages = () => {
    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                Dialogs:
                <DialogItem name="Viktor" id="1"/>
                <DialogItem name="Sasha" id="2"/>
                <DialogItem name="Pasha" id="3"/>
                <DialogItem name="Misha" id="4"/>
                <DialogItem name="Valera" id="5"/>
            </div>
            <div className={s.messages}>
                <Message message="Hi"/>
                <Message message="How are you?"/>
                <Message message="What are you doing?"/>
            </div>
        </div>
    )
}

export default Messages;