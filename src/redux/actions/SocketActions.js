import SocketActionTypes from '../constants/SocketActionTypes';

export const setSocket = (socket) => {
    return {
        type: SocketActionTypes.SET_SOCKET,
        payload: socket
    };
};