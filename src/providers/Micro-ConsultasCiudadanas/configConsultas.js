import axios from "axios";

export const consultasAPI = axios.create({
	baseURL: "https://ms-jornada-consulta-nl.herokuapp.com/",
});

// https://ms-jornada-consulta-nl.herokuapp.com/jornada/consulta/informacion/completa
