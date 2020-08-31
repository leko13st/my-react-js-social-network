import React, { useState, useEffect } from 'react';

const ProfileStatusWithHooks = (props) => {    
    
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
    }

    const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
        props.updateStatus(status);
    } 

    return(
        <div>
            {editMode
            ? 
            <div>
                <input autoFocus='true' onBlur={ deactivateEditMode } 
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