import React from "react";
import { Navigate } from "react-router-dom";

export const AuthPublicRoutes = ({ children, status }) => {
	return status === "logged" ? <Navigate to={"/votacion/inicio"} /> : children;
};
