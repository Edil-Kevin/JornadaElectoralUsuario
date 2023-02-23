import { jornadaFormalApi } from "./configjornadaFormal";
import { jornadaFormalVotoApi } from "./configVotoSeguro";

export const getJornadasFormalesProvider = async () => {
  return jornadaFormalApi
    .get(`jornada/electoral/`)
    .then((response) => {
      return { ok: true, data: response.data.data, errorMessage: "" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getBoletasFormalesProvider = async (idJornada) => {
  try {
    // **FETCH
    const { data } = await jornadaFormalApi.get(
      "jornada/electoral/jornada/" + idJornada + "/estructurasboletas"
    );
    return { ok: true, data: data.data };
  } catch (error) {
    return { ok: false };
  }
};

export const getEleccionFormalByID = async (id) => {
  return jornadaFormalApi
    .get(`jornada/electoral/${id}`)
    .then((response) => {
      console.log(response);
      return { ok: true, data: response.data.data, errorMessage: "" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getBoletabyIDProvider = async (idBoleta) => {
  //ENDPOINT REAL
  return jornadaFormalApi
    .get(`jornada/electoral/estructuraboleta/${idBoleta}`)
    .then((response) => {
      const { httpCode } = response.data;
      if (httpCode === "NOT_FOUND") {
        return { ok: true, data: "", errorMessage: "NOT_FOUND" };
      } else {
        return { ok: true, data: response.data.data, errorMessage: "" };
      }
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getResultadosFormalesProvider = async (idJornada) => {
  try {
    const response = await jornadaFormalVotoApi.get(
      "votos_seguros/jornadaelectoral/" + idJornada + "/resultados"
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false };
  }
};

/* export const getResultadoProvider = async (idJornada) => {
  try {
    // **FETCH
    const response = await jornadaFormalApi.get(
      "votos/consulta/jornada/" + idJornada + "/resultados"
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false };
  }
}; */

export const getConfigJornadaFormalesProvider = async (idJornada) => {
  try {
    const response = await jornadaFormalApi.get(
      "/jornada/electoral/configuraciones_disp/" + idJornada
    );
    return { ok: true, data: response.data.data };
  } catch (error) {
    return { ok: false };
  }
};
