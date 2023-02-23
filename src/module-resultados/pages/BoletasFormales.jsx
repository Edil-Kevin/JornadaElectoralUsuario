import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SearchCustome } from "../components/SearchCustome";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { GridBoletas } from "../components/GridBoletas";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoletasFormales,
  getConfigJornadaFormal,
} from "../../store/resultados-formales/formalesThunks";
import { useParams } from "react-router-dom";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";

export const BoletasFormales = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [jornada, setjornada] = useState(null);
  const {
    jornadas,
    boletas,
    isLoadingBoletas,
    isLoadingConfigJornadaFormal,
    configJornadaFormal,
  } = useSelector((state) => state.formales);
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [disponible, setDisponible] = useState(true);
  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(boletas, event.target.value);
  };

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (
        jornada.nombreEstructuraBoleta
          .toUpperCase()
          .includes(buscador.toUpperCase())
      )
        return jornada;
    });

    setDataSearch(newData);
  };

  useEffect(() => {
    setDataSearch(boletas);
  }, [boletas]);

  const getJornada = (id) => {
    return jornadas.find((jornada) => {
      if (jornada.idJornada.toString() === id.toString()) return jornada;
    });
  };

  useEffect(() => {
    dispatch(getBoletasFormales(id));
    dispatch(getConfigJornadaFormal(id));
    const jornadaa = getJornada(id);
    setjornada(jornadaa);
  }, []);

  useEffect(() => {
    const now = new Date();
    const fin = new Date(configJornadaFormal?.configuracionModel?.finRecepVoto);
    console.log("FIN: ", fin);
    if (now > fin) {
      setDisponible(true);
    } else {
      setDisponible(false);
    }
  }, [configJornadaFormal]);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent="center"
      sx={{ mt: 5, width: "100%", height: "auto" }}
    >
      <BreadCrumbsCustom
        routes={[
          {
            name: "INICIO",
            url: "/resultados/inicio/",
          },
          {
            //
            name: "JORNADAS FORMALES",
            url: "/resultados/formales/",
          },
        ]}
        currentRoute={
          !isLoadingConfigJornadaFormal
            ? configJornadaFormal?.eleccionModel?.nombreJornada
            : "..."
        }
      ></BreadCrumbsCustom>
      {/* {JSON.stringify(configJornadaFormal?.configuracionModel?.finRecepVoto)} */}
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        justifyContent="center"
        sx={{
          width: "90%",
          background: "#fff",
          boxShadow: 5,
          pt: 5,
          pb: 5,
          mb: 5,
          borderRadius: "15px",
        }}
      >
        <Typography
          textAlign={"center"}
          sx={{
            p: 2,
            fontSize: { lg: "22px", sm: "18px", xs: "15px" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          {configJornadaFormal?.eleccionModel?.nombreJornada}
        </Typography>

        {!disponible && (
          <Alert sx={{ mb: 3 }} severity="warning">
            Los resultados de esta jornada aún no estan disponibles
          </Alert>
        )}

        <SearchCustome
          buscador={buscador}
          handleSearch={handleSearch}
        ></SearchCustome>
        <Box
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          sx={{
            p: 2,
            mt: 1,
            width: "90%",
            borderRadius: "20px",
            height: "auto",
            // background: "#fff",
            // boxShadow: 3,
          }}
        >
          {/* <Typography sx={{ mb:2 ,}}>Elecciones recientes</Typography> */}
          <Box sx={{ width: "100%", p: 3, mt: 0 }}>
            <Typography
              textAlign={"center"}
              sx={{ fontSize: "20px", fontWeight: "bold" }}
            >
              Resultados encontrados:
            </Typography>
            {isLoadingBoletas ? (
              <Stack
                justifyContent="center"
                sx={{ color: "grey.500" }}
                spacing={2}
                direction="row"
              >
                <CircularProgress color="primary" />
              </Stack>
            ) : (
              <Box sx={{ width: "100%", p: 3, mt: 3 }}>
                <GridBoletas disponible={disponible} boletas={dataSearch} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
