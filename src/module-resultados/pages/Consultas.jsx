import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GridCards } from "../components/GridCards";
import { SearchCustome } from "../components/SearchCustome";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { GridConsultas } from "../components/GridConsultas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJornadasConsultas } from "../../store/resultados-consultas/consultasThunks";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";

export const Consultas = () => {
  const dispatch = useDispatch();
  const { jornadas, isLoadingJornadas } = useSelector(
    (state) => state.consultas
  );
  const [rangFecha, setRangFecha] = React.useState("month");
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

  const filterForDate = (data, buscador) => {
    const rangoFecha = new Date();
    let filterFn;
    if (buscador === "month") {
      filterFn = (obj) => {
        const fecha = new Date(obj.dateTimeCreation);
        return (
          fecha.getMonth() === rangoFecha.getMonth() &&
          fecha.getFullYear() === rangoFecha.getFullYear()
        );
      };
    } else if (buscador === "year") {
      filterFn = (obj) => {
        const fecha = new Date(obj.dateTimeCreation);
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

  const searching = (data, buscador) => {
    const newData = data.filter((jornada) => {
      if (jornada.nombreJornada.toUpperCase().includes(buscador.toUpperCase()))
        return jornada;
    });

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
    dispatch(getJornadasConsultas());
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent="center"
      sx={{ mt: 3, mb: 5, width: "100%", height: "auto" }}
    >
      <BreadCrumbsCustom
        routes={[
          {
            name: "INICIO",
            url: "/resultados/inicio/",
          },
        ]}
        currentRoute="CONSULTAS"
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
        <Typography sx={{ mt: 3, mb: 5, fontSize: "20px", fontWeight: "bold" }}>
          Busque la consulta
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
            p: 2,
            mt: 5,
            width: "90%",
            borderRadius: "20px",
            height: "auto",
            // background: "#fff",
            //boxShadow: 3,
            //border: "2px solid",
            //borderColor: "#BEBDBD",
          }}
        >
          <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
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
              <GridConsultas jornadas={dataSearch} />
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
