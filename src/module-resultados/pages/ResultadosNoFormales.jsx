import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResultNoFormal } from "../../store/resultados-noformales/noformalesThunks";
import { NoDisponible } from "../components/NoDisponible";
import { ResultadosComiteNF } from "./ResultadosComiteNF";
import { ResultadosPlanillaNF } from "./ResultadosPlanillaNF";
import { ResultadosRepNF } from "./ResultadosRepNF";

export const ResultadosNoFormales = ({ tipo = "REPRESENTANTE" }) => {
  const { jornada, id } = useParams();
  const dispatch = useDispatch();
  const { resultados, isLoadingResultados, boleta } = useSelector(
    (state) => state.noformales
  );
  useEffect(() => {
    dispatch(getResultNoFormal(jornada, id));
  }, []);
  return (
    <>
      {isLoadingResultados ? (
        <Stack
          justifyContent="center"
          sx={{ color: "grey.500" }}
          spacing={2}
          mt={10}
          direction="column"
          alignItems={"center"}
          width={"100%"}
        >
          <Typography textAlign={"centerr"}>
            Cargando esperando resultados
          </Typography>
          <CircularProgress color="primary" />
        </Stack>
      ) : boleta ? (
        boleta.modalidad === "REPRESENTANTE" ? (
          <ResultadosRepNF />
        ) : boleta.modalidad === "COMITE" ? (
          <ResultadosComiteNF />
        ) : (
          <ResultadosPlanillaNF />
        )
      ) : (
        <NoDisponible />
      )}
    </>
  );
};
