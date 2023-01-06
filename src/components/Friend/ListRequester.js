import { useEffect, useState } from "react";
import {Card,Row,Col } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import FriendService from "../../services/friend.service"
import {Link } from "react-router-dom";
import FriendChild from "./FriendChild";
function ListRequester(){

    const [listRequester, setListRequester] = useState()
    const [change,setChange] = useState(false)
    const {userID} = useParams();

    useEffect(() =>{
        FriendService.getListRequester(userID).then(res => setListRequester(res.data))
    },[userID,change])
    
    const handleAcceptRequest = (userID2) => {
        FriendService.acceptRequest(userID,userID2).then(res => setChange(!change))
    }

    const handleRemoveRequest = (userID2) => {
        FriendService.removeFriendShip(userID,userID2).then(res => setChange(!change))
    }

    return (
        <div>
            <h3>Lời mời kết bạn </h3>
            <Row style={{display: 'flex',justifyContent: 'flex-start' }}>
            {listRequester && listRequester.map((user) =>(
                    <Col key= {user.userProfileID} lg='3'>
                        <FriendChild user={user}/>
                        <button 
                            className="btn btn-info"
                            onClick={() => handleAcceptRequest(user.user.id)}
                        >Xác nhận</button>
                        <button 
                            className="btn btn-secondary"
                            onClick={() => handleRemoveRequest(user.user.id)}
                        >Xóa lời mời</button>
                    </Col>
                ))}
            </Row >
        </div>
    )
}

export default ListRequester;