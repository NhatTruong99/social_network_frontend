import { authActionTypes } from "../constants/ActionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export const tokenReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case authActionTypes.REFRESH_TOKEN:
            return {
                ...state,
                user: { ...user, accessToken: payload },
            };
        default:
            return state;
    }
}