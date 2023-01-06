import { useEffect, useState } from "react";
import FriendService from "../../services/friend.service"
import FriendChild from "./FriendChild";
import RequesterChild from "./RequesterChild";
function ListFriend({userCurrentID}){
    const [listFriend,setListFriend] = useState()
    const [listRequester,setListRequester] = useState()
    const [change,setChange] = useState(false)

    useEffect(() => {
        FriendService.getListFriend(userCurrentID).then(res => setListFriend(res.data))
        FriendService.getListRequester(userCurrentID).then(res => setListRequester(res.data))
    },[userCurrentID,change])

    return (
        <div className="central-meta">
            <div class="frnds">
                <ul class="nav nav-tabs">
                    <li class="nav-item"><a class="active" href="#frends" data-toggle="tab">My Friends</a> 
                    <span>{listFriend && listFriend.length}</span></li>
                    <li class="nav-item"><a class="" href="#frends-req" data-toggle="tab">Friend Requests</a>
                    <span>{listRequester && listRequester.length}</span></li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active fade show " id="frends" >
                        <ul class="nearby-contct">
                            {listFriend && listFriend.map((user) =>(
                                <FriendChild 
                                    user = {user} 
                                    userCurrentID = {userCurrentID}
                                    handleChange = {() => setChange(!change)}
                                />
                            ))}
                        </ul>
                    </div>
                    <div class="tab-pane fade" id="frends-req" >
                        <ul class="nearby-contct">
                            {listRequester && listRequester.map((user) =>(
                                <RequesterChild 
                                    user = {user} 
                                    userCurrentID = {userCurrentID}
                                    handleChange = {() => setChange(!change)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ListFriend