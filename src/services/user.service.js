import rootInstance from "./utilsService/rootInstance";

const readUserProfile = (user) => {
  return rootInstance.post("/user/get-by-user", user);
};

const joinGroup = (groupId, userId) => {
  return rootInstance.post("/user/join-group", {groupId: groupId, userId: userId});
}

const leaveGroup = (groupId, userId) => {
  return rootInstance.post("/user/leave-group", {groupId: groupId, userId: userId});
}

const checkUserJoinedGroup = async (groupId, userId) => {
  return await rootInstance.get(`/user/${userId}/check-joined/${groupId}`);
}

const checkUserIsAdminGroup = async (groupId, userId) => {
  return await rootInstance.get(`/user/${userId}/check-admin/${groupId}`);
}


const getByUserID = (userId) =>{
  return rootInstance.get("/user/" + userId);
}


const createUser = async (user) => {
  return await rootInstance.post("/user/", user);
}

const deleteUser = async (userId) => {
  return await rootInstance.delete("/user/" + userId);
}

const updateUser = async (userId, user) => {
  return await rootInstance.put("/user/" + userId, user);
}


const likePost = (postId, userId) => {
  return rootInstance.post("/user/like-post", {postId: postId, userId: userId});
}

const dislikePost = (postId, userId) => {
  return rootInstance.delete(`/user/dislike-post/${postId}/${userId}/`, {postId: postId, userId: userId});
}

const getYearByUser = () => {
  return rootInstance.get("/user/year-register");
};

const countUserByYear = () => {
  return rootInstance.get(`/user/count-by-year`);
};

const getMonthByUser = (year) => {
  return rootInstance.get(`/user/month-register/${year}`, {year: year});
};

const countUserByMonth = (year) => {
  return rootInstance.get(`/user/count-by-month/${year}`, {year: year});
};


const getAllUserName = async () => {
  return await rootInstance.get("/user/get-username");
};

const getAllRole = async () => {
  return await rootInstance.get("/user/get-role");
};


const getAllUsers = async () => {
  return await rootInstance.get("/user/all");
};

const UserService = {
  readUserProfile,  
  joinGroup,
  leaveGroup,
  checkUserJoinedGroup,
  checkUserIsAdminGroup,
  getByUserID,
  createUser,
  deleteUser,
  updateUser,
  likePost,
  dislikePost,
  
  getYearByUser,
  countUserByYear,
  getMonthByUser,
  countUserByMonth,

  getAllUserName,
  getAllRole,
  getAllUsers,
};

export default UserService;
