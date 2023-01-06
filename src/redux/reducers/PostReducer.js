import { PostActionTypes } from '../constants/PostActionTypes';

const initState = {
    allPosts: [],
}; 

export const postsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PostActionTypes.SET_ALL_POSTS:
            return {...state,  allPosts: payload }; 
        case PostActionTypes.ADD_POST:
            if (state.allPosts.every(curPostValue => curPostValue.id !== payload.id)) {
                return {...state, allPosts: [...state.allPosts, payload]};
            } else {
                return {...state };
            }
        case PostActionTypes.UPDATE_SELECTED_POST:
            let oldPost = state.allPosts.filter(post => post.id === payload.id);
            let index = state.allPosts.indexOf(oldPost);
            state.allPosts[index] = oldPost;
            return {...state};
        default:
            return state;
    }
};
