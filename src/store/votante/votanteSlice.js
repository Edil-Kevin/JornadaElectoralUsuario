import { createSlice } from "@reduxjs/toolkit";

export const votanteSlice = createSlice({
	name: "votante",
	initialState: {
		status: "noVotando", //noVotando, votando, checking
		errorMessage: "",
		statusPeticion: "off", //checking, ok, fail, off
		statusVerificacion: "off", //checking, ok, fail, off
		statusJornadas: "off",
		jornadaFormal: null,
		jornadaNoFormal: null,
		consultaCiudadana: null,
		boletas: [],
		boletaActual: {
			candidatos: [],
			entidad: "",
			distritoElectoral: "",
			municipio: "",
		},
		votos: [],
		folios: [],
		candidaturaNoRegistrada: [],
		consulta: {
			nombre: "",
			entidad: "",
		},
		papeletas: [],
		papeletaActual: {
			distritoElectoral: "",
			municipio: "",
			pregunta: {
				descPregunta: "",
			},
		},
		respuestasPapeletas: [],
		verificado: false,
		selfieVerificada: false,
		tokenSmsEnviado: false,
		jornadaActual: null,
		horaComienzoVotacion: null,
	},
	reducers: {
		onSetHoraComeinzoVotacion: (state, { payload }) => {
			state.horaComienzoVotacion = payload;
		},
		onDeleteJornadaFormal: (state) => {
			state.jornadaFormal = null;
		},
		onDeleteConsultaCiudadana: (state) => {
			state.consultaCiudadana = null;
		},
		onDeleteJornadaActual: (state) => {
			state.jornadaActual = null;
		},
		onSetJornadaActual: (state, { payload }) => {
			console.log("LO QUE LLEGA PAYLOAD", payload);
			state.jornadaActual = { ...payload.jornada, tipoJornada: payload.tipoJornada };
		},
		onCheckingJornadas: (state) => {
			state.statusJornadas = "checking";
		},
		onOkJornadas: (state) => {
			state.statusJornadas = "ok";
		},
		onFailJornadas: (state) => {
			state.statusJornadas = "fail";
		},
		onOffJornadas: (state) => {
			state.statusJornadas = "off";
		},
		onSetTokenSmsEnviadoTrue: (state) => {
			state.tokenSmsEnviado = true;
		},
		onSetTokenSmsEnviadoFalse: (state) => {
			state.tokenSmsEnviado = false;
		},
		onCheckingPeticion: (state) => {
			state.statusPeticion = "checking";
		},
		onOkPeticion: (state) => {
			state.statusPeticion = "ok";
		},
		onFailPeticion: (state) => {
			state.statusPeticion = "fail";
		},
		onOffPeticion: (state) => {
			state.statusPeticion = "off";
		},
		onCheckingVerificacion: (state) => {
			state.statusVerificacion = "checking";
		},
		onOkStatusVerificacion: (state) => {
			state.statusVerificacion = "ok";
		},
		onFailStatusVerificacion: (state) => {
			state.statusVerificacion = "fail";
		},
		onOffStatusVerificacion: (state) => {
			state.statusVerificacion = "off";
		},
		onCheckingVotante: (state) => {
			state.status = "checking";
		},
		onVotando: (state) => {
			state.status = "votando";
		},
		onNoVotando: (state) => {
			state.status = "noVotando";
		},
		onError: (state, { payload }) => {
			state.statusPeticion = "fail";
			state.errorMessage = payload;
		},
		onFillBoletas: (state, { payload }) => {
			state.boletas = payload;
		},
		onSetBoletaActual: (state, { payload }) => {
			state.boletaActual = state.boletas[payload - 1];
		},
		onAddVoto: (state, { payload }) => {
			state.votos[payload.noBoleta - 1] = [].concat(payload.seleccionados);
		},
		onAddCandidaturaNoRegistrada: (state, { payload }) => {
			console.log("PAYLOAD", payload);
			state.candidaturaNoRegistrada[payload.noBoleta - 1] = payload.candidaturaNoRegistrada;
		},
		onSetConsulta: (state, { payload }) => {
			state.consulta.nombre = payload.nombreJornada;
			state.consulta.entidad = payload.entidad;
			state.papeletas = payload.papeletas;
		},
		onAddRespuesta: (state, { payload }) => {
			state.respuestasPapeletas[payload.noPapeleta] = payload.respuesta;
		},
		onSetPapeletaActual: (state, { payload }) => {
			state.papeletaActual = state.papeletas[payload];
		},
		onSetVerificado: (state, { payload }) => {
			state.verificado = payload;
		},
		onSetSelfieVerificada: (state, { payload }) => {
			state.selfieVerificada = payload;
		},
		onFillFolios: (state, { payload }) => {
			state.folios = payload;
		},
		onFillJornadaFormal: (state, { payload }) => {
			state.jornadaFormal = payload;
		},
		onFillJornadaNoFormal: (state, { payload }) => {
			state.jornadaNoFormal = payload;
		},
		onFillConsultaCiudadana: (state, { payload }) => {
			state.consultaCiudadana = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	onCheckingVotante,
	onVotando,
	onNoVotando,
	onError,
	onFillBoletas,
	onCheckingPeticion,
	onOkPeticion,
	onFailPeticion,
	onOffPeticion,
	onSetBoletaActual,
	onAddVoto,
	onAddCandidaturaNoRegistrada,
	onSetConsulta,
	onAddRespuesta,
	onSetPapeletaActual,
	onSetVerificado,
	onFillFolios,
	onCheckingVerificacion,
	onOkStatusVerificacion,
	onFailStatusVerificacion,
	onOffStatusVerificacion,
	onSetSelfieVerificada,
	onSetTokenSmsEnviadoTrue,
	onSetTokenSmsEnviadoFalse,
	onCheckingJornadas,
	onOkJornadas,
	onFailJornadas,
	onOffJornadas,
	onFillConsultaCiudadana,
	onFillJornadaFormal,
	onFillJornadaNoFormal,
	onDeleteJornadaActual,
	onSetJornadaActual,
	onDeleteJornadaFormal,
	onSetHoraComeinzoVotacion,
	onDeleteConsultaCiudadana,
} = votanteSlice.actions;

// export default consultaCiudadanaSlice.reducer;
