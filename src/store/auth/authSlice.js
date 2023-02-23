import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: "checking", //logged, checking, notLogged
		// status: "checking",
		accessToken: "",
		email: "",
		username: "",
		errorMessage: "",
		refreshToken: "",
		curp: "",
	},
	reducers: {
		onChecking: (state, { payload }) => {
			state.status = "checking";
		},
		onLogin: (state, { payload }) => {
			state.status = "logged";
			state.accessToken = payload.accessToken;
			state.refreshToken = payload.refreshToken;
			state.username = payload.username;
			state.email = payload.email;
		},
		onLogout: (state, { payload }) => {
			state.status = "notLogged";
			state.accessToken = "";
			state.refreshToken = "";
			state.username = "";
			state.email = "";
		},
		onError: (state, { payload }) => {
			state.status = "notLogged";
			state.errorMessage = payload;
		},
		onRefres: (state, { payload }) => {
			state.status = "logged";
			state.accessToken = payload.accessToken;
			state.refreshToken = payload.refreshToken;
			state.username = payload.username;
			state.email = payload.email;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, onError } = authSlice.actions;

// export default consultaCiudadanaSlice.reducer;
