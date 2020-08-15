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

    let stateCopy = {...state};
    stateCopy.messageData = [...state.messageData];

    switch(action.type){
        case ADD_MESSAGE:
            stateCopy.messageData.push(
                {
                    id: 10,
                    text: stateCopy.newMessage
                }
            );        
            stateCopy.newMessage = '';

            return stateCopy;
        case UPDATE_NEW_MESSAGE:
            stateCopy.newMessage = action.newMessage;
            return stateCopy;
        default:
            return state;
    }
}

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE, newMessage: text});

export default messagesReducer;