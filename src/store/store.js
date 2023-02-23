import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { passwordSlice } from "./password/passwordSlice";
import { consultasSlice } from "./resultados-consultas/consultasSlice";
import { formalesSlice } from "./resultados-formales/formalesSlice";
import { noformalesSlice } from "./resultados-noformales/noformalesSlice";
import { verificacionSlice } from "./verificacion-voto/verificacionSlice";
import { votanteSlice } from "./votante/votanteSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    votante: votanteSlice.reducer,
    password: passwordSlice.reducer,
    verificacion: verificacionSlice.reducer,
    consultas: consultasSlice.reducer,
    formales: formalesSlice.reducer,
    noformales: noformalesSlice.reducer,
  },
});
