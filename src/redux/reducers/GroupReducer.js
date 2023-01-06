import GroupActionTypes from '../constants/GroupActionTypes';


const initState = {
    allGroups: [],
    group: undefined,
}; 

export const groupsReducer = (state = initState, { type, payload }) => {
    let allGroups = state.allGroups;
    switch (type) {
        case GroupActionTypes.ADD_GROUP:
            return { ...state, allGroups: [...state.allGroups, payload] };
        case GroupActionTypes.UPDATE_SELECTED_GROUP:
            let valueToUpdate = allGroups.length > 0 ? allGroups.filter(group => group.id === payload.id): "Not found";
            let indexOf = allGroups.indexOf(valueToUpdate);
            allGroups[indexOf] = valueToUpdate;
            return { ...state, allGroups: allGroups };
        case GroupActionTypes.REMOVE_SELECTED_POST:
            let remainGroups = allGroups.filter(group => group.id !== payload.id);
            return { ...state, allGroups: remainGroups };
        case GroupActionTypes.SET_ALL_GROUPS:
            return { ...state, allGroups: payload }
        default:
            return state;
    }
};