import rootInstance from "./utilsService/rootInstance";


const getComments = async (postID) => {
    return await rootInstance.get("/comment/" + postID);
}

const createComment = async (comment) => {
    return await rootInstance.post("/comment/add", comment);
}

const deleteComments = async (commentID) => {
    return await rootInstance.delete("/comment/remove/" + commentID);
}

const updateComments = async (commentID,comment) => {
    return await rootInstance.put("/comment/update/" + commentID, comment);
}



const CommentService = {
    getComments,
    createComment,
    deleteComments,
    updateComments,
};
  
export default CommentService;

