import { votosConsultaAPI } from "../Micro-Votos/configVotos";
import { consultasAPI } from "./configConsultas";

export const getConsultasCiudadanasProvider = async () => {
  try {
    const { data } = await consultasAPI.get("jornada/consulta/");
    return { ok: true, data: data.data, errorMessage: "" };
  } catch (error) {
    console.log(error);
    return { ok: false, errorMessage: error.message };
  }
};

export const getPapeletasProvider = async (idConsulta) => {
  try {
    // **FETCH
    const { data } = await consultasAPI.get(
      "jornada/consulta/jornada/" + idConsulta + "/papeletas"
    );
    return { ok: true, data: data.data };
  } catch (error) {
    return { ok: false };
  }
};

export const getResultadosProvider = async (idJornada) => {
  try {
    // **FETCH
    const response = await votosConsultaAPI.get(
      "votos/consulta/jornada/" + idJornada + "/resultados"
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false };
  }
};

export const getPapeletaByIDProvider = async (idBallot) => {
  try {
    // **FETCH

    const { data } = await consultasAPI.get(
      "jornada/consulta/estructurapapeleta/" + idBallot
    );

    return { ok: true, data: data.data };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};

export const getConfigConsultaProvider = async (idBallot) => {
  try {
    // **FETCH

    const { data } = await consultasAPI.get(
      "jornada/consulta/" + idBallot + "/informacion"
    );
    console.log("jornadaConsulta", data);
    return { ok: true, data: data };
  } catch (error) {
    return { ok: false, errorMessage: error.message };
  }
};
