import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { LoginVotacionPage } from "../module-auth/pages/LoginVotacionPage";
import { AuthRoutes } from "../module-auth/routes/AuthRoutes";
import { useCheckAuth } from "../module-home/hooks/useCheckAuth";
import { HomeRoutes } from "../module-home/routes/HomeRoutes";
import { CheckingPage } from "../module-votacion/pages/CheckingPage";
import { ResultadosRoutes } from "../module-resultados/routes/Resultados.routes";
import { VotacionRoutes } from "../module-votacion/routes/votacionRoutes";
import { initAxiosInterceptors } from "../providers/Micro-Auth/configAuth";
import { CiudadanoRoutes } from "../routes/CiudadanoRoutes";
import { onLogin } from "../store/auth/authSlice";
import { AuthPublicRoutes } from "./AuthPublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { Alert, Snackbar } from "@mui/material";

export const AppRouter = () => {
	// initAxiosInterceptors();
	// const { status } = useSelector((state) => state.auth);
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		function handleOnlineStatus() {
			setIsOnline(navigator.onLine);
		}

		window.addEventListener("online", handleOnlineStatus);
		window.addEventListener("offline", handleOnlineStatus);

		return () => {
			window.removeEventListener("online", handleOnlineStatus);
			window.removeEventListener("offline", handleOnlineStatus);
		};
	}, []);

	const { status } = useCheckAuth();
	// const status = "checking";

	const location = useLocation();
	// console.log(location);
	sessionStorage.setItem("Location", location.pathname);

	if (status === "checking") {
		return <CheckingPage />;
	} else
		return (
			<>
				<Snackbar
					open={!isOnline}
					autoHideDuration={90000}
					// onClose={handleClose}
					// message="Note archived"
					// action={action}
				>
					<Alert severity="error">No tienes conexión a internet</Alert>
				</Snackbar>
				<Routes>
					<Route
						path="/*"
						element={
							<PublicRoutes>
								<CiudadanoRoutes />
							</PublicRoutes>
						}
					/>

					<Route
						path="/auth/*"
						element={
							<AuthPublicRoutes status={status}>
								<AuthRoutes />
							</AuthPublicRoutes>
						}
					/>

					<Route
						path="/votacion/*"
						element={
							<PrivateRoutes status={status}>
								<VotacionRoutes />
							</PrivateRoutes>
						}
					/>

					<Route
						path="/resultados/*"
						element={
							<PublicRoutes>
								<ResultadosRoutes />
							</PublicRoutes>
						}
					/>
				</Routes>
			</>
		);
};
