import { getAuthUserDataTC } from './auth-reducer';
import { InferActionsTypes, BaseThunkType } from './redux-store';

let initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState // typeof - превратить что-то в объект типа
type ActionTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type){
        case "SN/APP/INITIALIZED_SUCCESS": { // SN/APP - для минимизации конфликтов в actions, так диспатчи проходят по всем reducer'ам
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}


type ThunkType = BaseThunkType<ActionTypes>

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUserDataTC());
    
    await Promise.all([promise])
    dispatch(actions.initializedSuccess());
}

export default appReducer;