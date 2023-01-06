import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import AuthService from '../../services/auth.service';
import FriendService from '../../services/friend.service';
import ConverRoomCreate from './ConverRoom/ConverRoomCreate';

const ConversationDetail = ({ conver, toggleChat, onlineUsers, otherProfiles, otherUser }) => {
    const user = AuthService.getCurrentUser();

    const [friends, setFriends] = useState([]);
    const [isShowed, setIsShowed] = useState(false);

    useEffect(() => {
        FriendService.getListFriend(user.id)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        return () => {
            setFriends([])
        }
    }, []);

    return (
        <div>
            {
                isShowed && 
                <ConverRoomCreate
                    friends={friends}
                    usersInChat={{ userID: user.id, otherUserID: otherUser.otherUserID}}
                    onShow={setIsShowed}
                    onToggleChat={toggleChat}
                />
            }
            {
                otherProfiles.length >= 2
                ?   <div className="card">
                        <div className="card-body">
                            <button type="button" className="btn btn-primary btn-rounded btn-lg" onClick={ toggleChat }>
                                <i className="fa fa-arrow-left"></i>
                            </button>
                            <h3 className="text-center">{ conver.name }</h3>
                            <ul className="list-group">
                                {otherProfiles.map((profile, index) => <li key={index} className="list-group-item">{profile.firstName} {profile.lastName}</li>)}
                            </ul>
                        </div>
                    </div>
                :   otherProfiles.length === 1 && <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-primary btn-rounded" 
                                    onClick={ toggleChat }
                                >
                                    <i className="fa fa-arrow-left"></i>
                                </button>
                                <button type="button" className="btn btn-primary btn-rounded"
                                    onClick={() => {
                                        setIsShowed(prev => !prev);
                                    }}
                                >
                                    Add group
                                </button>
                            </div>
                            <div className="mt-3 text-center">
                                <Link to={"/profile/" + otherUser.otherUserID}>
                                    <img src={otherUser.avatar}
                                        className="current-chat-avatar rounded-circle img-fluid" alt="avatar" />
                                </Link>
                            </div>
                            <div className="text-center">
                                <h4 className="mb-2">{otherUser.firstName} {otherUser.lastName}</h4>
                                    <p className="text-muted">@{otherProfiles[0].user.username}</p>
                                    { 
                                        onlineUsers && onlineUsers.map((u, index) =>
                                            otherProfiles.some(mem => u.userID === mem.user.id)
                                                ?
                                                <p key={index} className="text-success">Người dùng đang hoạt động
                                                    <i className="ml-2 fa fa-globe text-success"></i>
                                                </p>
                                                : ""
                                        )
                                    }
                            </div>
                        </div>
                    </div>
                
            }
        </div>
    );
}

export default ConversationDetail;