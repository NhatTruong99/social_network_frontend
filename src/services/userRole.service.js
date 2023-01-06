import rootInstance from "./utilsService/rootInstance";

const readAllUserRole = async () => {
    return await rootInstance.get("/user-role/all");
}

const getUserRoleByID = async (userID, roleID) => {
    return await rootInstance.get(`/user-role/${userID}/${roleID}`, {userID: userID, roleID: roleID});
  };
// const createUserRole = async (userRole) => {
//     return await rootInstance.post("/user-role/add", userRole);
// }

const deleteUserRole = async (userID, roleID) => {
    return await rootInstance.delete(`/user-role/remove/${userID}/${roleID}/`, {userID: userID, roleID: roleID});
}

// const updateUserRole = async (userID, roleID) => {
//     return await rootInstance.put(`/user-role/update/${userID}/${roleID}/`, {userID: userID, roleID: roleID});
// }

const updateUserRole = (userID, roleID, new_RoleID) => {
    return rootInstance.put(`/user-role/update/${userID}/${roleID}/${new_RoleID}/`, {userID: userID, roleID: roleID, new_RoleID: new_RoleID});
  }

const createUserRole = (userID, roleID) => {
    return rootInstance.post(`/user-role/add/${userID}/${roleID}`, {userID: userID, roleID: roleID});
  }

// const likePost = (postId, userId) => {
//     return rootInstance.post("/user/like-post", {postId: postId, userId: userId});
//   }

const getAllRole = async () =>{
    return await rootInstance.get("/user-role/get-all-roles");
}

const UserRoleService = {
    readAllUserRole,
    getUserRoleByID,
    createUserRole,
    deleteUserRole,
    updateUserRole,
    getAllRole
};
  
export default UserRoleService;