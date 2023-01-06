import React ,{ useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';

import AuthService from '../../services/auth.service';
import ConversationService from '../../services/conver.service';

function SendMessage({socket, increaseRenderValue, currentConversation, room}) {

	const user = AuthService.getCurrentUser();

	const [messageInput,setMessageInput] = useState("");

	const sendMessage = () => {
		var reply = messageInput;
		var conversationReplyTime = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();
		var conversation = currentConversation;
		const status = 0
		var ConversationReply = {reply, conversationReplyTime, status, user, conversation}

		ConversationService.createConversationReply(ConversationReply)
			.then(res => {
				increaseRenderValue();
			})
			.catch((err)=>{
				console.log(err)
			});
		ConversationService.readOthersUserID(currentConversation.id, user.id)
			.then(res => {
				socket.emit("sendMessage",{
					senderID: user.id,
					receiversID: res.data,
					text: messageInput,
					room: room
				})
			})
		setMessageInput('');
	}

	return (
		<div className="input_msg_write">
			<TextareaAutosize 
				className="write_msg" 
				placeholder="Type a message" 
				autoFocus
				id="TextAreaResizeable"
				name="inputComment" 
				value = {messageInput}
				onChange= {(e)=> setMessageInput(e.target.value)}   
			/>
			<button disabled={!messageInput} className="msg_send_btn" type="button" onClick={()=> sendMessage()}>
				<i className="fa fa-paper-plane-o" aria-hidden="true"></i>
			</button>
		</div>
	);
}

export default SendMessage
