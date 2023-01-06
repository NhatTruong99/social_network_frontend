import rootInstance from "./utilsService/rootInstance";

const readAllLikes = async () => {
    return await rootInstance.get("/like/all");
}

const readLikeById = async (id) => {
    return await rootInstance.get("like/" + id);
}

const createLike = async (like) => {
    return await rootInstance.post("/like/add", like);
}

const deleteLike = async (id) => {
    return await rootInstance.delete("/like/remove/" + id);
}

const updateLike = async (like) => {
    return await rootInstance.put("/like/update/", like);
}

// Coi bên controller sửa lại 2 cái này
const readTotalLikesById = async (postId) => {
    return await rootInstance.get(`/like/${postId}/total-like/`);
}


const readUserLike = async (userId) => {
    return await rootInstance.get(`/like/user-like/${userId}`);
}

// const likePost = (postId, userId) => {
//     return rootInstance.post("/like/like-post", {postId: postId, userId: userId});
//   }

const readPostUserLiked = async (userID) => {
    return await rootInstance.get(`/post/post-liked/${userID}`);
}

const LikePostService = {
    readAllLikes,
    readLikeById,
    createLike,
    deleteLike,
    updateLike,
    readTotalLikesById,
    readUserLike,
    readPostUserLiked
    // likePost
};
  
export default LikePostService;