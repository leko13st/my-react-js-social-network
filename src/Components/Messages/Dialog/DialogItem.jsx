import React from 'react';
import s from './../Messages.module.css';
import {NavLink} from "react-router-dom"

const Dialog = (props) => {
    return (
        <div className={s.dialogName}>
                <NavLink to={"/messages/" + props.id}>
                    {props.name}
                </NavLink>
        </div>
    )
}

const DialogItem = (props) => {
    let dialogItems = props.dialogData.map(person => <Dialog name={person.name} id={person.id} key={person.id}/>)
    
    return(
        <div className={s.dialogsItems}>
            Dialogs:
            {dialogItems}
        </div>
    )
}

export default DialogItem;