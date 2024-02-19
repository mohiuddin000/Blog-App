import React from "react";
// import { logout } from "../../Store1/authSlice";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

import "./LogoutButton.css";
import { logout } from "../../Store1/authSlice";
function LogoutButton() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        });
    };

    return (
        <button className="logout" onClick={logoutHandler}>
            Logout
        </button>
    );
}

export default LogoutButton;
