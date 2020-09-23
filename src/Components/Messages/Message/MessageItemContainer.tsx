import {actions} from '../../../Redux/messages-reducer';
import MessageItem from './MessageItem';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../../Redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        messageData: state.messagePage.messageData
    }
}

let mapDispatchToProps = {
    addMessage: actions.addMessageAC
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessageItem);