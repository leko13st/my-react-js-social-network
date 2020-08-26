import {addMessageAC} from '../../../Redux/messages-reducer';
import MessageItem from './MessageItem';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        messageData: state.messagePage.messageData
    }
}

let mapDispatchToProps = {
    addMessage: addMessageAC
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessageItem);