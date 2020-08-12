import RerenderApp from './../index'

let state = {
    profilePage: {
        postData: [
            {id: "1", text: "Hello, I'm Stas. It's my first post on this site!"},
            {id: "2", text: "Hey, what's up?"},
            {id: "3", text: "Hi, there is just a post: good luck!"}
        ],
        newPostText: ''
    },
    messagePage: {
        dialogData: [
            {id: "1", name: "Viktor"},
            {id: "2", name: "Sasha"},
            {id: "3", name: "Pasha"},
            {id: "4", name: "Zhenya"}
        ],
        messageData: [
            {id: "1", text: "Hi"},
            {id: "2", text: "How are you?"},
            {id: "3", text: "What are you doing?"}          
        ]
    }
}

window.state = state;

export let addNewPost = () => {
    state.profilePage.postData.push(
        {
            id: defineId(state.profilePage.postData),
            text: state.profilePage.newPostText,
        }
    );
    
    state.profilePage.newPostText = '';
    RerenderApp(state);
}

let defineId = (array) => {
    return array.length + 1;
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    RerenderApp(state);
}

export default state;