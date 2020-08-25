import React from 'react';

class ProfileStatus extends React.Component {
    
    //ф-я setState перерисовывает класс. компоненту, поэтому если вызвать функцию в render(), где есть setState, произойдёт зацикливание.
    //Поэтому вызывать setState только с условием.

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

    componentDidMount() {
        this.setState({
            status: this.props.status
        })
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status
            })
    }

    render(){
        debugger
        return(
            <div>
                {this.state.editMode
                ? 
                <div>
                    <input onChange={ this.updateLocalStatus } autoFocus onBlur={ () => {this.toggleEditMode(false)} } value={this.state.status ? this.state.status : ''} />
                </div>
                : 
                <div>
                    <span onDoubleClick={ () => {this.toggleEditMode(true)} }>{this.state.status}</span>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;