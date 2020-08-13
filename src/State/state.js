const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';
const SEND_MESSAGE = 'SEND-MESSAGE';

let store = {
    _state: {
        profilePage: {
            postData: [
                {id: 1, text: "Hello, I'm Stas. It's my first post on this site!"},
                {id: 2, text: "Hey, what's up?"},
                {id: 3, text: "Hi, there is just a post: good luck!"}
            ],
            newPostText: ''
        },
        messagePage: {
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
    },
    _callSubr() {}, //Уведомляем подписчика
    _defineId (array) {
        return array.length + 1;
    },

    getState(){
        return this._state;
    }, //Получить state
    subscriber(observer) {
        this._callSubr = observer;
    }, //Позволяет подписаться

    dispatch(action){
        if (action.type === ADD_POST){
            this._state.profilePage.postData.push(
                {
                    id: this._defineId(this._state.profilePage.postData),
                    text: this._state.profilePage.newPostText,
                }
            );
            
            this._state.profilePage.newPostText = '';
            this._callSubr(this.state);
        }
        else if (action.type === UPDATE_NEW_POST_TEXT){
            this._state.profilePage.newPostText = action.newText;
            this._callSubr(this._state);
        }
        else if (action.type === ADD_MESSAGE){
            this._state.messagePage.messageData.push(
                {
                    id: this._defineId(this._state.messagePage.messageData),
                    text: this._state.messagePage.newMessage
                }
            );
        
            this._state.messagePage.newMessage = '';
            this._callSubr(this._state);
        }
        else if (action.type === UPDATE_NEW_MESSAGE){
            this._state.messagePage.newMessage = action.newMessage;
            this._callSubr(this._state);
        }
    } //общая функция, которая принимает в параметры объект, для вызова функций извне
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const updateNewMessageActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE, newMessage: text});

export default store;