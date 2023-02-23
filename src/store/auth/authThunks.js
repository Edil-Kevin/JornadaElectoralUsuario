import { deleteToken, setRefreshToken, setToken } from "../../providers/Micro-Auth/configAuth";
import {
	loginWithEmailAndPassword,
	logout,
	refreshToken,
} from "../../providers/Micro-Auth/providerAuth";

import { onChecking, onError, onLogin, onLogout } from "./authSlice";

export const onLoginWithEmailAndPassword = (email, password, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok, accessToken, username, refreshToken, errorMessage, status } =
			await loginWithEmailAndPassword(email, password);

		if (ok) {
			console.log("TODO BIEN");
			dispatch(onLogin({ accessToken, username, refreshToken, email }));
			setToken(accessToken);
			setRefreshToken(refreshToken);
			navigate();
		} else {
			dispatch(onError(status === 401 ? "Credenciales inválidas" : errorMessage));
		}
	};
};

export const onLogoutThunk = (navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok } = await logout();

		if (ok) {
			deleteToken();
			navigate();
			dispatch(onLogout());
		} else {
			dispatch(onError("Error"));
		}
	};
};

export const onRefreshSession = () => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok, refreshResponse, user } = await refreshToken();

		if (ok) {
			dispatch(
				onLogin({
					accessToken: refreshResponse.accessToken,
					username: user.curp,
					refreshToken: refreshResponse.refreshToken,
					email: user.email,
				})
			);
			setToken(refreshResponse.accessToken);
			setRefreshToken(refreshResponse.refreshToken);
		} else {
			dispatch(onError("Error"));
		}
	};
};
