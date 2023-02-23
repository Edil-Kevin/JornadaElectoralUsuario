import axios from "axios";

export const votosSegurosAPI = axios.create({
	baseURL: "https://ms-jornada-voto-seguro.herokuapp.com/votos_seguros/",
    // https://ms-jornada-voto-seguro.herokuapp.com/votos_seguros/verificacion/ELECTORAL-ESIAK-KQHPV
    // https://ms-jornada-voto-seguro.herokuapp.com/votos_seguros/verificacion/ELECTORAL-NLGQX-AGAKJ
});