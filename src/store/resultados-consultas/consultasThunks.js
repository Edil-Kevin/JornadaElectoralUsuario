import { convResult } from "../../module-resultados/helpers/AdapaterData";
import {
  getConfigConsultaProvider,
  getConsultasCiudadanasProvider,
  getPapeletaByIDProvider,
  getPapeletasProvider,
  getResultadosProvider,
} from "../../providers/Micro-ConsultasCiudadanas/providerConsultas";
import {
  setJornadas,
  setPapeleta,
  setPapeletas,
  setResultados,
  setConfigConsulta,
  startLoadingJornadas,
  startLoadingPapeleta,
  startLoadingPapeletas,
  startLoadingResultados,
  startLoadingConfigConsulta,
} from "./consultasSlice";

export const getJornadasConsultas = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingJornadas());
    const { ok, data, errorMessage } = await getConsultasCiudadanasProvider();
    if (ok) {
      dispatch(setJornadas({ jornadas: data }));
    } else {
      dispatch(setJornadas({ jornadas: [] }));
    }
  };
};

export const getPapletas = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPapeletas());
    const { ok, data, errorMessage } = await getPapeletasProvider(id);
    if (ok) {
      dispatch(setPapeletas({ papeletas: data }));
    } else {
      dispatch(setPapeletas({ papeletas: [] }));
    }
  };
};

export const getPapletasByID = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingPapeleta());
    const { ok, data, errorMessage } = await getPapeletaByIDProvider(id);
    if (ok) {
      dispatch(setPapeleta({ papeleta: data }));
    } else {
      dispatch(setPapeleta({ papeleta: false }));
    }
  };
};

export const getResult = (idJornada, idConsulta) => {
  return async (dispatch, getState) => {
    dispatch(setResultados({ resultados: false }));
    dispatch(startLoadingResultados());
    const { ok, data, errorMessage } = await getResultadosProvider(idJornada);

    if (ok) {
      let convData = false;
      const newData = data.papeletas.find((papeleta) => {
        if (papeleta.estructuraPapeleta.idPapeleta.toString() === idConsulta) {
          return papeleta;
        }
      });

      if (newData) {
        convData = convResult(newData);
      }

      dispatch(setResultados({ resultados: convData }));
    } else {
      dispatch(setResultados({ resultados: false }));
    }
  };
};

export const getConfigConsulta = (id) => {
  return async (dispatch, getState) => {
    dispatch(setConfigConsulta({ configConsulta: false }));

    dispatch(startLoadingConfigConsulta());
    const { ok, data, errorMessage } = await getConfigConsultaProvider(id);
    if (ok) {
      dispatch(setConfigConsulta({ configConsulta: data }));
    } else {
      dispatch(setConfigConsulta({ configConsulta: false }));
    }
  };
};
