import { InferActionsTypes } from "./redux-store";

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
export type ActionTypes = InferActionsTypes<typeof actions>

const messagesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

export const actions = {
    addMessageAC: (newMessage: string) => ({type: ADD_MESSAGE, newMessage} as const)
}

export default messagesReducer;