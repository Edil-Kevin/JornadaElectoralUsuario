import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const ConsultasCard = ({ jornada = {} }) => {
  const navigate = useNavigate();

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      sx={{
        width: "250px",
        height: "auto",
        background: "#000",
        color: "#fff",
        boxShadow: 4,
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          width: "calc(100% + 15px)",
          height: "25px",
          background: "#C80AAE",
          boxShadow: 5,
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: { lg: "20px", xs: "15px" },
          p: 1,
          mt: 2,
          mb: 1,
          fontWeight: "bold",
        }}
        textAlign={"center"}
      >
        {jornada?.nombreJornada}
      </Typography>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        sx={{ p: 1 }}
      >
        <Typography sx={{ mb: 2 }} textAlign={"center"}>
          Estado: {jornada?.entidad}
        </Typography>
        <Button
          onClick={() =>
            goTo("/resultados/boletas-consultas/" + jornada?.idJornada)
          }
          sx={{ mb: 2, background: "#fff", color: "#000" }}
          color="inherit"
          variant="contained"
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};
