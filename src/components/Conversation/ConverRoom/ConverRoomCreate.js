import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";

import ConversationService from "../../../services/conver.service";

const ConverRoomCreate = ({ friends, onToggleChat, usersInChat, onShow }) => {

    const form = useRef();
    /* const checkboxs = useRef([]); */

    const [membersID, setMembersID] = useState([]);
    /* const [isChecked, setIsChecked] = useState(false); */

    useEffect(() => {
        return () => {
            setMembersID([]);
        }
    }, []);

    /* useEffect(() => {
        checkboxs.current = checkboxs.current.slice(0, friends.length);
    }, [friends]); */

    const handleSubmit = (event) => {
        event.preventDefault();
        membersID.push(usersInChat.userID);
        membersID.push(usersInChat.otherUserID);
        console.log(membersID);
        ConversationService.createConversationRoom({ membersID })
            .then(res => {
                onToggleChat();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChange = ({target: {checked, value: checkedValue}}) => {
        if (checked) {
            setMembersID(prev => [...prev, parseInt(checkedValue)]);
        } else {
            setMembersID(prev => prev.filter(oldValue => oldValue !== parseInt(checkedValue)))
        }
        
    }

    return (
        <div className="modal-container">
            <div className="modal-main p-3 col-md-6 col-lg-4"> 
            <div className="border-bottom">
                <h3 className="text-center">Add New Group Chat</h3>
                <button 
                    type="button" className="btn btn-secondary position-absolute" 
                    style={{top: "0px", right: "0px"}}
                    onClick={() => {
                        onShow(prev => !prev)
                    }}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <Form ref={form}>
                <h4>Friends</h4>
                {
                    friends && friends.map((friend, index) => <div key={index} className="form-check">
                            <input 
                                /* ref={el => checkboxs.current[index] = el}  */
                                className="form-check-input" 
                                type="checkbox" 
                                value={friend.user.id}
                                onChange={handleChange}
                                id="flexCheckDefault" 
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {friend.firstName} {friend.lastName}
                            </label>
                        </div>
                    )
                }
                <button 
                        type="button" 
                        className="btn btn-primary w-100" 
                        onClick={ handleSubmit }
                > Create </button>
            </Form>
            
            </div>
        </div>
    )
}

export default ConverRoomCreate