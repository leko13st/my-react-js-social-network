import profileReducer, { actions } from "./profile-reducer"

let initialState = {
    postData: [
        {id: 1, text: "Hello, I'm Stas. It's my first post on this site!"},
        {id: 2, text: "Hey, what's up?"},
        {id: 3, text: "Hi, there is just a post: good luck!"}
    ],
    status: '',
    profile: null
}

let action = actions.addPostAC("hello i'Stas");
let state = profileReducer(initialState, action);

test('new state should be equal to 4', () => {  
    expect(state.postData.length).toBe(4);
});

test('new post should be added', () => {  
    expect(state.postData[3].text).toBe("hello i'Stas");
});