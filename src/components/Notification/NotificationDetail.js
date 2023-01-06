import { useEffect, useState, useRef } from "react";
import {Link,useNavigate } from "react-router-dom";
import NotificationService from "../../services/NotificationService";
import FirebaseService from '../../services/firebase.service';
import "./Notification.css"

function NotificationDetail({noty,handle}){

    const [avatar,setAvatar] = useState("")
    const [change,setChange] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        FirebaseService.getAvatarFromFirebase(noty.senderProfile.avatar).then(res => setAvatar(res))
    },[noty])

    const handleRead = (id,url) => {
        NotificationService.readedNotification(id).then(res => setChange(!change))
        handle()
    }

    return (
        <li>
            <div title="">
                <img src={avatar} alt="" />
                <div className="mesg-meta" >
                <Link to={noty.url} onClick={() => handleRead(noty.id)}>
                        <h6 style={{marginBottom: "0px"}}>{noty.senderProfile.firstName + " " + noty.senderProfile.lastName}</h6>
                        <span>{noty.activityType === 1 ? "đã gửi lời mời kết bạn" : noty.activityType === 2 ? "đã like bài viết của bạn" : "đã comment bài post của bạn"}</span>
                        <i>{noty.timeSent}</i>
                </Link >
                </div>

            </div>
            {noty.isRead == 1 && <span className="tag green">New</span>}
        </li> 
    )
}

export default NotificationDetail