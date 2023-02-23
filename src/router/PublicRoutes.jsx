import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ children }) => {
	// const logged = true;
	// return !logged ? children : <Navigate to={"/votacion/inicio"} />;
	return children;
};
