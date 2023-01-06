import { SocketActionTypes } from '../constants/SocketActionTypes';

const initState = {
    socket: null,
}; 

export const socketsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case SocketActionTypes.SET_SOCKET:
            return { socket: payload };
        default:
            return state;
    }
};