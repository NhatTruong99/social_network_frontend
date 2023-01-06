/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState, useEffect} from 'react';
import ReactEmoji from 'react-emoji';

import ProfileService from '../../services/ProfileService';
import { getImageUrlFromFirebase } from '../../utils/firebasePort';
import ConversationService from '../../services/conver.service';


function Conversation({onlineUsers, renderValue, conversation, sender}) {
    
    const [reply, setReply] = useState("");
    const [conversationReplyTime, setConversationReplyTime] = useState("");
    const [lastUserReply, setLastUserReply] = useState();
    const [lastUserProfileRep, setLastUserProfileRep] = useState();

    const [deleteStatus, setDeleteStatus] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [avatar, setAvatar] = useState(null);

    const [NumberOfNewMessages,setNumberOfNewMessages] = useState(0);
    const [memberQtt, setMemberQtt] = useState(0);

    const [otherMembers, setOtherMembers] = useState([]);

    useEffect(() =>{
        ConversationService.getLastConversationReply(conversation.id)
            .then(converRes => {
                let converdata = converRes.data;
                if (converdata) {
                    setReply(converdata.reply);
                    convertTime(converdata.conversationReplyTime);
                    setLastUserReply(converdata.user);
                    setDeleteStatus(converdata.deleleStatus);
                    getUserProfile(converdata.user.id)
                        .then(profileRes => {
                            setLastUserProfileRep(profileRes.data);
                        });
                }
            });
        ConversationService.getCountNewMessage(conversation.id, sender.id)
            .then(res=>{
                setNumberOfNewMessages(res.data);
            });
        
    },[renderValue]) 

    useEffect(() => {
        if (otherMembers.length === 1) {
            let id = otherMembers[0]?.id;
            getUserProfile(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    getImageUrlFromFirebase("avatarImages", response.data.avatar)
                        .then((response) => {
                            setAvatar(response);
                        });
                });
        }
    }, [otherMembers])

    useEffect(()=>{
        getOtherMembers(conversation.id, sender.id);
        getMemberQttInConv(conversation.id);

        return () => {
            setLastUserReply();
            setDeleteStatus(0);
            setFirstName("");
            setLastName("");
            setAvatar(null);
            setNumberOfNewMessages(0);
            setMemberQtt(0);
            setOtherMembers([]);
        }
    }, [])
    
    const convertTime = (date) => {
        if (date){
            const dateValue = new Date(date);      
            setConversationReplyTime(dateValue.toLocaleDateString("en-GB"));
        } else { 
            setConversationReplyTime("");
        }
    }

    const getMemberQttInConv = async (convID) =>{
        await ConversationService.readMemberQttInConv(convID)
			.then(res => {
				setMemberQtt(res.data);
			});
    }

    const getOtherMembers = async (convID, userID) =>{
        await ConversationService.readOtherMembers(convID, userID)
			.then(res => {
				setOtherMembers(res.data);
			});
    }

    const getUserProfile = async (userID) => {
        return await ProfileService.getProfile(userID);
    }

    return (
        <div className="">
            {
                conversation !== null 
                    ?   <div className="chat_people">
                            <div className="chat_img"> 
                                { memberQtt > 2 
                                    ? <img src={"https://cdn4.iconfinder.com/data/icons/social-media-3/512/User_Group-512.png"} className="rounded-circle img-fluid" alt="sunil"/>
                                    : <img src={avatar} className="rounded-circle img-fluid" alt="sunil"/> 
                                }
                                {
                                    onlineUsers && onlineUsers.map((u, index) =>
                                        otherMembers.some(mem => u.userID === mem.id)
                                            ? <img className="online" 
                                                key={index}
                                                src="http://www.clker.com/cliparts/e/E/F/G/p/g/alex-green-circle-md.png" 
                                                alt="online"/>
                                            : ""
                                    )
                                } 
                            </div>
                            <div className="chat_ib">
                                <h5>
                                    {
                                        memberQtt > 2 
                                            ? conversation.name
                                            : firstName + " " + lastName
                                    }
                                    <span className="chat_date">{conversationReplyTime}</span>
                                </h5>
                                 
                                {
                                    lastUserReply 
                                    ?   <div className="d-flex justify-content-between"> 
                                            {
                                                deleteStatus === 0
                                                    ? <p>{ 
                                                            sender.id !== lastUserReply.id && lastUserProfileRep
                                                                ? lastUserProfileRep.firstName + " " + lastUserProfileRep.lastName + ": "
                                                                : "You: "
                                                        } { ReactEmoji.emojify(reply) }</p>
                                                    : <p>Tin nhắn đã bị thu hồi</p>
                                            }
                                            {
                                                NumberOfNewMessages === 0
                                                    ? <span></span>
                                                    : <span 
                                                        className="badge badge-pill badge-danger align-self-center"
                                                    >{NumberOfNewMessages}</span>   
                                            }                        
                                        </div>    
                                    :   <div></div>
                                }  
                            </div>
                        </div>   
                    :   <div></div>
            }
        </div>
    )
}

export default Conversation;