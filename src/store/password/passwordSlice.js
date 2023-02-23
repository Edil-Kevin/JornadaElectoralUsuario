import { createSlice } from "@reduxjs/toolkit";

export const passwordSlice = createSlice({
	name: "password",
	initialState: {
		// status: //ok, error, checking
		status: "ok",
		email: "",
		errorMessage: "",
		curp: "",
	},
	reducers: {
		onChecking: (state) => {
			state.status = "checking";
		},
		onOk: (state) => {
			state.status = "ok";
		},
		onError: (state, { payload }) => {
			state.status = "error";
			state.errorMessage = payload;
		},
		onSaveEmailCurp: (state, { payload }) => {
			state.email = payload.email;
			state.curp = payload.curp;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChecking, onOk, onError, onSaveEmailCurp } = passwordSlice.actions;

// export default consultaCiudadanaSlice.reducer;
