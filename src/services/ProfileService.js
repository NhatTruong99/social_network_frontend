import rootInstance from "./utilsService/rootInstance";


const getProfile = async (userID) => {
    return await rootInstance.get("/profile/" + userID);
}

const createProfile = async (profile) => {
    return await rootInstance.post("/profile/add", profile);
}


const updateProfile = async (userID,profile) => {
    return await rootInstance.put("/profile/update/" + userID, profile);
}


const getFriendProfile = async (userID) => {
    return await rootInstance.get("/profile/friendprofile/" + userID);

}

const ProfileService = {
    getProfile,
    createProfile,
    updateProfile,
    getFriendProfile,
};
  
export default ProfileService;
