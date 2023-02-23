import { jornadaNoFormalApi } from "./configNoFormal";
import { jornadaNoFormalVotosApi } from "./configNoFormalVotos";

export const getJornadasNFProvider = async () => {
  return jornadaNoFormalApi
    .get(`jornada/no_formal/elecciones`)
    .then((response) => {
      return { ok: true, data: response.data, errorMessage: "" };
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getBoletasNFProvider = async (idJornada) => {
  try {
    // **FETCH
    const { data } = await jornadaNoFormalApi.get(
      "jornada/no_formal/" + idJornada + "/boletas"
    );
    console.log(data);
    return { ok: true, data: data.listBoletas };
  } catch (error) {
    return { ok: false };
  }
};

export const getBoletaNFProvider = async (idBoleta) => {
  // const { data } = await getBoletaAPI(idBoleta);
  return jornadaNoFormalApi
    .get(`jornada/no_formal/estructura_boleta/${idBoleta}`)
    .then((response) => {
      console.log(response.data);
      const { httpCode, mensaje, data } = response;
      if (httpCode === "NOT_FOUND") {
        return { ok: true, data: "", errorMessage: "NOT_FOUND" };
      } else {
        return { ok: true, data: data, errorMessage: "" };
      }
    })
    .catch((error) => {
      console.log(error);
      return { ok: false, data: "", errorMessage: error.message };
    });
};

export const getResultadosNFProvider = async (idJornada) => {
  try {
    // **FETCH
    const response = await jornadaNoFormalVotosApi.get(
      "votos/no/formal/jornada/" + idJornada + "/resultados"
    );
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false };
  }
};

export const getConfigJornadaNFProvider = async (idJornada) => {
  try {
    // **FETCH
    const response = await jornadaNoFormalApi.get(
      "jornada/no_formal/" + idJornada + "/informacion"
    );
    console.log(response);
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false };
  }
};
