import React ,{useState ,useEffect,useRef} from 'react'

import AuthService from "../../services/auth.service";
import FriendService from "../../services/friend.service"
import { useSelector } from 'react-redux';
import NotificationService from '../../services/NotificationService';

function ButtonFriend(props){

    const { socket } = useSelector(state => state.socket);

    // -------------
    const [isFriend,setIsFriend] = useState()
    const [isRequesting, setIsRequesting] = useState()
    const [isRequester, setIsRequester] = useState()
    const [change,setChange] = useState()
    const currentUser = AuthService.getCurrentUser();

    useEffect(() =>{
        FriendService.checkIsFriend(currentUser.id,props.userID).then(res => 
          {
            setIsFriend(res)
          }
        )
        FriendService.checkIsRequesting(currentUser.id,props.userID).then(res => 
          {
            setIsRequesting(res)
          }
        )
        FriendService.checkIsRequester(currentUser.id,props.userID).then(res => 
          {
            setIsRequester(res)
          }
        )
    },[props.userID,change])

    const handleAddRequest = () => {

      NotificationService.createNotification(currentUser.id,props.userID,`profile/${currentUser.id}`,1).then(noty => {
        socket.emit("sendNotification",noty.data)

        console.log(noty.data)
      })
      FriendService.addRequest(currentUser.id,props.userID).then(res => setChange(!change))
    }

    const handleRemoveFriendShip = () => {
      FriendService.removeFriendShip(currentUser.id,props.userID).then(res => 
        {
          setChange(!change)
        }
      )
    }

    const handleAcceptRequest = () => {
      FriendService.acceptRequest(currentUser.id,props.userID).then(res => 
        {
          setChange(!change)
        }
      )
      
    }

    if (isFriend){
      return (
        <div className="button_friend">
          <button 
                className="btn btn-danger"
                onClick={handleRemoveFriendShip}
          >H???y k???t b???n</button>
        </div>
      )
    } else if (isRequesting) {
      return (
          <div className="button_friend">
            <button 
                className="btn btn-secondary"
                onClick={handleRemoveFriendShip}
              >H???y y??u c???u</button>
          </div>
      )
          } else if (isRequester) {
            return (
              <div className="button_friend">
                <button 
                    className="btn btn-primary"
                    onClick={handleAcceptRequest}
                >Ch???p nh???n l???i m???i</button>
              </div>
            )
                } else{
                  return (
                    <div className="button_friend">
                      <button 
                          className="btn btn-info"
                          onClick={handleAddRequest}
                      >K???t b???n</button>
                    </div>
                  )
                }
    
}
export default ButtonFriend
