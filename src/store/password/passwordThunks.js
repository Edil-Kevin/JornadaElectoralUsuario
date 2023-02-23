import {
	getDataVotantePassword,
	reenviarTokenEmail,
	registrarUsuario,
} from "../../providers/Micro-Token/providerToken";
import { onChecking, onError, onOk, onSaveEmailCurp } from "./passwordSlice";

export const onGetDataVotantePassword = (token) => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok, data } = await getDataVotantePassword(token);

		console.log("DATAAAAAAAA", data);
		if (ok) {
			dispatch(onOk());
			dispatch(onSaveEmailCurp(data));
		} else {
			dispatch(onError("Error bucle"));
		}
	};
};

export const onRegistrarUsuario = (password, email, curp, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok } = await registrarUsuario(password, email, curp);

		console.log("ok?????", ok);

		if (ok) {
			console.log("PETICION BIEN HECHA");
			dispatch(onOk());
			navigate();
		} else {
			dispatch(onError("Error"));
		}
	};
};
export const onReenviarTokenEmail = (email, curp, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onChecking());

		const { ok } = await reenviarTokenEmail(email, curp);

		console.log("ok?????", ok);

		if (ok) {
			console.log("PETICION BIEN HECHA");
			dispatch(onOk());
			navigate();
		} else {
			dispatch(onError("Error"));
		}
	};
};
