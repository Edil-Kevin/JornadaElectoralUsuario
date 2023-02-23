import React, { useEffect, useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as chartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Graficas } from "../components/Graficas";
import "../../styles/generalContainer.css";
import { purpleTheme } from "../../theme/purpleTheme";
import { Intermedio } from "../components/Intermedio";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { getResult } from "../../store/resultados-consultas/consultasThunks";
import { CardCandidatos } from "../components/formales/CardCandidatos";
import { NoDisponible } from "../components/NoDisponible";
import { getBoletaBYIDFormales } from "../../store/resultados-formales/formalesThunks";
import { GridCandFormales } from "../components/formales/GridCandFormales";
import { Resumen } from "../components/Resumen";
import { GridCandNoFormales } from "../components/noFormales/GridCandNoFormales";
import { GraficasRepComite } from "../components/GraficasRepComite";
import { ChartEjemplo } from "../components/formales/chartEjemplo";
import { ChartPlanilla } from "../components/noFormales/chartPlanillla";
import { GridPlanilla } from "../components/noFormales/GridPlanilla";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";
export const ResultadosPlanillaNF = ({}) => {
  const { jornada, id } = useParams();
  const dispatch = useDispatch();
  const {
    resultados,
    isLoadingResultados,
    isLoadingConfigJornada,
    configJornada,
    boleta,
  } = useSelector((state) => state.noformales);
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));
  const smsize = useMediaQuery(theme.breakpoints.down("sm"));
  const mdsize = useMediaQuery(theme.breakpoints.only("md"));
  const lgsize = useMediaQuery(theme.breakpoints.only("lg"));
  const xlsize = useMediaQuery(theme.breakpoints.only("xl"));

  useEffect(() => {
    // setUpdate(true);
    // console.log("jornada:", jornada);
    // console.log("consulta:", id);
    // dispatch(getResult(jornada, id));
    dispatch(getBoletaBYIDFormales(id));
  }, []);

  useEffect(() => {
    // console.log("boleta:", boleta);
  }, [boleta]);

  /* useEffect(() => {
    console.log("Resultados:", resultados);
    if (resultados) {
      console.log(resultados.resultados.lista);
      setetiquetas(resultados.pregunta.lista);
      setDatosN(resultados.resultados.lista);
      settitulo(resultados.pregunta.descripcion);
      setUpdate(true);
      setWiner();
    } else {
      setUpdate(false);
    }
    console.log("cambio");
  }, [resultados]); */

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
      ) : true ? (
        <Box
          display={"flex"}
          width={"100%"}
          sx={{ mt: 3, p: 2 }}
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
          className="animate__animated animate__fadeInUp"
        >
          <BreadCrumbsCustom
            routes={[
              {
                name: "INICIO",
                url: "/resultados/inicio/",
              },
              {
                name: "JORNADAS NO FORMALES",
                url: "/resultados/noformales/",
              },

              {
                name: !isLoadingConfigJornada
                  ? configJornada?.eleccionModel?.nombreEleccion
                  : "...",
                url: `/resultados/boletas-noformales/${configJornada?.eleccionModel?.idEleccion}/`,
              },
            ]}
            currentRoute={!isLoadingResultados ? boleta?.boleta : "..."}
          ></BreadCrumbsCustom>
          <Typography
            sx={{
              mb: 3,
              fontWeight: "bold",
              p: 2,
              boxShadow: 3,
              color: "#fff",
              background: "#543884",
              borderRadius: "30px",
              fontSize: { lg: "25px", md: "20px", xs: "15px" },
            }}
            textAlign={"center"}
          >
            {boleta?.boleta}
          </Typography>
          <Box
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
            width={{ lg: "90%", md: "97%", xs: "100%" }}
            sx={{
              p: 4,
              background: "#fff",
              mt: 2,
              boxShadow: 5,
              borderRadius: "20px",
            }}
          >
            <Box display={"flex"} flexDirection="column" alignItems="center">
              <Typography
                variant="body2"
                mt={1}
                mb={1}
                color="initial"
                align="center"
              >
                PLANILLA GANADORA:
              </Typography>
              {boleta.winers?.candidatos?.map((win, index) => {
                return (
                  <Typography
                    color="initial"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {win?.nombreCandidato}
                    {win?.apellidoPCandidato}
                    {win?.apellidoMCandidato}
                  </Typography>
                );
              })}

              <Box
                borderRight="1px solid"
                pr={4}
                display="flex"
                flexDirection="column"
              ></Box>
            </Box>
            <Box></Box>

            <Divider sx={{ mb: 2, paddingTop: "1.5rem" }} />

            <Resumen
              acumulados={boleta.total - boleta.cnr - boleta.nulo}
              candReg={boleta.cnr}
              nulos={boleta.nulo}
              total={boleta.total}
            />
          </Box>

          <Divider sx={{ paddingTop: "1.5rem" }} />
          <Box
            display={"flex"}
            width={{ lg: "90%", md: "97%", xs: "100%" }}
            justifyContent="center"
            flexDirection={"column"}
            alignItems={"center"}
            sx={{
              height: "auto",
              pr: 2,
              pl: 2,
              pt: 5,
              pb: 5,
              mt: 2,
              background: "#fff",
              boxShadow: 5,
              borderRadius: "20px",
              overflowX: "scroll",
            }}
          >
            <Typography
              variant={"h7"}
              color="initial"
              fontWeight="bold"
              textAlign={"center"}
              sx={{ mb: 5 }}
            >
              RESULTADOS:
            </Typography>
            <Box
              display={"flex"}
              width={"100%"}
              justifyContent="center"
              flexDirection={"column"}
              alignItems={"center"}
              sx={{
                height: "auto",
              }}
            >
              {isLoadingResultados ? (
                <Typography>Esperando</Typography>
              ) : smsize ? (
                <GridPlanilla
                  total={boleta.total}
                  candidatos={boleta.planillas}
                />
              ) : (
                // <GraficasRepComite
                //   total={boleta.total}
                //   resultados={boleta.candidatos}
                // />
                <ChartPlanilla
                  totalV={boleta.total}
                  candidatos={boleta.planillas}
                ></ChartPlanilla>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <NoDisponible titulo={boleta?.nombreEstructuraBoleta} />
      )}
    </>
  );
};
