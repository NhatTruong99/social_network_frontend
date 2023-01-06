import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const getImageUrlFromFirebase = async (type, image) => {
    const avatarRef = ref(storage,`${type}/${image}`);
    return await getDownloadURL(avatarRef);
}
