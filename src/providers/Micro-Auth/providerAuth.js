import { authAPI, TOKEN_KEY, REFRESH_TOKEN_KEY } from "./configAuth";

export const loginWithEmailAndPassword = async (email, password) => {
	try {
		const { data } = await authAPI.post("api/auth/signin", {
			curp: email,
			password: password,
		});

		console.log("DATA: ", data);
		return {
			ok: true,
			accessToken: data.accessToken,
			username: data.username,
			refreshToken: data.refreshToken,
		};
	} catch (error) {
		// const { error: m } = error.response.data;
		console.log("PER ERROR", error.response.status);
		return { ok: false, errorMessage: error.message, status: error.response.status };
	}
};
export const logout = async (email, password) => {
	try {
		console.log("SESSION", sessionStorage.getItem(TOKEN_KEY));

		const { data } = await authAPI.post(
			"api/auth/signout",
			{},
			{
				headers: {
					Authorization: "Bearer " + sessionStorage.getItem(TOKEN_KEY),
				},
			}
		);

		console.log("DATA LOGOUT: ", data);
		return { ok: true };
	} catch (error) {
		console.log("ERROR", error);
		return { ok: false };
	}
};
export const refreshToken = async (refreshToken) => {
	try {
		const { data } = await authAPI.post("api/auth/refreshtoken", {
			refreshToken: sessionStorage.getItem(REFRESH_TOKEN_KEY),
		});

		// console.log("DATA REFRESH: ", data);
		return { ok: true, refreshResponse: data.refreshResponse, user: data.user };
	} catch (error) {
		console.log("ERROR REFRESH", error);
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
