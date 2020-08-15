const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';

let initialState = {
    dialogData: [
        {id: 1, name: "Viktor"},
        {id: 2, name: "Sasha"},
        {id: 3, name: "Pasha"},
        {id: 4, name: "Zhenya"}
    ],
    messageData: [
        {id: 1, text: "Hi"},
        {id: 2, text: "How are you?"},
        {id: 3, text: "What are you doing?"}          
    ],
    newMessage: ''
}

const messagesReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_MESSAGE:{
            let newMessageObject = {
                id: 10,
                text: state.newMessage
            }

            return {
                ...state,
                messageData: [...state.messageData, newMessageObject],
                newMessage: ''
            }
        }
        case UPDATE_NEW_MESSAGE:{
            return{
                ...state,
                newMessage: action.newMessage
            }
        }
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE, newMessage: text});

export default messagesReducer;