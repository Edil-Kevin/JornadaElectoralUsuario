import axios from "axios";

export const jornadaFormalApi = axios.create({
	baseURL: "https://ms-jornada-elec-nl.herokuapp.com/",
});

// https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/642264.0-JO-EL-GO-20-OAX-2023/informacion/completa/
