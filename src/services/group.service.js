import rootInstance from "./utilsService/rootInstance";

const readAllGroups = async () => {
    return await rootInstance.get("/group/all");
}

const readGroupById = async (id) => {
    return await rootInstance.get("/group/" + id);
}

const createGroup = async (group) => {
    return await rootInstance.post("/group/add", group);
}

const deleteGroup = async (id) => {
    return await rootInstance.delete("/group/remove/" + id);
}

const updateGroup = async (group, groupId) => {
    return await rootInstance.put(`/group/update/${groupId}`, group);
}

const readTotalMembersById = async (groupId) => {
    return await rootInstance.get(`/group/${groupId}/total-member`);
}

const readGroupsUserJoined = async (userId) => {
    return await rootInstance.get(`/group/user-joined/${userId}`);
}

const readMembersProfile = async (groupId) => {
    return await rootInstance.get(`/group/${groupId}/member-profile`);
}

const GroupService = {
    readAllGroups,
    readGroupById,
    createGroup,
    deleteGroup,
    updateGroup,
    readTotalMembersById,
    readGroupsUserJoined,
    readMembersProfile
};
  
export default GroupService;