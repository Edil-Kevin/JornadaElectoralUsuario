import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const EleccionCard = ({ jornada = {} }) => {
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
        background: "#543884",
        color: "#fff",
        boxShadow: 4,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: "calc(100% + 15px)",
          height: "25px",
          background: "#f8de7e",
          boxShadow: 5,
        }}
      ></Box>
      <Typography
        sx={{
          fontSize: { lg: "20px", xs: "15px" },
          mt: 2,
          mb: 1,
          p: 2,
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
        sx={{ p: 3 }}
      >
        <Typography textAlign={"center"}>{jornada?.tipoJornada}</Typography>
        <Button
          onClick={() =>
            goTo("/resultados/boletas-formales/" + jornada?.idJornada)
          }
          sx={{ mt: 2, background: "#fff", color: "#000" }}
          color="inherit"
          variant="contained"
        >
          Entrar
        </Button>
      </Box>
    </Box>
  );
};
