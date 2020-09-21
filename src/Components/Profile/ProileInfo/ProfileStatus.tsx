import React, { ChangeEvent } from 'react';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    
    //ф-я setState перерисовывает класс. компоненту, поэтому если вызвать функцию в render(), где есть setState, произойдёт зацикливание.
    //Поэтому вызывать setState только с условием.

    state = {
        editMode: false,
        status: this.props.status
    }
    
    toggleEditMode = (active: boolean) => {
        this.setState({
            editMode: active
        })
        if (!active)
            this.props.updateStatus(this.state.status);
    }

    updateLocalStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidMount() {
        this.setState({
            status: this.props.status
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType){
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status
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
                    <span onDoubleClick={ () => {this.toggleEditMode(true)} }>{this.state.status}</span>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;