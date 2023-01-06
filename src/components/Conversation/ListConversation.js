/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";

import AuthService from '../../services/auth.service';
import Conversation from './Conversation';
import ConversationReply from './ConversationReply';
import SendMessage from './SendMessage';
import { getImageUrlFromFirebase } from '../../utils/firebasePort';
import ConversationService from '../../services/conver.service';
import ConversationDetail from './ConversationDetail';
import "./Conversation.css";

function ListConversation() {
	const { socket } = useSelector(state => state.socket);
    const user = AuthService.getCurrentUser();

    const chatItemRef = useRef([]);

    const [listConversations, setListConversations] = useState([]);
    const [renderValue, setRenderValue] = useState(0);
    
    const [chatOn, setChatOn] = useState(false);
    const [currConver, setCurrConver] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);
	const [convRoom, setConvRoom] = useState(0);

	const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [otherUserID, setOtherUserID] = useState(0);
    const [otherUserProfID, setOtherUserProfID] = useState(0);
	const [otherMemProfiles, setOtherMemProfiles] = useState([]);

    const increaseRenderValue = ()=> {
      	setRenderValue(c => c + 1)
    }

    useEffect(() => {
      	getAllConversation();

		socket.emit("addUser", user.id);
		socket.on("getUsers", users => {
			setOnlineUsers(users);
		})

		return () => {
			socket.close();
		}

  	}, [chatOn])

	const getOtherMembers = async (convID, userID) =>{
		await ConversationService.readMemberProfiles(convID, userID)
			.then(res => {
				let profileData = res.data;
				setOtherMemProfiles(profileData);
				if (profileData.length === 1) {
					setFirstName(profileData[0]["firstName"]);
					setLastName(profileData[0]["lastName"]);
					getImageUrlFromFirebase("avatarImages", profileData[0]["avatar"])
						.then(url => {
							setAvatar(url);
						});
					setOtherUserProfID(profileData[0]["userProfileID"]);
					setOtherUserID(profileData[0]["user"]["id"]);
				}
			})
			.catch(err => {
				console.log(err);
			});
    }

    const getAllConversation = async () =>{
        await ConversationService.getAllConversation(user.id)
			.then(res=>{
				setListConversations(res.data);
			});
    }

    const updateStatusMessage = async (conversationID, senderID) =>{
		await ConversationService.updateStatus(conversationID, senderID);
    }

    const handleClick = (index, conversation)=>{
		
		setConvRoom(conversation.name)
		joinConvRoom(conversation.name);
		getOtherMembers(conversation.id, user.id);

        var elements = chatItemRef.current;
        elements.forEach(element =>{
            if (element.classList.contains("active_chat") || element.classList.contains === ""){
                element.classList.remove("active_chat");
            }
        })
        chatItemRef.current[index].classList.add("active_chat");

        setCurrConver(conversation);

		updateStatusMessage(conversation.id, user.id);
		
        toggleChat();

    }

    const toggleChat = () =>{
      	setChatOn(prev => !prev);
    }

	const joinConvRoom = (convRoom) =>{
		if (convRoom !== 0) {
			socket.emit("joinConvRoom", convRoom);
		}
	}

	

  	return (
		<div className="">
			<div className="messaging">
				<div className="inbox_msg">
					<div className="inbox_people">
						<div className="headind_srch">
							<div className="recent_heading"> <h4>Recent</h4> </div>
							<div className="srch_bar">
								<div className="stylish-input-group">
									<input type="text" className="search-bar"  placeholder="Search" />
									<span className="input-group-addon">
										<button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
									</span> 
								</div>
							</div>
						</div>
						<div className="inbox_chat">  
							{
								!chatOn ?
									listConversations && listConversations.map(
										(conversation,index)  =>
											<div key={conversation.id} >
												<div 
													className="chat_list" 
													ref={el => chatItemRef.current[index] = el} 
													onClick={() => handleClick(index, conversation)}
												>
													<Conversation 
														onlineUsers={onlineUsers} 
														increaseRenderValue={increaseRenderValue} 
														renderValue={renderValue} 
														conversation={conversation} 
														sender={user}
													/>
												</div>
											</div>
										)
									:	<ConversationDetail 
											conver={ currConver }
											toggleChat={ toggleChat }
											onlineUsers={ onlineUsers } 
											otherUser={{
												firstName,
												lastName,
												avatar,
												otherUserID,
												otherUserProfID
											}}
											otherProfiles={otherMemProfiles}
											onSetOtherMemProfiles={setOtherMemProfiles}
										/>
								}
						</div>
					</div>
					<div className="mesgs">
						<div className="msg_history">
							{
								chatOn && currConver && 
								<ConversationReply 
									socket ={socket} 
									increaseRenderValue={increaseRenderValue} 
									renderValue={renderValue} 
									currentConversation={currConver}
									otherProfiles={otherMemProfiles}
								/>
							}
						</div>
						<div className="type_msg">
							{
								chatOn && currConver && 
								<SendMessage 
									socket ={socket} 
									increaseRenderValue={increaseRenderValue} 
									currentConversation={currConver}
									room = { convRoom }
								/>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
}

export default ListConversation;