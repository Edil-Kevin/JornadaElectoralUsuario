import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GridCards } from "../components/GridCards";
import { SearchCustome } from "../components/SearchCustome";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { useDispatch, useSelector } from "react-redux";
import { getJornadasFormales } from "../../store/resultados-formales/formalesThunks";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";

export const Formales = () => {
  const dispatch = useDispatch();
  const { jornadas, isLoadingJornadas } = useSelector(
    (state) => state.formales
  );
  const [rangFecha, setRangFecha] = React.useState("");
  const [buscador, setBuscador] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(jornadas, event.target.value);
  };

  const handleFilter = (event) => {
    setRangFecha(event.target.value);
    console.log("Tiempo", event.target.value);
    filterForDate(jornadas, event.target.value);
  };

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (jornada.nombreJornada.toUpperCase().includes(buscador.toUpperCase()))
        return jornada;
    });

    setDataSearch(newData);
  };
  const filterForDate = (data, buscador) => {
    const rangoFecha = new Date();

    let filterFn;
    if (buscador === "month") {
      filterFn = (obj) => {
        const fecha = new Date(obj.fechaHoraCreacion);
        return (
          fecha.getMonth() === rangoFecha.getMonth() &&
          fecha.getFullYear() === rangoFecha.getFullYear()
        );
      };
    } else if (buscador === "year") {
      filterFn = (obj) => {
        const fecha = new Date(obj.fechaHoraCreacion);
        return fecha.getFullYear() === rangoFecha.getFullYear();
      };
    } else if (buscador === "all") {
      setDataSearch(jornadas);
      return;
    }

    // Aplicar el filtro y actualizar los datos
    const newData = data.filter(filterFn);
    setDataSearch(newData);
  };

  useEffect(() => {
    const newD = [...jornadas];
    newD.sort((a, b) => {
      if (a.fechaHoraCreacion < b.fechaHoraCreacion) {
        return 1;
      } else if (a.fechaHoraCreacion > b.fechaHoraCreacion) {
        return -1;
      } else {
        return 0;
      }
    });
    setDataSearch(newD);
  }, [jornadas]);

  useEffect(() => {
    dispatch(getJornadasFormales());
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
        ]}
        currentRoute="JORNADAS ELECTORALES FORMALES"
      />
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
        <Typography sx={{ mb: 5, fontSize: "20px", fontWeight: "bold" }}>
          Busque la elección
        </Typography>
        <Box
          display={"flex"}
          flexDirection={{ md: "row", xs: "column" }}
          alignItems={"center"}
          justifyContent="space-around"
          sx={{
            mt: 3,
            width: { lg: "60%", md: "90%", xs: "100%" },
            height: { md: "70px", xs: "150px" },
          }}
        >
          {" "}
          <SearchCustome
            buscador={buscador}
            handleSearch={handleSearch}
          ></SearchCustome>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="demo-simple-select-label">Filtrar por</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rangFecha}
              label="Filtrar por"
              onChange={handleFilter}
            >
              <MenuItem value={"month"}>Mes</MenuItem>
              <MenuItem value={"year"}>Año</MenuItem>
              <MenuItem value={"all"}>Todo</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          sx={{
            // background: "#fff",
            p: 2,
            mt: 5,
            width: "90%",
            borderRadius: "20px",
            height: "auto",
            // boxShadow: 2,
          }}
        >
          <Typography
            textAlign={"center"}
            sx={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Resultados encontrados:
          </Typography>
          <Box sx={{ width: "100%", p: 3, mt: 3 }}>
            {isLoadingJornadas ? (
              <Stack
                justifyContent="center"
                sx={{ color: "grey.500" }}
                spacing={2}
                direction="row"
              >
                <CircularProgress color="primary" />
              </Stack>
            ) : (
              <GridCards jornadas={dataSearch} />
            )}
          </Box>

          {/* <IconButton
            sx={{ mt: 2 }}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <Typography sx={{ mr: 2 }}>Ver más</Typography>
            <ExpandCircleDownIcon />
          </IconButton> */}
        </Box>
      </Box>
    </Box>
  );
};
