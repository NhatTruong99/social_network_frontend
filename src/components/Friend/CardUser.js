import { useEffect, useState } from "react";
import {Link } from "react-router-dom";
import FirebaseService from '../../services/firebase.service';

function CardUser({user}) {
    const [avatar,setAvatar] = useState()

    useEffect(() =>{
        FirebaseService.getAvatarFromFirebase(user.avatar).then((response) => {
            setAvatar(response)
        })
    },[])

    return (
    <>
        <figure>
        <img src={avatar} alt=""/>
        <span className="status f-online"></span>
    </figure>
    <div className="friendz-meta">
        <Link to={"/profile/" + user.user.id} >{user.firstName + " " + user.lastName}</Link>
    </div>
    </>
    )
}

export default CardUser