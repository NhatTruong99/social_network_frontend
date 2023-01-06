import ProfileService from "./ProfileService";
import UserService from "./user.service";
import rootInstance from "./utilsService/rootInstance";

const getAllNotification = async () => {
    return await rootInstance.get("/notification/all");
}

const getByIdRecipient = async (recipientId) => {
    return await rootInstance.get("/notification/recipient/" + recipientId);
}

const getByIdSender = async (senderId) => {
    return await rootInstance.get("/notification/sender/" + senderId);
}

const getLengthNewNotification= async (recipientId) => {
    const listNoty =  await getByIdRecipient(recipientId).then(res => res.data);
    return listNoty.filter(noty => noty.isCheck == 1).length;
}

const createNotification = async (senderId,recipientId,url,type) => {
    if (senderId != recipientId){
        const sender = await UserService.getByUserID(senderId).then(res => res.data);
        const recipient = await UserService.getByUserID(recipientId).then(res => res.data);
        const senderProfile = await ProfileService.getProfile(senderId).then(res => res.data);
    
        const notification = {
            sender,
            recipient,
            url,
            activityType: type,
            isRead: 1,
            isCheck: 1,
            senderProfile
        }
        return await rootInstance.post("/notification/add",notification)
    } 
    return null;

}

const checkedAllNotificaiton = async () => {
    return await rootInstance.put("/notification/checked");
}

const readedNotification = async (id) => {
    return await rootInstance.put("/notification/readed/" + id);
}

const NotificationService = {
    getAllNotification,
    getByIdRecipient,
    getByIdSender,
    createNotification,
    checkedAllNotificaiton,
    getLengthNewNotification,
    readedNotification
}

export default NotificationService;