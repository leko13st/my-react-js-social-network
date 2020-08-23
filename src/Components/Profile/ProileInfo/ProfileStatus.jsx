import React from 'react';

class ProfileStatus extends React.Component {
    
    state = {
        editMode: false,
        status: this.props.status
    }
    
    toggleEditMode = (active) => {
        this.setState({
            editMode: active
        })
        if (!active)
            this.props.updateStatus(this.state.status);
    }

    updateLocalStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render(){
        return(
            <div>
                {this.state.editMode
                ? 
                <div>
                    <input onChange={ this.updateLocalStatus } autoFocus onBlur={ () => {this.toggleEditMode(false)} } value={this.state.status ? this.state.status : ''} />
                </div>
                : 
                <div>
                    <span onDoubleClick={ () => {this.toggleEditMode(true)} }>{this.props.status}</span>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;