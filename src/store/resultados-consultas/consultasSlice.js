import { createSlice } from "@reduxjs/toolkit";

export const consultasSlice = createSlice({
  name: "consultas",
  initialState: {
    jornadas: [],
    papeleta: false,
    isLoadingJornadas: false,
    isLoadingPapeletas: false,
    isLoadingPapeleta: false,
    isLoadingResultados: false,
    isLoadingConfigConsulta: false,
    resultados: false,
    configConsulta: false,
    papeletas: [],
    status: "",
    errorMessage: "",
    statusPeticion: "off",
  },
  reducers: {
    startLoadingJornadas: (state /* action */) => {
      state.isLoadingJornadas = true;
    },
    setJornadas: (state, action) => {
      state.jornadas = action.payload.jornadas;
      state.isLoadingJornadas = false;
    },

    startLoadingPapeleta: (state /* action */) => {
      state.isLoadingPapeleta = true;
    },
    setPapeleta: (state, action) => {
      state.papeleta = action.payload.papeleta;
      state.isLoadingPapeleta = false;
    },

    startLoadingResultados: (state /* action */) => {
      state.isLoadingResultados = true;
    },
    setResultados: (state, action) => {
      state.isLoadingResultados = false;
      state.resultados = action.payload.resultados;
    },
    startLoadingPapeletas: (state /* action */) => {
      state.isLoadingPapeletas = true;
    },
    setPapeletas: (state, action) => {
      state.isLoadingPapeletas = false;
      state.papeletas = action.payload.papeletas;
    },

    startLoadingConfigConsulta: (state /* action */) => {
      state.isLoadingConfigConsulta = true;
    },
    setConfigConsulta: (state, action) => {
      state.isLoadingConfigConsulta = false;
      state.configConsulta = action.payload.configConsulta;
    },

    onOkPeticion: (state) => {
      state.statusPeticion = "ok";
    },
    onFailPeticion: (state) => {
      state.statusPeticion = "fail";
    },
    onOffPeticion: (state) => {
      state.statusPeticion = "off";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startLoadingPapeletas,
  setPapeletas,
  startLoadingJornadas,
  setJornadas,
  startLoadingResultados,
  setResultados,
  startLoadingPapeleta,
  setPapeleta,
  startLoadingConfigConsulta,
  setConfigConsulta,
} = consultasSlice.actions;

// export default consultaCiudadanaSlice.reducer;
