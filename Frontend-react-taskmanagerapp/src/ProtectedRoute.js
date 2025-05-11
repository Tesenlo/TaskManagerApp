import React, { Component } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children}) =>{
    //Get the token from LocalStorage
    const token = localStorage.getItem("authToken");

    return token ? children : <Navigate to= "/login"/>;
};

export default ProtectedRoute;