import { useEffect, useState } from "react";
import {storage} from '../../utils/firebaseConfig';
import {ref,uploadBytes,getDownloadURL} from "firebase/storage";
import {Link } from "react-router-dom";

function PostChild({postWithUser}){

    const [avatar,setAvatar] = useState()
    const userProfile = postWithUser.userProfile
    const post = postWithUser.post
    
    useEffect(() =>{
        const avatarRef = ref(storage,`avatarImages/${postWithUser.userProfile.avatar}`);
        getDownloadURL(avatarRef).then(url => setAvatar(url))
    },[postWithUser])

    return (
        <div class="central-meta item">
            <div class="user-post">
                <div class="friend-info">
                    <figure>
                        <img src={avatar} alt=""/>
                    </figure>
                    <div class="friend-name">
                        <ins><Link to={"/profile/" + userProfile.user.id} title="">
                            {userProfile.firstName + " " + userProfile.lastName}
                        </Link></ins>
                        <span>{post.publishedDate}</span>
                    </div>
                    <div class="description">
                        <p>{post.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostChild