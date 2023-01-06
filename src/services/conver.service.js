import rootInstance from "./utilsService/rootInstance";


const getAllConversation = async (userID) => {
    return await rootInstance.get("/conversation/" + userID);
}

const createConversation = async (conversation) => {
    return await rootInstance.post("/conversation/add/" , conversation);

}

const getConversationBetweenUser = async (conversationID) => {
    return await rootInstance.get(`/conversation/reply/user/${conversationID}`);
}

const getLastConversationReply = async (conversationID) => {
    return await rootInstance.get(`/conversation/reply/${conversationID}`);
}

const readMemberQttInConv = async (convID) => {
    return await rootInstance.get("/conversation/mem-qtt/" + convID);
}

const readOthersUserID = async (conversationID, userID) => {
    return await rootInstance.get(`/conversation/reply/${conversationID}/other-user-id/${userID}`);
}

const createConversationReply = async (conversationReply) => {
    return await rootInstance.post("/conversation/reply/add", conversationReply);
}

const deleteConversationReply = async (conversationID) => {
    return await rootInstance.put("/conversation/reply/remove/"+ conversationID);
}

const getLastConversationReplyID = async ()=>{
    return await rootInstance.get("/conversation/reply/getlast");

}

const getCountNewMessage = async (conversationID,senderID)=>{
    return await rootInstance.get(`/conversation/reply/countnewmessage/${conversationID}/${senderID}`);

}

const updateStatus = async (conversationID,senderID)=>{
    return await rootInstance.put(`/conversation/reply/updatestatus/${conversationID}/${senderID}`);
} 

const readMemberProfiles = async (convID, userID) => {
    return await rootInstance.get(`/conversation/${convID}/other-mems-profile/${userID}`);
}

const readOtherMembers = async (convID, userID) => {
    return await rootInstance.get(`/conversation/${convID}/other-mems/${userID}`);
}

const createConversationRoom = async (membersID) => {
    return await rootInstance.post("/conversation/add-room", membersID);
}

const ConversationService = {
    getAllConversation,
    getConversationBetweenUser,
    getLastConversationReply,
    createConversationReply,
    deleteConversationReply,
    getLastConversationReplyID,
    getCountNewMessage,
    updateStatus,
    readMemberQttInConv,
    readOthersUserID,
    readMemberProfiles,
    readOtherMembers,
    createConversationRoom,
    createConversation
};
export default ConversationService;