import {storage} from '../utils/firebaseConfig';
import {ref,getDownloadURL} from "firebase/storage";


const getAvatarFromFirebase= async (avatar)=>{
    const avatarRef = ref(storage,`avatarImages/${avatar}`);
    
    var result  = await getDownloadURL(avatarRef).then((url) => {
        return url

    }).catch((error) => {
        console.log(error);
    });


    return result;
}

const getBackGroundFromFirebase= async (background)=>{

    const backgroundRef = ref(storage,`backGroundImages/${background}`);
    var result = await getDownloadURL(backgroundRef).then((url) => {
        return url
}).catch((error) => {
    console.log(error);
});

    return result;

}

const getImageUrlFromFirebase = async (image) => {
    const avatarRef = ref(storage,`post_images/${image}`);
    return await getDownloadURL(avatarRef);
}
const FirebaseService = {
    getAvatarFromFirebase,
    getBackGroundFromFirebase,
    getImageUrlFromFirebase,
};

export default FirebaseService