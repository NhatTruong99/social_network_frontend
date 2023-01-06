/* eslint-disable react-hooks/exhaustive-deps */
import React ,{useState ,useEffect,useRef} from 'react';

import AuthService from '../../services/auth.service'
import ConversationService from '../../services/conver.service';
import ReactEmoji from 'react-emoji';

function ConversationReply({increaseRenderValue, socket, renderValue, currentConversation, otherProfiles}) {

	const user = AuthService.getCurrentUser();

	const [messages,setMessages] = useState([]);
	const [arrivalMessage,setArrivalMessage] = useState("");

	const [lastID,setLastID] = useState(0);
	const [otherMemProfiles, setOtherMemProfiles] = useState([]);

	const conversationReplyTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();

	const iconRef = useRef([]);
	const scrollRef = useRef();

	useEffect(()=>{
		getMemberProfiles(currentConversation.id, user.id);

		socket.on("getMessage", data => {
			setArrivalMessage({
				id: lastID ,
				reply: data.text,
				conversationReplyTime: conversationReplyTime,
				status: 0,
				deleleStatus: 0,
				user: data.senderID,
				conversation: currentConversation,
			})
		});

		return () => {
			setMessages([]);
			setOtherMemProfiles([]);
			setLastID(0);
			setArrivalMessage("");
		}
	}, []);

	/* useEffect(()=>{
		getMemberProfiles(currentConversation.id, user.id);
	}, [otherMemProfiles]); */

	useEffect(()=>{
		

		getConversationReplies();
		getLastID();
	},[renderValue])

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

    useEffect(()=>{
      	arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage, currentConversation])
	
	const getLastID = async ()=>{
		await ConversationService.getLastConversationReplyID()
			.then((res)=>{
				setLastID(res.data + 1);
			});
	}

	const getConversationReplies = async () =>{
		await ConversationService.getConversationBetweenUser(currentConversation.id)
			.then(res=>{
				let converRepData = res.data;
				setMessages(converRepData);
			});
	}
	const getMemberProfiles = async (convID, userID) => {
		await ConversationService.readMemberProfiles(convID, userID)
			.then(res => {
				setOtherMemProfiles(res.data);
			})
			.catch(err => {
				console.log(err);
			})
	}

	const deleteReply = async (id)=>{
		await ConversationService.deleteConversationReply(id)
			.then((res)=>{
				increaseRenderValue();
				alert("Delete Sucess!")
			})
			.catch((err)=>{
				console.log(err)
			});
	}

	const convertTime = (date) =>{
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' };
		const dateValue  = new Date(date);
		let time = date.match(/\d\d:\d\d/);
		return time + " / " + dateValue.toLocaleDateString("en-US", options);
	}

	const setShow = (index)=>{
		const current = iconRef.current[index];
		if (current) {
			if (current.style.display === "none" || current.style.display === "") {
				current.style.display = "block";
			}
		}
	}

	const setHide = (index)=>{
		const current = iconRef.current[index];
		if (current) {
			if (current.style.display === "block" || current.style.display === "") {
				current.style.display = "none";
			}
		}
	}

	return (
		<div>
			{
				messages && messages.map( (conversationReply,index) =>
					<div key={conversationReply.id} ref={scrollRef}>
							{                    
								user.id === conversationReply.user.id
									?
									<div className="outgoing_msg">
										<div className="sent_msg" >
											<div className="d-flex justify-content-end"
												onMouseEnter={() => setShow(index)}
												onMouseLeave={() => setHide(index)}
											>
												{
													conversationReply.deleleStatus === 0
														? <p 
														style={{ width: "fit-content"}}> {ReactEmoji.emojify(conversationReply.reply)}</p>
														: <p>Bạn đã thu hồi tin nhắn</p>
												}                

												{
													conversationReply.deleleStatus === 0
														? 	<span 
																className='icon delete-icon mr-2' 
																ref={el => iconRef.current[index] = el} 
																onClick={()=> {
																	if(window.confirm('Delete the item?')) {
																		deleteReply(conversationReply.id)
																	}
																}}
																style={{ width: "fit-content"}}
															> 
																<i className="fa fa-trash"></i>
															</span>
														:	<div></div>
												}
											</div>
											<span className="time_date text-right">{convertTime(conversationReply.conversationReplyTime)}</span> 
										</div>
									</div>
									:  
									<div className="incoming_msg">
										<div className="received_msg">
											<div className="received_withd_msg">
												<p className="bg-transparent p-0" 
												style={{ width: "fit-content", color: "#A3A3A3", fontSize: "12px"}}
												
												>
													{ 
														otherProfiles && otherProfiles.length === 1
															? otherProfiles[0]["firstName"] + " " + otherProfiles[0]["lastName"]
															: otherProfiles.find(profile => profile.user.id === conversationReply.user.id)["firstName"] 
															+ " " + otherProfiles.find(profile => profile.user.id === conversationReply.user.id)["lastName"]
													}
												</p>
												{	
													conversationReply.deleleStatus === 0
														? <p style={{ width: "fit-content"}}>{ReactEmoji.emojify(conversationReply.reply)}</p>
														: <p>Bạn đã thu hồi tin nhắn</p>
												}
												
												<span className="time_date">{convertTime(conversationReply.conversationReplyTime)}</span>
											</div>
										</div>
									</div>
							}
					</div>
				)
			}
		</div>
	)
}

export default ConversationReply;
