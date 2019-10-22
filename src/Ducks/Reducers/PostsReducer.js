import axios from "axios";

//initial state
const initialState = {
    posts: []
};

//const strings
const GET_POSTS = "GET_POSTS";
const SEARCH_POSTS = "SEARCH_POSTS"

//functions
export function getAllPosts() {
    return {
    type: GET_POSTS,
    payload: axios.get(`/api/posts`)
    };
}

export function searchPosts(searchTitle) {
    return {
        type: SEARCH_POSTS,
        payload: axios.get(`/api/posts/userposts?title=${searchTitle}`)
    };
}


//reducer
export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${GET_POSTS}_FULFILLED`:
            return {
                ...state,
                posts: payload.data
            };
        case `${SEARCH_POSTS}_FULFILLED`:
            return{
                ...state,
                posts: payload.data
            };
        default:
            return state;
    }
}