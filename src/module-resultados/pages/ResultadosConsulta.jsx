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
} from "@mui/material";
import { Graficas } from "../components/Graficas";
import "../../styles/generalContainer.css";
import { purpleTheme } from "../../theme/purpleTheme";
import { Intermedio } from "../components/Intermedio";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfigConsulta,
  getPapletas,
  getPapletasByID,
  getResult,
} from "../../store/resultados-consultas/consultasThunks";
import { NoDisponible } from "../components/NoDisponible";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";

export const ResultadosConsulta = ({
  chartData = [
    { votos: 50 },
    { votos: 10 },
    { votos: 100 },
    { votos: 140 },
    { votos: 80 },
  ],
}) => {
  const { jornada, id } = useParams();
  const dispatch = useDispatch();
  const {
    resultados,
    isLoadingResultados,
    papeleta,
    isLoadingConfigConsulta,
    configConsulta,
  } = useSelector((state) => state.consultas);
  const [etiquetas, setetiquetas] = useState([]);
  const [datosN, setDatosN] = useState([]);
  const [titulo, settitulo] = useState("");
  const [update, setUpdate] = useState(false);
  const [winer, setWiner] = useState("");
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const datos = [100, 500, 30, 300, 1000, 300, 350];
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/PAN_logo_%28Mexico%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b5/PRI_logo_%28Mexico%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/8/8f/PRD_logo_%28Mexico%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e7/Worker%27s_Party_logo_%28Mexico%29.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo-partido-verde-2020.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo-partido-verde-2020.png",
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Logo-partido-verde-2020.png",
  ];

  useEffect(() => {
    dispatch(getPapletasByID(id));
    dispatch(getConfigConsulta(jornada));
    setUpdate(true);
    console.log("jornada:", jornada);
    console.log("consulta:", id);
    dispatch(getResult(jornada, id));
  }, []);

  useEffect(() => {
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
  }, [resultados]);

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
      ) : resultados ? (
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
                //
                name: "CONSULTAS",
                url: "/resultados/consultas/",
              },
              {
                name: !isLoadingConfigConsulta
                  ? configConsulta?.jornadaModel?.nombreJornada
                  : "...",
                url: `/resultados/boletas-consultas/${configConsulta?.jornadaModel?.idJornada}/`,
              },
            ]}
            currentRoute={
              !isLoadingResultados ? resultados.papeleta?.nombre : "..."
            }
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
            {resultados.papeleta?.nombre}
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
                variant="h6"
                color="initial"
                align="center"
                sx={{
                  fontSize: { lg: "25px", md: "18px", xs: "12px" },
                  wordBreak: "break-word",
                }}
              >
                {titulo}
              </Typography>
              <Typography
                variant="body2"
                mt={2}
                mb={2}
                color="initial"
                align="center"
              >
                Respuesta(s) ganadoras
              </Typography>

              {resultados.ganadores?.map((gan, index) => {
                if (gan.question !== "nulos") {
                  return (
                    <Typography
                      sx={{ fontSize: { md: "15px", xs: "9px" } }}
                      color="initial"
                      fontWeight="bold"
                    >
                      {index + 1}.- {gan.question}
                    </Typography>
                  );
                } else {
                  return <Typography>""</Typography>;
                }
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

            <Box
              display={"flex"}
              justifyContent="center"
              flexDirection={"column"}
              alignItems={"center"}
              bgcolor="#f2f2f2"
              borderRadius={"7px"}
              border="1px solid"
              borderColor={"#BEBDBD"}
              boxShadow={5}
              width={{ lg: "60%", md: "70%", xs: "100%" }}
              height="auto"
              p={1}
            >
              <Typography
                variant="h6"
                color="#543884"
                sx={{
                  fontWeight: "bold",
                  pb: 3,
                  fontSize: { lg: "25px", md: "18px", xs: "15px" },
                }}
              >
                RESUMEN
              </Typography>
              <Box
                display={"flex"}
                justifyContent="center"
                flexDirection={{ sm: "row", xs: "column" }}
                alignItems={"center"}
              >
                <Box
                  display={"flex"}
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      pb: 3,
                      fontSize: { lg: "22px", md: "18px", xs: "10px" },
                    }}
                  >
                    VOTOS ACUMULADOS
                  </Typography>
                  <Typography sx={{ pb: 3, fontSize: "1rem" }}>
                    {resultados?.acumulados}
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>+</Box>
                <Box
                  display={"flex"}
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      pb: 3,
                      fontSize: { lg: "22px", md: "18px", xs: "10px" },
                    }}
                  >
                    VOTOS NULOS
                  </Typography>
                  <Typography sx={{ pb: 3, fontSize: "1rem" }}>
                    {resultados?.nulos}
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>=</Box>
                <Box
                  display={"flex"}
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      pb: 3,
                      fontSize: { lg: "22px", md: "18px", xs: "10px" },
                    }}
                  >
                    TOTAL
                  </Typography>
                  <Typography sx={{ pb: 3, fontSize: "1rem" }}>
                    {resultados?.acumulados + resultados?.nulos}
                  </Typography>
                </Box>
              </Box>
            </Box>
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
              pr: 3,
              pl: 1,
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
              sx={{}}
            >
              RESULTADOS POR RESPUESTAS
            </Typography>
            <Box
              display={"flex"}
              width={"100%"}
              justifyContent="center"
              flexDirection={"column"}
              alignItems={"center"}
              sx={{
                height: "auto",
                overflowX: "scroll",
              }}
            >
              {isLoadingResultados ? (
                <Typography>Esperando</Typography>
              ) : (
                update && (
                  <Intermedio
                    titulo={titulo}
                    datos={datosN}
                    labels={etiquetas}
                    img={[]}
                  ></Intermedio>
                )
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <NoDisponible titulo={papeleta?.nombre?.toUpperCase()} />
      )}
    </>
  );
};
