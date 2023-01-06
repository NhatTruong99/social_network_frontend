import GroupActionTypes from '../constants/GroupActionTypes';

export const setAllGroups = (groups) => {
    return {
        type: GroupActionTypes.SET_ALL_GROUPS,
        payload: groups
    };
};
export const addGroup = (group) => {
    return {
        type: GroupActionTypes.ADD_GROUP,
        payload: group
    };
};
export const updateGroup = (group) => {
    return {
        type: GroupActionTypes.UPDATE_SELECTED_GROUP,
        payload: group
    };
};

export const removeGroup = (groupID) => {
    return {
        type: GroupActionTypes.REMOVE_SELECTED_POST,
        payload: groupID
    };
};