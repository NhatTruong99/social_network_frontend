import { useEffect, useState } from "react";
import FriendService from "../../services/friend.service"
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {Link } from "react-router-dom";

function FriendChild({user,userCurrentID,handleChange}) {
    const [avatar,setAvatar] = useState()

    useEffect(() =>{
        const avatarRef = ref(storage,`avatarImages/${user.avatar}`);
        getDownloadURL(avatarRef).then(url => setAvatar(url))
    },[user])

    const handleRemoveFriendShip = (userID2) => {
        FriendService.removeFriendShip(userCurrentID,userID2).then(res => handleChange())
    }
    return (
        <li>
            <div class="nearly-pepls">
                <figure>
                    <Link to={"/profile/" + user.user.id}>
                        <img src={avatar} />
                    </Link>
                </figure>
                <div class="pepl-info">
                    <h4>
                        <Link to={"/profile/" + user.user.id}>
                            {user.firstName + " " + user.lastName}
                        </Link>
                    </h4>
                    <p onClick={() => handleRemoveFriendShip(user.user.id)} class="add-butn more-action" data-ripple="">Unfriend</p>
                </div>
            </div>
        </li>)
}

export default FriendChild