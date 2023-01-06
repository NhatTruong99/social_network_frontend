import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function PrivateRoute({ children }) {
    const currentUser = AuthService?.getCurrentUser();
    return (currentUser !== null) ? children : <Navigate to="/login" replace />;
}

