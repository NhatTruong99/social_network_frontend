import { useEffect, useState, useRef } from "react";
import NotificationService from "../../services/NotificationService";
import "./Notification.css"
import NotificationDetail from "./NotificationDetail";
function NotificationList({currentUser,socket}){

    



    const [listNoti,setListNoti] = useState([])
    const [length,setLength] = useState(0)
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
        <li>
          
            <button type="button" className="notification btn btn-light" onClick={() => showNoti()}>
            <i className="fa fa-bell" ></i> 
            <span className="badge badge-dark">{length}</span>
            </button>
            <div className="dropdowns dropdown-noti" ref={dropdownRef}>
                <ul className="drops-menu">
                {
                    listNoti && listNoti.map(noty => 
                    
                    <NotificationDetail key={noty.id} noty = {noty} handle={showNoti}/>
                    )
                }
                </ul>
            </div>
        </li>
    );
}

export default NotificationList;