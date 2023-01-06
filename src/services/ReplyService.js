
import rootInstance from "./utilsService/rootInstance";


const getReplies = async (postCommentID) => {
    return await rootInstance.get("/reply/" + postCommentID);
}

const createReply = async (reply) => {
    return await rootInstance.post("/reply/add", reply);
}

const deleteReply= async (postCommentID) => {
    return await rootInstance.delete("/reply/remove/" + postCommentID);
}

const updateReply = async (postCommentID,reply) => {
    return await rootInstance.put("/reply/update/" + postCommentID, reply);
}



const ReplyService = {
    getReplies,
    createReply,
    deleteReply,
    updateReply,
};
  
export default ReplyService;

