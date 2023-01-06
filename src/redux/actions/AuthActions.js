import { authActionTypes } from "../constants/ActionTypes";

export const refreshToken = (accessToken) => (dispatch) => {
    dispatch({
        type: authActionTypes.REFRESH_TOKEN,
        payload: accessToken,
    })
}
