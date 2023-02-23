import { authAPI } from "../Micro-Auth/configAuth";
import { consultasAPI } from "../Micro-ConsultasCiudadanas/configConsultas";
import { jornadaFormalApi } from "../Micro-JornadaFormal/configjornadaFormal";
import { jornadaNoFormalApi } from "../Micro-JornadaNoFormal/configNoFormal";
import { tokenApi, tokenSmsApi } from "../Micro-Token/configToken";
import { votanteAPI, votanteJornadaAPI } from "../Micro-Votante/votanteConfig";
import { votosAPI, votosConsultaAPI, votosNoFormalAPI } from "./configVotos";

export const emitirVoto = async (values) => {
	try {
		let folios = [];
		console.log("VOTOS QUE LLEGAN A PROV FORMALES", values);
		for (const voto of values) {
			const { data } = await votosAPI.post("votos_seguros/registrar/boleta", voto);
			const { boletaModel } = data;
			const { folioBoleta, nombreEleccion } = boletaModel;
			folios.push({ folioBoleta, nombreEleccion });
		}

		return { ok2: true, data: folios };
	} catch (error) {
		return { ok2: false };
	}
};
export const emitirVotoNoFormal = async (values) => {
	try {
		console.log("VOTOS QUE LLEGAN A PROV", values);
		let folios = [];
		for (const voto of values) {
			const { data } = await votosNoFormalAPI.post("votos/no/formal/registrar/boleta", voto);
			const { boletaModel } = data;
			console.log("BOLETA MODEL DE FOLIOS NO FORMALES", boletaModel);
			const { folioBoleta, nombreEleccion } = boletaModel;
			folios.push({ folioBoleta, nombreEleccion });
		}

		console.log("FOLIOS NO FORMAL", folios);

		return { ok2: true, data: folios };
	} catch (error) {
		return { ok2: false };
	}
};
export const flagJornadaRealizada = async (idJornadaVotante, curp) => {
	try {
		const { data } = await votanteJornadaAPI.put(
			`jornadavotante/${curp}/jornada/${idJornadaVotante}/update/realizacion`,
			{
				flag: false,
			}
		);

		// https://ms-votante.herokuapp.com/jornadavotante/DIRA991216HOCGVN02/jornada/EL-DE-CO-ES-IN-SI-ORD-2023/update/realizacion

		// https: console.log("data flag realizada", data);

		return { ok1: true };
	} catch (error) {
		return { ok1: false };
	}
};
export const flagJornadaNoRealizada = async (idJornadaVotante, curp) => {
	try {
		const { data } = await votanteJornadaAPI.put(
			`jornadavotante/${curp}/jornada/${idJornadaVotante}/update/realizacion`,
			{
				flag: false,
			}
		);

		https: console.log("data flag no realizada", data);

		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

export const emitirRespuestaConsulta = async (votos) => {
	try {
		// await timeout(500);

		let folios = [];
		for (const voto of votos) {
			console.log("VOTO FOR", voto);
			console.log("VOTO FOR STRING", JSON.stringify(voto));
			const { data } = await votosConsultaAPI.post("votos/consulta/registrar/boleta", voto);

			console.log("DATA EMITIR RESP", data);
			const { boletaModel } = data;
			const { folioBoleta, nombreEleccion } = boletaModel;
			folios.push({ folioBoleta, nombreEleccion });
		}

		return { ok: true, data: folios };
	} catch (error) {
		return { ok: false };
	}
};

export const comenzarVotacion = async (token, curp) => {
	try {
		const { data } = await tokenApi.get(`sms/validation/${token}/verification/${curp}`);
		console.log("RESPUESTA GET TOKEN", data);
		return { ok: true, data: data.data || "No verificado" };
	} catch (error) {
		return { ok: false };
	}
};

export const statusVotando = async (status, curp) => {
	try {
		const { data } = await authAPI.put(`api/auth/status/sesion/${curp}`, {
			status: status,
		});
		console.log("RESPUESTA STATUS VOTANDO", data);
		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

export const getBoletasDeVotante = async (idJornada) => {
	try {
		await timeout(2000);

		const { data } = await jornadaFormalApi.get(
			`jornada/electoral/${idJornada}/informacion/completa/`
		);

		console.log("BOLETAS OBTENIDAS DE JORNADA", data);

		let boletas1 = [];

		data.boletas.forEach((boleta, index) => {
			let partidos = [];
			boleta.partidos.forEach((partido, indexPartido) => {
				partidos.push({
					idCandidato: partido.candidato.idCandidato,
					id: partido.partido.clavePartido,
					claveCoalicion:
						partido.coalicion === null
							? "SinCoalicion" + parseInt(Math.random() * (10000 - 1) + 1)
							: partido.coalicion.claveCoalicion,
					nombrePartido: partido.partido.nombre,
					nombre: `${partido.candidato.nombreCandidato} ${partido.candidato.apellidoPCandidato} ${partido.candidato.apellidoMCandidato}`,
					nombreSuplente: `${partido.suplente.nombreSuplente} ${partido.suplente.apellidoPSuplente} ${partido.suplente.apellidoMSuplente}`,
					clavePartido: partido.partido.clavePartido,
					logo: partido.partido.logo,
				});
			});

			boletas1.push({
				encabezado: boleta.boletaModel.nombreEstructuraBoleta,
				idEstructuraBoleta: boleta.boletaModel.idEstructuraBoleta,
				jornadaElectoral: data.jornadaModel.nombreJornada,
				entidad: data.jornadaModel.entidad,
				distritoElectoral: boleta.boletaModel.distrito,
				municipio: boleta.boletaModel.municipio,
				maxOpciones: 100,
				minOpciones: 1,
				// modalidad: "Representante",
				votoNulo: true,
				candidaturaNoRegistrada: true,
				candidatos: partidos,
			});
		});

		console.log("BOLETAS CONVERTIDAS", boletas1);

		return { ok: true, data: boletas1 };
	} catch (error) {
		console.log("ERRORRRRRRRR", error.message);
		return { ok: false };
	}
};

export const getBoletasDeVotanteNoFormal = async (idJornada) => {
	try {
		const { data } = await jornadaNoFormalApi.get(
			`jornada/no_formal/${idJornada}/informacion/completa`
		);

		console.log("BOLETAS OBTENIDAS DE NO FORMAL", data);

		let boletas1 = [];

		data.boletaModCands.forEach((boleta, index) => {
			if (
				boleta.modalidad.modalidad === "REPRESENTANTE" ||
				boleta.modalidad.modalidad === "COMITE"
			) {
				let misCandidatos = [];
				boleta.candidatos.forEach((candidato, indexPartido) => {
					misCandidatos.push({
						id: candidato.candidatoModel.claveCandidato,
						nombre: `${candidato.candidatoModel.nombreCandidato} ${candidato.candidatoModel.apellidoPCandidato} ${candidato.candidatoModel.apellidoMCandidato}`,
						logo: candidato.candidatoModel.fotoCandidato,
					});
				});

				boletas1.push({
					encabezado: boleta.estructuraBoleta.encabezadoBoleta,
					idEstructuraBoleta: boleta.estructuraBoleta.idEstructuraBoleta,
					jornadaElectoral: "XXXX",
					entidad: boleta.estructuraBoleta.entidadFederativa,
					distritoElectoral: 0,
					municipio: boleta.estructuraBoleta.municipio,
					maxOpciones: boleta.modalidad.maxOpciones,
					minOpciones: boleta.modalidad.minOpciones,
					modalidad: boleta.modalidad.modalidad,
					votoNulo: boleta.modalidad.mostrarVotoNulo,
					candidaturaNoRegistrada: boleta.modalidad.mostrarCandidaturasNoReg,
					candidatos: misCandidatos,
				});
			} else if (boleta.modalidad.modalidad === "PLANILLA") {
				let misAsociaciones = [];
				boleta.asoCand.forEach((asociacion, indexAso) => {
					let misCandidatos = [];
					asociacion.candidatos.forEach((candidato) => {
						misCandidatos.push({
							id: candidato.claveCandidato,
							nombre: `${candidato.nombreCandidato} ${candidato.apellidoPCandidato} ${candidato.apellidoMCandidato}`,
						});
					});

					misAsociaciones.push({
						id: asociacion.asociacionModel.idAsociacion,
						emblema: asociacion.asociacionModel.emblema,
						logo: asociacion.asociacionModel.logo,
						nombrePartido: asociacion.asociacionModel.nombreAsociacion,
						candidatos: misCandidatos,
					});
				});

				boletas1.push({
					encabezado: boleta.estructuraBoleta.encabezadoBoleta,
					idEstructuraBoleta: boleta.estructuraBoleta.idEstructuraBoleta,
					jornadaElectoral: "XXXX",
					entidad: boleta.estructuraBoleta.entidadFederativa,
					distritoElectoral: 0,
					municipio: boleta.estructuraBoleta.municipio,
					// maxOpciones: boleta.modalidad.maxOpciones,
					maxOpciones: 100,
					// minOpciones: boleta.modalidad.minOpciones,
					minOpciones: 1,
					modalidad: boleta.modalidad.modalidad,
					votoNulo: boleta.modalidad.mostrarVotoNulo,
					candidaturaNoRegistrada: boleta.modalidad.mostrarCandidaturasNoReg,
					candidatos: misAsociaciones,
				});
			}
		});

		console.log("BOLETAS CONVERTIDAS", boletas1);

		return { ok: true, data: boletas1 };
	} catch (error) {
		console.log(error.message);
		return { ok: false };
	}
};

export const getConsultasDeVotante = async (idJornada, curp) => {
	try {
		// await timeout(1000);

		const { data } = await consultasAPI.get(
			`jornada/consulta/${idJornada}/informacion/completa`
		);

		console.log("DATA QUE LLEGA", data);

		let consulta1 = {
			nombreJornada: data.jornadaModel.nombreJornada,
			entidad: data.jornadaModel.entidad,
			papeletas: [],
		};
		let papeletas = [];
		data.papeletas.forEach((papeleta) => {
			papeletas.push({
				id: papeleta.estructuraPapeletaModel.idPapeleta,
				asunto: papeleta.estructuraPapeletaModel.nombre,
				distritoElectoral: papeleta.estructuraPapeletaModel.distrito,
				municipio: papeleta.estructuraPapeletaModel.municipio,
				primerFirmanteNombre: papeleta.estructuraPapeletaModel.primerFirmanteNombre,
				primerFirmanteCargo: papeleta.estructuraPapeletaModel.primerFirmanteCargo,
				segundoFirmanteNombre: papeleta.estructuraPapeletaModel.segundoFirmanteNombre,
				segundoFirmanteCargo: papeleta.estructuraPapeletaModel.segundoFirmanteCargo,
				pregunta: {
					idPregunta: papeleta.preguntaModel.idPregunta,
					descPregunta: papeleta.preguntaModel.descPregunta,
					tipoRespuesta: papeleta.preguntaModel.tipoRespuesta,
					subtipo: papeleta.preguntaModel.subtipo,
					opcion1: papeleta.preguntaModel.opcion1,
					opcion2: papeleta.preguntaModel.opcion2,
					opcion3: papeleta.preguntaModel.opcion3,
					opcion4: papeleta.preguntaModel.opcion4,
					opcion5: papeleta.preguntaModel.opcion5,
				},
			});
		});

		consulta1.papeletas = papeletas;

		return { ok: true, data: consulta1 };
	} catch (error) {
		console.log(error.message);
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
