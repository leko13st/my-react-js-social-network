import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }
    
    toggleEditMode = () => {
        debugger
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render(){
        return(
            <div>
                {this.state.editMode
                ? 
                <div>
                    <input autoFocus onBlur={ this.toggleEditMode } value={this.props.status} />
                </div>
                : 
                <div>
                    <span onDoubleClick={ this.toggleEditMode }>{this.props.status}</span>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;