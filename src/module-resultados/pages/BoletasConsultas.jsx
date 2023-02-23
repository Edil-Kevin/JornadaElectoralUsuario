import {
  Alert,
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
import { GridBoletasConsultas } from "../components/GridBoletasConsultas";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getConfigConsulta,
  getPapletas,
} from "../../store/resultados-consultas/consultasThunks";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";

export const BoletasConsultas = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [jornada, setjornada] = useState(null);
  const {
    jornadas,
    papeletas,
    isLoadingPapeletas,
    isLoadingConfigConsulta,
    configConsulta,
  } = useSelector((state) => state.consultas);

  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [disponible, setDisponible] = useState(true);

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(papeletas, event.target.value);
  };

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (jornada.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return jornada;
    });

    setDataSearch(newData);
  };

  useEffect(() => {
    setDataSearch(papeletas);
  }, [papeletas]);

  useEffect(() => {
    const now = new Date();
    const fin = new Date(configConsulta?.configuracionModel?.finRecepVoto);
    console.log("FIN: ", fin);
    if (now > fin) {
      setDisponible(true);
    } else {
      setDisponible(false);
    }
  }, [configConsulta]);

  const getJornada = (id) => {
    return jornadas.find((jornada) => {
      console.log(jornada);
      if (jornada.idJornada.toString() === id.toString()) return jornada;
    });
  };
  useEffect(() => {
    dispatch(getPapletas(id));
    dispatch(getConfigConsulta(id));
    const jornadaa = getJornada(id);

    setjornada(jornadaa);
  }, []);

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
            name: "CONSULTAS",
            url: "/resultados/consultas/",
          },
        ]}
        currentRoute={
          !isLoadingConfigConsulta
            ? configConsulta?.jornadaModel?.nombreJornada
            : "..."
        }
      ></BreadCrumbsCustom>
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
            mb: 5,
            fontSize: { lg: "22px", sm: "18px", xs: "15px" },
            fontWeight: "bold",
          }}
        >
          {configConsulta?.jornadaModel?.nombreJornada}
        </Typography>

        {/* {JSON.stringify(configConsulta?.configuracionModel?.finRecepVoto)} */}

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
            pt: 4,
            mt: 5,
            width: "90%",
            borderRadius: "20px",
            height: "auto",
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Resultados encontrados:
          </Typography>
          {isLoadingPapeletas ? (
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
              <GridBoletasConsultas
                disponible={disponible}
                papeletas={dataSearch}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
