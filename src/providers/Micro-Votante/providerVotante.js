import { votanteAPI } from "./votanteConfig";

export const guardarLinkVotante = async ({
	curp,
	linkCredSelfieCrop,
	linkCredFrontalCrop,
	linkCredTraseraCrop,
}) => {
	// console.log("CURP", curp);
	try {
		const response1 = await votanteAPI.put(`credencial/votante/fotoFrente/${curp}`, {
			fotoFrente: linkCredFrontalCrop,
		});
		const response2 = await votanteAPI.put(`credencial/votante/fotoReverso/${curp}`, {
			fotoReverso: linkCredTraseraCrop,
		});
		const response3 = await votanteAPI.put(`votante/selfie/${curp}`, {
			foto: linkCredSelfieCrop,
		});

		return {
			ok2: true,
		};
	} catch (error) {
		return { ok2: false };
	}
};

export const verificarVotante = async ({ curp }) => {
	// console.log("CURP", curp);
	try {
		const data = await votanteAPI.put(`votante/validacion/${curp}`, {
			validacion: true,
		});

		console.log("VERI VOTANTE", data);

		return {
			ok3: true,
		};
	} catch (error) {
		return { ok3: false };
	}
};
export const getStatusValidacion = async (curp) => {
	// console.log("CURP", curp);
	try {
		const { data } = await votanteAPI.get(`status/${curp}`);

		// console.log("ESTÁ VALIDADO?", data);

		return {
			ok: true,
			data: data.data,
		};
	} catch (error) {
		return { ok: false };
	}
};

export const getProcesosDelVotante = async (curp) => {
	try {
		// const { data } = await votanteAPI.get(`status/${curp}`);

		// await timeout(5000);

		const { data } = await votanteAPI.get(`${curp}/jornadas_actuales`);

		// console.log("RESPONSE PROCESOS", data);

		// const endpoint = {
		// 	jornadaFormal:
		// 		// null,
		// 		{
		// 			//SI EL VOTANTE YA HIZO SU VOTO, ESTE CAMPO DEBE SER NULL
		// 			votanteTieneJornadaRelacionada: true,
		// 			votantePuedeRealizarLaVotacion: true,
		// 			idJornada: "JO-H1-82",
		// 			nombreJornada: "Jornada Formal 1",
		// 			configuracionDeJornada: {
		// 				fechaYHoraDeInicioDeJornada: "1997-07-16T19:20:30.45+01:00",
		// 				fechaYHoraDeFinDeJornada: "1997-09-16T19:20:30.45+01:00",
		// 				tiempoParaContestarBoletas: "30:00",
		// 				tiempoExtra: "10:00",
		// 			},
		// 		},
		// 	jornadaNoFormal: {
		// 		votanteTieneJornadaRelacionada: true,
		// 		votantePuedeRealizarLaVotacion: true,
		// 		nombreJornada: "Jornada Formal 1",
		// 		configuracionDeJornada: {
		// 			fechaYHoraDeInicioDeJornada: "1997-07-16T19:20:30.45+01:00",
		// 			fechaYHoraDeFinDeJornada: "1997-09-16T19:20:30.45+01:00",
		// 			tiempoParaContestarBoletas: "30:00",
		// 			tiempoExtra: "10:00",
		// 		},
		// 	},
		// 	consultaCiudadana: null,
		// };

		return {
			ok: true,
			data: data,
		};
	} catch (error) {
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
