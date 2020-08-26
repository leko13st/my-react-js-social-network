const ADD_MESSAGE = 'ADD-MESSAGE';

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
    ]
}

const messagesReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_MESSAGE:{
            let newMessageObject = {
                id: 10,
                text: action.newMessage
            }

            return {
                ...state,
                messageData: [...state.messageData, newMessageObject]
            }
        }
        default:
            return state;
    }
}

export const addMessageAC = (newMessage) => ({type: ADD_MESSAGE, newMessage});

export default messagesReducer;