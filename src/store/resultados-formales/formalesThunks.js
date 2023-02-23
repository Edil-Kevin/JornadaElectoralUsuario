import {
  getBoletabyIDProvider,
  getBoletasFormalesProvider,
  getConfigJornadaFormalesProvider,
  getJornadasFormalesProvider,
  getResultadosFormalesProvider,
} from "../../providers/Micro-JornadaFormal/providerFormal";
import {
  setBoleta,
  setBoletaInfo,
  setBoletas,
  setJornadas,
  setResultados,
  setConfigJornadaFormal,
  startLoadingBoleta,
  startLoadingBoletaInfo,
  startLoadingBoletas,
  startLoadingJornadas,
  startLoadingResultados,
  startLoadingConfigJornadaFormal,
} from "./formalesSlice";

export const getJornadasFormales = () => {
  return async (dispatch, getState) => {
    dispatch(startLoadingJornadas());
    const { ok, data, errorMessage } = await getJornadasFormalesProvider();
    if (ok) {
      dispatch(setJornadas({ jornadas: data }));
    } else {
    }
  };
};

export const getBoletasFormales = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingBoletas());
    const { ok, data, errorMessage } = await getBoletasFormalesProvider(id);
    if (ok) {
      dispatch(setBoletas({ boletas: data }));
    } else {
    }
  };
};

export const getBoletaBYIDFormales = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoadingBoletaInfo());
    const { ok, data, errorMessage } = await getBoletabyIDProvider(id);
    if (ok) {
      dispatch(setBoletaInfo({ boletaInfo: data }));
    } else {
      dispatch(setBoletaInfo({ boletaInfo: false }));
    }
  };
};

export const getResultFormales = (idJornada, idConsulta) => {
  return async (dispatch, getState) => {
    dispatch(setBoleta({ boleta: false }));
    dispatch(setResultados({ resultados: false }));
    dispatch(startLoadingResultados());
    const { ok, data, errorMessage } = await getResultadosFormalesProvider(
      idJornada
    );

    if (ok) {
      let convData = false;
      const newData = data.boletas.find((boleta) => {
        if (boleta.idBoleta.toString() === idConsulta) {
          return boleta;
        }
      });

      if (newData) {
        convData = toRepFormal(newData);
      }

      dispatch(setResultados({ resultados: data }));
      dispatch(setBoleta({ boleta: convData }));
    } else {
    }
  };
};

//_________________________jornada electoral_______________________

const toRepFormal = (data) => {
  let nulo = {
    name: "Voto nulo",
    datosCandidato: null,
    candidad: 0,
  };
  let acumuladas = 0;

  let cnr = data.candidaturasNoReg;

  let candidatos = data.boletaCandidatos.map((candi) => {
    if (candi.datosCandidato === null) {
      console.log(candi);
      if (candi.name === "Voto nulo") {
        nulo = candi;
      } else {
        cnr = candi;
      }
      return null;
    }

    acumuladas += candi.candidad;

    return {
      nombre: candi.name,
      foto: candi.datosCandidato.candidatoModel.fotoCandidato,
      partidos: candi.datosCandidato.partidos,
      candidad: candi.candidad,
    };
  });

  candidatos = candidatos.filter((c) => {
    if (c) return c;
  });

  let totalcnr = 0;
  cnr.map((c) => {
    totalcnr += c.candidad;
  });

  console.log("Antes: ", candidatos);
  candidatos.sort((a, b) => {
    console.log(a.candidad);
    return b.candidad - a.candidad;
  });

  console.log("ordenado: ", candidatos);

  return {
    candidatos,
    nulo: nulo.candidad,
    cnr: totalcnr,
    acumuladas,
    winner: candidatos[0],
  };
};

export const getConfigJornadaFormal = (idJornada) => {
  return async (dispatch, getState) => {
    dispatch(setConfigJornadaFormal({ configJornadaFormal: false }));
    dispatch(startLoadingConfigJornadaFormal());
    const { ok, data, errorMessage } = await getConfigJornadaFormalesProvider(
      idJornada
    );
    if (ok) {
      dispatch(setConfigJornadaFormal({ configJornadaFormal: data }));
    } else {
      dispatch(setConfigJornadaFormal({ configJornadaFormal: false }));
    }
  };
};
