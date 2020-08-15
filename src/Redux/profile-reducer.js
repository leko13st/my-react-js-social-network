const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
    postData: [
        {id: 1, text: "Hello, I'm Stas. It's my first post on this site!"},
        {id: 2, text: "Hey, what's up?"},
        {id: 3, text: "Hi, there is just a post: good luck!"}
    ],
    newPostText: ''
}

const profileReducer = (state = initialState, action) => {

    let stateCopy = {...state};
    stateCopy.postData = [...state.postData];

    switch (action.type){
        case ADD_POST: {
            stateCopy.postData.push(
                {
                    id: 10,
                    text: stateCopy.newPostText,
                }
            );            
            stateCopy.newPostText = '';
            return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;