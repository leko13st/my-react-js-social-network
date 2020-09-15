const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    text: string
}

let initialState = {
    dialogData: [
        {id: 1, name: "Viktor"},
        {id: 2, name: "Sasha"},
        {id: 3, name: "Pasha"},
        {id: 4, name: "Zhenya"}
    ] as Array<DialogType>,
    messageData: [
        {id: 1, text: "Hi"},
        {id: 2, text: "How are you?"},
        {id: 3, text: "What are you doing?"}          
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action: any): InitialStateType => {

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

type addMessageType = {
    type: typeof ADD_MESSAGE
    newMessage: string
}

export const addMessageAC = (newMessage: string): addMessageType => ({type: ADD_MESSAGE, newMessage});

export default messagesReducer;