import axios from "axios";

export const votoConsultaAPI = axios.create({
	baseURL: "https://ms-jornada-voto-consulta.herokuapp.com/votos/consulta/",
    // https://ms-jornada-voto-consulta.herokuapp.com/votos/consulta/verificacion/CONSULTA-ORD-ENCPB-DJOOW
    // https://ms-jornada-voto-seguro.herokuapp.com/votos_seguros/verificacion/ELECTORAL-NLGQX-AGAKJ
});