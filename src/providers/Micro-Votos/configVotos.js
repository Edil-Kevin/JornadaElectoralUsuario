import axios from "axios";

export const votosAPI = axios.create({
	baseURL: "https://ms-jornada-voto-seguro.herokuapp.com/",
});

export const votosNoFormalAPI = axios.create({
	baseURL: "https://ms-jornada-votos-no-formales.herokuapp.com/",
});

// https://ms-jornada-votos-no-formales.herokuapp.com/votos/no/formal/registrar/boleta

export const votosConsultaAPI = axios.create({
	baseURL: "https://ms-jornada-voto-consulta.herokuapp.com/",
});
