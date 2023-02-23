import { authAPI } from "../Micro-Auth/configAuth";
import { tokenApi, tokenSmsApi } from "./configToken";

export const getDataVotantePassword = async (token) => {
	try {
		const response = await tokenApi.get(`email/validation/verification/${token}`);
		// await timeout(1000);

		console.log("DATA USER: ", response);
		return { ok: true, data: response.data };
	} catch (error) {
		console.log("ERROR DATA USER", error);
		return { ok: false };
	}
};

export const registrarUsuario = async (password, email, curp) => {
	console.log("La data que llega", password, email, curp);
	try {
		const { data } = await authAPI.post(`api/auth/signup`, {
			curp: curp,
			email: email,
			password: password,
			roles: ["ROLE_VOTANTE"],
		});
		// await timeout(4000);

		// console.log("DATA USER: ", data);
		return { ok: true };
	} catch (error) {
		console.log("ERROR DATA USER", error);
		return { ok: false };
	}
};

export const reenviarTokenEmail = async (email, curp) => {
	console.log("La data que llega", email, curp);
	try {
		const response = await tokenApi.post(`email/validation/send_token`, {
			dateTimeCreation: new Date().toISOString(),
			dateTimeExpiration: new Date().toISOString(),
			email: email,
			subject: "RESTABLECIMIENTO DE CONTRASEÑA",
			userName: curp,
		});
		// await timeout(4000);

		console.log("REENVIO ", response);
		return { ok: true };
	} catch (error) {
		console.log("ERROR DATA USER", error);
		return { ok: false };
	}
};

export const enviartTokenSms = async (curp) => {
	console.log("CURP QUE LLEGAAAA", curp);
	try {
		const response = await tokenApi.post(`sms/validation/sendtoken`, {
			curp: curp,
		});
		// await timeout(1000);

		console.log("POST TOKEN", response);
		return { ok: true };
	} catch (error) {
		console.log("ERROR POST ENVIO TOKEN SMS", error);
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
