// import profileReducer from "./profile-reducer";
// import messagesReducer from "./messages-reducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';

let store = {
    // _state: {
    //     profilePage: {
    //         postData: [
    //             {id: 1, text: "Hello, I'm Stas. It's my first post on this site!"},
    //             {id: 2, text: "Hey, what's up?"},
    //             {id: 3, text: "Hi, there is just a post: good luck!"}
    //         ],
    //         newPostText: ''
    //     },
    //     messagePage: {
    //         dialogData: [
    //             {id: 1, name: "Viktor"},
    //             {id: 2, name: "Sasha"},
    //             {id: 3, name: "Pasha"},
    //             {id: 4, name: "Zhenya"}
    //         ],
    //         messageData: [
    //             {id: 1, text: "Hi"},
    //             {id: 2, text: "How are you?"},
    //             {id: 3, text: "What are you doing?"}          
    //         ],
    //         newMessage: ''
    //     }
    // },
    _callSubscriber() {}, //Уведомляем подписчика
    _defineId (array) {
        return array.length + 1;
    },

    getState(){
        return this._state;
    }, //Получить state
    subscriber(observer) {
        this._callSubscriber = observer;
    }, //Позволяет подписаться

    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagePage = messagesReducer(this._state.messagePage, action);

        this._callSubscriber(this._state);    
    } //общая функция, которая принимает в параметры объект, для вызова функций извне
}

//export default store;