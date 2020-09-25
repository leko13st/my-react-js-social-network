import React from 'react';
import s from './../Messages.module.css';
import { NavLink } from "react-router-dom"
import { DialogType } from './../../../Redux/messages-reducer' 

const Dialog: React.FC<DialogType> = (props) => {
    return (
        <div className={s.dialogName}>
                <NavLink to={"/messages/" + props.id}>
                    {props.name}
                </NavLink>
        </div>
    )
}

type DialogItemPropsType = {
    dialogData: Array<DialogType>
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let dialogItems = props.dialogData.map(person => <Dialog name={person.name} id={person.id} key={person.id}/>)
    
    return(
        <div className={s.dialogsItems}>
            Dialogs:
            {dialogItems}
        </div>
    )
}

export default DialogItem;