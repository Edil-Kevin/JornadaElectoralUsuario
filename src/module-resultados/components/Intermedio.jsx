import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Graficas } from "./Graficas";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Intermedio({
  titulo = "",
  datos = [],
  labels = [],
  img = [],
  resultados,
}) {
  const navigate = useNavigate();
  let location = useLocation();
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));
  const smsize = useMediaQuery(theme.breakpoints.only("sm"));
  const mdsize = useMediaQuery(theme.breakpoints.only("md"));
  const lgsize = useMediaQuery(theme.breakpoints.only("lg"));
  const xlsize = useMediaQuery(theme.breakpoints.only("xl"));
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    // window.location.reload();
    console.log(location);
    navigate(location);
  }, [xssize]);

  return (
    <Box sx={{ p: 3 }} width={xssize ? "350px" : "100%"}>
      {xssize && (
        <Graficas
          titulo={titulo}
          resultados={datos}
          result={resultados}
          etiquetas={labels}
          img={img}
        />
      )}
      {smsize && (
        <Graficas
          titulo={titulo}
          resultados={datos}
          etiquetas={labels}
          result={resultados}
          img={img}
        />
      )}
      {mdsize && (
        <Graficas
          titulo={titulo}
          resultados={datos}
          etiquetas={labels}
          result={resultados}
          img={img}
        />
      )}
      {lgsize && (
        <Graficas
          titulo={titulo}
          resultados={datos}
          etiquetas={labels}
          result={resultados}
          img={img}
        />
      )}
      {xlsize && (
        <Graficas
          titulo={titulo}
          resultados={datos}
          etiquetas={labels}
          result={resultados}
          img={img}
        />
      )}
    </Box>
  );
}
