import { useEffect, useState, useRef } from "react";
import {Link } from "react-router-dom";
import NotificationService from "../../services/NotificationService";
import FriendService from "../../services/friend.service"
import { io } from 'socket.io-client';
import "./Notification.css"
import NotificationDetail from "./NotificationDetail";
import { useSelector } from "react-redux";
function NotificationList({currentUser,socket}){

    

    const [listNoti,setListNoti] = useState([])
    const [length,setLength] = useState()
    const [change,setChange] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        NotificationService.getByIdRecipient(currentUser.id).then(res => setListNoti(res.data));
        NotificationService.getLengthNewNotification(currentUser.id).then(res => setLength(res));
    },[change])

    useEffect(()=>{
        socket.on("getNotification",data=> {
            setListNoti((prev) => [...prev, data])
            NotificationService.getLengthNewNotification(currentUser.id).then(res => setLength(res));
        })
    },[])

    const showNoti = () => {
        dropdownRef.current.classList.toggle("active")
        NotificationService.checkedAllNotificaiton().then(res => setChange(!change));
    }

    return (
        <li style={{marginTop:"12px"}}>
            <p className="notification" onClick={() => showNoti()}>
                <i className="ti-bell" ></i>{length > 0 && <span className="length-show">{length}</span>}
            </p>
            <div className="dropdowns dropdown-noti" ref={dropdownRef}>
                <ul className="drops-menu">
                {
                    listNoti && listNoti.map(noty => <NotificationDetail noty = {noty} handle={showNoti}/>)
                }
                </ul>
            </div>
        </li>
    );
}

export default NotificationList;