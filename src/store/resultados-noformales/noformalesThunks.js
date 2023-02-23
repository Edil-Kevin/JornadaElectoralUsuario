import { toNoFormal } from "../../module-resultados/helpers/AdapaterData";
import {
  getBoletaNFProvider,
  getBoletasNFProvider,
  getConfigJornadaNFProvider,
  getJornadasNFProvider,
  getResultadosNFProvider,
} from "../../providers/Micro-JornadaNoFormal/providerNoFormal";
import {
  setBoleta,
  setBoletas,
  setConfigJornada,
  setJornadas,
  setResultados,
  startConfigJornada,
  startLoadingBoleta,
  startLoadingBoletas,
  startLoadingJornadas,
  startLoadingResultados,
} from "./noformalesSlice";

export const getJornadasNF = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingJornadas());
    const { ok, data, errorMessage } = await getJornadasNFProvider();
    if (ok) {
      dispatch(setJornadas({ jornadas: data }));
    } else {
    }
  };
};

export const getBoletasNF = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingBoletas());
    const { ok, data, errorMessage } = await getBoletasNFProvider(id);
    if (ok) {
      dispatch(setBoletas({ boletas: data }));
    } else {
    }
  };
};

export const getBoletaBYIDNF = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingBoleta());
    const { ok, data, errorMessage } = await getBoletaNFProvider(id);
    if (ok) {
      dispatch(setBoleta({ boleta: data }));
    } else {
      dispatch(setBoleta({ boleta: false }));
    }
  };
};

export const getResultNoFormal = (idJornada, idConsulta) => {
  return async (dispatch, getState) => {
    dispatch(setResultados({ resultados: false }));
    dispatch(startLoadingResultados());
    const { ok, data, errorMessage } = await getResultadosNFProvider(idJornada);

    if (ok) {
      let convData = false;
      const newData = data.boletas.find((boleta) => {
        if (boleta.idBoleta.toString() === idConsulta) {
          return boleta;
        }
      });

      if (newData) {
        convData = toNoFormal(newData);
      } else {
        dispatch(setBoleta({ boleta: false }));
      }

      console.log(convData);

      dispatch(setResultados({ resultados: data }));
      dispatch(setBoleta({ boleta: convData }));
    } else {
    }
  };
};

export const getConfigJornada = (idJornada) => {
  return async (dispatch, getState) => {
    dispatch(setConfigJornada({ configJornada: false }));
    dispatch(startConfigJornada());
    const { ok, data, errorMessage } = await getConfigJornadaNFProvider(
      idJornada
    );
    if (ok) {
      dispatch(setConfigJornada({ configJornada: data }));
    } else {
      dispatch(setConfigJornada({ configJornada: false }));
    }
  };
};
