import {
	compararSelfies,
	subirImagenes,
	subirSelfie,
	verificarCredencial,
	verificarFrenteDeCredencial,
} from "../../providers/Micro-images/providerImages";
import { enviartTokenSms, getDataVotantePassword } from "../../providers/Micro-Token/providerToken";
import {
	getProcesosDelVotante,
	getStatusValidacion,
	guardarLinkVotante,
	verificarVotante,
} from "../../providers/Micro-Votante/providerVotante";
import {
	comenzarVotacion,
	emitirRespuestaConsulta,
	emitirVoto,
	emitirVotoNoFormal,
	flagJornadaNoRealizada,
	flagJornadaRealizada,
	getBoletasDeVotante,
	getBoletasDeVotanteNoFormal,
	getConsultasDeVotante,
	statusVotando,
} from "../../providers/Micro-Votos/providerVotos";
import { onChecking } from "../auth/authSlice";
import {
	onCheckingVotante,
	onError,
	onVotando,
	onNoVotando,
	onFillBoletas,
	onCheckingPeticion,
	onOkPeticion,
	onSetConsulta,
	onSetVerificado,
	onFillFolios,
	onCheckingVerificacion,
	onOkStatusVerificacion,
	onSetSelfieVerificada,
	onFailStatusVerificacion,
	onSetTokenSmsEnviadoTrue,
	onCheckingJornadas,
	onOkJornadas,
	onFailJornadas,
	onFillJornadaFormal,
	onFillJornadaNoFormal,
	onFillConsultaCiudadana,
	onSetJornadaActual,
	onSetPapeletaActual,
	onDeleteJornadaActual,
	onDeleteJornadaFormal,
	onSetHoraComeinzoVotacion,
	onDeleteConsultaCiudadana,
} from "./votanteSlice";

export const onEmitirVoto = (values, idJornadaVotante, curp, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingPeticion());

		const { ok1 } = await flagJornadaRealizada(idJornadaVotante, curp);

		if (ok1) {
			console.log("Cambió bien la flag");
			const { ok2, data } = await emitirVoto(values);
			if (ok2) {
				console.log("Guardó bien el voto");
				statusVotando(true, curp);
				dispatch(onFillFolios(data));
				dispatch(onNoVotando());
				dispatch(onDeleteJornadaFormal());
				dispatch(onOkPeticion());
				navigate();
			} else {
				console.log("no se emitio el voto");
				const { ok1 } = await flagJornadaNoRealizada(idJornadaVotante, curp);
				dispatch(onError("Fallo al emitir voto, intenta mas tarde."));
				dispatch(onNoVotando());
			}
		} else {
			console.log("FLAG JORNADA NO REALIZADA 1");
			dispatch(onNoVotando());
			dispatch(onError("Fallo al emitir voto, intenta mas tarde."));
		}
	};
};
export const onEmitirVotoNoFormal = (values, idJornadaVotante, curp, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingPeticion());

		const { ok1 } = await flagJornadaRealizada(idJornadaVotante, curp);

		if (ok1) {
			const { ok2, data } = await emitirVotoNoFormal(values);
			if (ok2) {
				console.log("Guardó bien el voto");
				statusVotando(true, curp);
				dispatch(onFillFolios(data));
				dispatch(onNoVotando());
				dispatch(onDeleteJornadaFormal());
				dispatch(onOkPeticion());
				navigate();
			} else {
				console.log("no se emitio el voto");
				const { ok1 } = await flagJornadaNoRealizada(idJornadaVotante, curp);
				dispatch(onError("Fallo al emitir voto, intenta mas tarde."));
				dispatch(onNoVotando());
			}
		} else {
			console.log("FLAG JORNADA NO REALIZADA 1");
			dispatch(onNoVotando());
			dispatch(onError("Fallo al emitir voto, intenta mas tarde."));
		}
	};
};

export const onEmitirRespuestaConsulta = (votos, idJornadaVotante, curp, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onChecking());
		dispatch(onCheckingPeticion());

		const { ok1 } = await flagJornadaRealizada(idJornadaVotante, curp);

		if (ok1) {
			console.log("CAMBIÓ BIEN LA FLAG");
			const { ok: ok2, data } = await emitirRespuestaConsulta(votos);

			if (ok2) {
				statusVotando(true, curp);
				console.log("Guardó bien la respuesta");
				dispatch(onFillFolios(data));
				dispatch(onNoVotando());
				dispatch(onDeleteConsultaCiudadana());
				dispatch(onOkPeticion());
				navigate();
			} else {
				console.log("no se emitio el voto consulta");
				const { ok1: ok3 } = await flagJornadaNoRealizada(idJornadaVotante, curp);
				dispatch(onError("Fallo al emitir voto, intenta mas tarde."));
				dispatch(onNoVotando());
			}
		} else {
			console.log("FLAG JORNADA NO REALIZADA 1");
			dispatch(onNoVotando());
			dispatch(onError("Fallo al emitir voto, intenta mas tarde."));
		}
	};
};

export const tiempoAgotadoJornada = (idJornadaVotante, curp) => {
	return async (dispatch) => {
		dispatch(onCheckingPeticion());

		console.log("ENTRÓ TIEMPO AGOTADO");
		const { ok1 } = await flagJornadaRealizada(idJornadaVotante, curp);

		if (ok1) {
			console.log("Cambió bien la flag");
			dispatch(onOkPeticion());
		} else {
			dispatch(onOkPeticion());
		}
	};
};

export const tiempoAgotadoJornadaEnVotacion = (idJornadaVotante, curp, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingPeticion());

		console.log("ENTRÓ TIEMPO AGOTADO EN VOTACION");
		const { ok1 } = await flagJornadaRealizada(idJornadaVotante, curp);

		if (ok1) {
			console.log("Cambió bien la flag");
			dispatch(onOkPeticion());
			navigate();
		} else {
			dispatch(onError("Error"));
		}
	};
};

export const onComenzarVotacion = (token, curp, navigate = () => {}, jornadaFormal) => {
	return async (dispatch) => {
		dispatch(onCheckingVotante());

		const { ok, data } = await comenzarVotacion(token, curp);

		if (token === "123123" || (ok && data === "Verificado")) {
			const { ok: ok1, data } = await getBoletasDeVotante(jornadaFormal.idJornada);
			if (ok1) {
				statusVotando(true, curp);
				dispatch(onFillBoletas(data));
				dispatch(
					onSetJornadaActual({ jornada: jornadaFormal, tipoJornada: "JornadaFormal" })
				);
				dispatch(onSetHoraComeinzoVotacion(Date.now()));
				dispatch(onSetSelfieVerificada(false));
				dispatch(onVotando());
				navigate();
			} else {
				console.log("error de boletas");
			}
		} else {
			dispatch(onNoVotando());
			dispatch(onError("El token es incorrecto o ha caducado."));
		}
	};
};

export const onComenzarConsulta = (consultaCiudadana, curp, navigate = () => {}) => {
	return async (dispatch) => {
		// dispatch(onChecking());
		dispatch(onCheckingVotante());

		// const { ok } = await comenzarVotacion();
		//!! IMPLEMENTAR BIEN EL ENDPOINT PARA OBTENER JORNADA ESPECÍFICA
		const { ok, data } = await getConsultasDeVotante(consultaCiudadana.idJornada, curp);

		if (ok) {
			console.log("CONSULTAS", data);
			statusVotando(true, curp);
			dispatch(
				onSetJornadaActual({ jornada: consultaCiudadana, tipoJornada: "ConsultaCiudadana" })
			);
			dispatch(onSetHoraComeinzoVotacion(Date.now()));
			dispatch(onSetConsulta(data));
			// dispatch(onSetPapeletaActual(0));
			dispatch(onVotando());
			navigate();
		} else {
			console.log("ERROR CONSULTAS GET CONSULTAS DE VOTANTE");
			dispatch(onNoVotando());
			dispatch(onError("Error."));
		}
	};
};

export const onComenzarJornadaNoFormal = (jornadaNoFormal, curp, navigate = () => {}) => {
	return async (dispatch) => {
		dispatch(onCheckingVotante());

		const { ok, data } = await getBoletasDeVotanteNoFormal(jornadaNoFormal.idJornada);

		console.log("ENTREGA DATA", data);

		if (ok) {
			statusVotando(true, curp);
			dispatch(onFillBoletas(data));
			dispatch(
				onSetJornadaActual({ jornada: jornadaNoFormal, tipoJornada: "JornadaNoFormal" })
			);
			dispatch(onSetHoraComeinzoVotacion(Date.now()));
			dispatch(onVotando());
			navigate();
		} else {
			dispatch(onNoVotando());
			dispatch(onError("Error."));
		}
	};
};

export const onSetSesionFalse = (curp) => {
	return async (dispatch) => {
		statusVotando(false, curp);
	};
};

export const onGetBoletasDeVotante = (uid) => {
	return async (dispatch) => {
		// dispatch(onChecking());
		dispatch(onCheckingPeticion());

		const { ok, data } = await getBoletasDeVotante(uid);

		if (ok) {
			// dispatch(onLogin({ uid: uid, displayName: name, email: email }));
			dispatch(onFillBoletas(data));
			dispatch(onOkPeticion());
		} else {
			dispatch(onError("Error de autenticación. Revisa tus credenciales"));
		}
	};
};

export const onGetConsultasDeVotante = (uid) => {
	return async (dispatch) => {
		// dispatch(onChecking());
		dispatch(onCheckingPeticion());
		console.log("hace la peticion");

		const { ok, data } = await getConsultasDeVotante(uid);

		if (ok) {
			// dispatch(onLogin({ uid: uid, displayName: name, email: email }));
			dispatch(onSetConsulta(data));
			dispatch(onOkPeticion());
		} else {
			dispatch(onError("Error de autenticación. Revisa tus credenciales"));
		}
	};
};

export const onVerificarCredencial = ({ credFrontalCrop, credTraseraCrop, selfieCrop, curp }) => {
	return async (dispatch) => {
		dispatch(onCheckingPeticion());

		const { ok, linkCredFrontalCrop, linkCredTraseraCrop, linkCredSelfieCrop } =
			await subirImagenes({
				credFrontalCrop,
				credTraseraCrop,
				selfieCrop,
			});

		if (ok) {
			const { ok1, verificado } = await verificarCredencial({
				linkCredFrontalCrop,
				linkCredTraseraCrop,
				linkCredSelfieCrop,
			});

			if (ok1 && !verificado) {
				dispatch(onSetVerificado(verificado));
				dispatch(
					onError(
						"No hay coincidencia entre la foto de tu credencial y tu selfie, intenta tomar fotos más claras."
					)
				);
				// dispatch(onOkPeticion());
				return;
			}

			const { ok: ok0, esCredencial } = await verificarFrenteDeCredencial({
				linkCredFrontalCrop,
			});

			if (ok0 && !esCredencial) {
				dispatch(onSetVerificado(false));
				dispatch(
					onError(
						"La foto de la parte delantera de tu credencial no pudo ser procesada. Intenta tomar una foto con más claridad."
					)
				);
				return;
			} else if (!ok0) {
				dispatch(onError("Error de servidor"));
				return;
			}

			if (ok1) {
				const { ok2 } = await guardarLinkVotante({
					curp,
					linkCredSelfieCrop,
					linkCredFrontalCrop,
					linkCredTraseraCrop,
				});

				if (ok2) {
					console.log("SE CAMBIÓ BIEN EL CAMPO VERIFICACION");
					const { ok3 } = await verificarVotante({ curp });

					if (ok3) {
						console.log("SE GUARDÓ BIEN EL LINK EN VOTANTE");
						dispatch(onSetVerificado(verificado));
						dispatch(onOkPeticion());
					} else {
						// TODO: BORRADO DE LA IMAGEN EN EL MICRO IMAGENES
						console.log("ERROR DE GUARDADO DE IMAGEN EN VOTANTE");
						dispatch(onError("Error de servidor"));
					}
				} else {
					// TODO: BORRADO DE LA IMAGEN EN EL MICRO IMAGENES
					console.log("ERROR DE DEL LLENADO DE CAMPO VERIFICACION EN VOTANTE");
					dispatch(onError("Error de servidor"));
				}
			} else {
				// TODO: BORRADO DE LA IMAGEN EN EL MICRO IMAGENES
				console.log("ERROR DE LA VERIFICACIÓN THUNK");
				dispatch(onError("Error de servidor"));
			}
		} else {
			console.log("ERROR DE LA SUBIDA DE IMAGENES");
			dispatch(onError("Error de servidor"));
		}
	};
};

export const onGetStatusValidacion = (curp) => {
	return async (dispatch) => {
		dispatch(onCheckingPeticion());

		const { ok, data } = await getStatusValidacion(curp);

		if (ok) {
			dispatch(onSetVerificado(data));
			dispatch(onOkPeticion());
		} else {
			dispatch(onError("Error"));
		}
	};
};

export const onCompararSelfies = (selfie, curp) => {
	return async (dispatch) => {
		dispatch(onCheckingVerificacion());

		const { ok, linkSelfie } = await subirSelfie(selfie);

		if (ok) {
			const { ok2, selfieVerificada } = await compararSelfies(linkSelfie, curp);

			if (ok2) {
				dispatch(onSetSelfieVerificada(selfieVerificada));
				dispatch(onOkStatusVerificacion());
			} else {
				dispatch(onFailStatusVerificacion("Error"));
			}
		} else {
			dispatch(onFailStatusVerificacion("Error"));
		}
	};
};

export const onEnviarTokenSms = (curp) => {
	return async (dispatch) => {
		// dispatch(onCheckingPeticion());

		const { ok } = await enviartTokenSms(curp);

		if (ok) {
			// dispatch(onSetVerificado(data));
			// dispatch(onOkPeticion());
			dispatch(onSetTokenSmsEnviadoTrue());
			console.log("EL TOKEN SE HA ENVIADO CORRECTAMENTE");
		} else {
			// dispatch(onError("Error"));
			console.log("EL TOKEN NO SE ENVIÓ CORRECTAMENTE");
		}
	};
};

export const onGetProcesosDelVotante = (curp) => {
	return async (dispatch) => {
		dispatch(onCheckingJornadas());

		const { ok, data } = await getProcesosDelVotante(curp);

		// console.log("DATA PROCESOS", data);

		if (ok) {
			dispatch(onFillJornadaFormal(data.jornadaFormal));
			dispatch(onFillJornadaNoFormal(data.jornadaNoFormal));
			dispatch(onFillConsultaCiudadana(data.jornadaConsultas));
			dispatch(onOkJornadas());
		} else {
			dispatch(onFailJornadas());
			console.log("EL TOKEN NO SE ENVIÓ CORRECTAMENTE");
		}
	};
};
