import rootInstance from "./utilsService/rootInstance";

const getListFriend = async (userID) => {
    return await rootInstance.get("/friend/list-friend/" + userID);
}

const getListRequester = async (userID) => {
    return await rootInstance.get("/friend/list-requester/" + userID);
}

const getListRequesting = async (userID) => {
    return await rootInstance.get("/friend/list-requesting/" + userID);
}

//1:current user, 2: other people
const addRequest = async (userId1,userId2) => {
    return await rootInstance.post(`friend/add-friend/${userId1}/${userId2}`);
}

const acceptRequest = async (userId1,userId2) => {
    return await rootInstance.post(`friend/accept-friend/${userId1}/${userId2}`);
}

const checkIsFriend = async (currentUserID,userId) => {
    const listFriendCurrentUser = await getListFriend(currentUserID).then(res => res.data);
    return listFriendCurrentUser.some(userProfile => userProfile.user.id == userId)
}

//hàm kiểm tra current user có đang gửi kết bạn cho user hay khống
const checkIsRequesting = async (currentUserID,userId) => {
    const listCurrentUserRequesting = await getListRequesting(currentUserID).then(res => res.data);
    return listCurrentUserRequesting.some(userProfile => userProfile.user.id == userId)
}

//hàm kiểm tra current user có đang gửi kết bạn cho user hay khống
const checkIsRequester = async (currentUserID,userId) => {
    const listCurrentUserRequester = await getListRequester(currentUserID).then(res => res.data);
    return listCurrentUserRequester.some(userProfile => userProfile.user.id == userId)
}

//delete friendship 
const removeFriendShip = async (userId1,userId2) => {
    return await rootInstance.delete(`friend/delete-friendship/${userId1}/${userId2}`);
}



const FriendService = {
    getListFriend,
    getListRequester,
    getListRequesting,
    addRequest,
    acceptRequest,
    removeFriendShip,
    checkIsRequesting,
    checkIsRequester,
    checkIsFriend
};
export default FriendService;