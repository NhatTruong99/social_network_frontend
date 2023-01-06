import React, { useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import { io, Socket } from "socket.io-client";
const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const socket = useRef()

    useEffect(()=> {
        socket.current = io.connect("ws://localhost:8900")
        socket.current.emit("addUser",currentUser.id)
    })

    return (
        <div className="container">
            <header className="jumbotron">
                <h3><strong>{currentUser.username}</strong> Profile</h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p><strong>Id:</strong> {currentUser.id}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};

export default Profile;
