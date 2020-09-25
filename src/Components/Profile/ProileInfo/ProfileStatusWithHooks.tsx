import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {    
    
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]) // вызывай useState когда извне приходит НОВЫЙ props.status

    const activateEditMode = () => {
        setEditMode(true);
    }
    
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);        
    } 

    return(
        <div>
            {editMode
            ? 
            <div>
                <input autoFocus={true} onBlur={ deactivateEditMode } 
                                        onChange={ onStatusChange }
                                        value={status}/>
            </div>
            : 
            <div>
                <span onDoubleClick={ activateEditMode }>{props.status ? props.status : '------'}</span>
            </div>}
            {/* {editMode
            ? 
            <div>
                <input onChange={ this.updateLocalStatus } autoFocus onBlur={ () => {this.toggleEditMode(false)} } value={this.state.status ? this.state.status : ''} />
            </div>
            : 
            <div>
                <span onDoubleClick={ () => {this.toggleEditMode(true)} }>{this.state.status}</span>
            </div>} */}
        </div>
    )
}

export default ProfileStatusWithHooks;