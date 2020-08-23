import {addMessageActionCreator, updateNewMessageActionCreator} from '../../../Redux/messages-reducer';
import MessageItem from './MessageItem';
import { connect } from 'react-redux';
import withAuthRedirect from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        messageData: state.messagePage.messageData,
        newMessage: state.messagePage.newMessage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => {
            dispatch(addMessageActionCreator())
        },
        updateNewMessage: (text) => {
            dispatch(updateNewMessageActionCreator(text))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessageItem);