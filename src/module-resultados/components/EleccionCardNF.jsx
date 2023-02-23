import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EleccionCardNF = (jornada = {}) => {
  const navigate = useNavigate();

  const goTo = (url) => {
    navigate(url);
  };

  useEffect(() => {
    console.log(jornada.jornada);
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      sx={{
        width: "250px",
        height: "auto",
        background: "#ff94a2",
        color: "#000",
        boxShadow: 4,
        borderRadius: "10px",
      }}
    >
      <Box
        sx={{
          width: "calc(100% + 15px)",
          height: "25px",
          background: "#ffe180",
          boxShadow: 5,
        }}
      ></Box>
      <Typography
        sx={{
          pl: 1,
          pr: 1,
          fontSize: { lg: "20px", xs: "15px" },
          mt: 2,
          mb: 1,
          fontWeight: "bold",
        }}
        textAlign={"center"}
      >
        {jornada?.jornada?.nombreEleccion}
      </Typography>
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        sx={{ p: 3 }}
      >
        <Typography textAlign={"center"}>
          {jornada?.jornada?.tipoEleccion}
        </Typography>
        <Button
          onClick={() =>
            goTo(
              "/resultados/boletas-noformales/" + jornada?.jornada?.idEleccion
            )
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
