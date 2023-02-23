import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BoletaNFCard = ({ disponible, boleta }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const goTo = (url) => {
    navigate(url);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      sx={{
        p: 2,
        width: "250px",
        height: "auto",
        background: "#ff94a2",
        color: "#fff",
        boxShadow: 6,
        borderRadius: "1px",
      }}
    >
      <Box
        sx={{
          background: "#ffe180",
          boxShadow: 2,
          borderRadius: "10px",
          color: "#000",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", mt: 2, mb: 0, fontWeight: "bold" }}
          textAlign={"center"}
        >
          {boleta?.encabezadoBoleta}
        </Typography>
        <Box
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          sx={{ p: 3 }}
        >
          <Typography textAlign={"center"}>{boleta.municipio}</Typography>
          <Button
            sx={{ mt: 2, background: "#fff", color: "#000" }}
            color="inherit"
            variant="contained"
            disabled={!disponible}
            onClick={() =>
              goTo(
                "/resultados/result-noformal/" +
                  id +
                  "/" +
                  boleta?.idEstructuraBoleta
              )
            }
          >
            Ver resultados
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
