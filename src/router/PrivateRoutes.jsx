import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children, status }) => {
	// const { status } = useSelector((state) => state.auth);

	return status === "logged" ? children : <Navigate to={"/home"} />;
};
