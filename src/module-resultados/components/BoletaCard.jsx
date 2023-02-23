import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BoletaCard = ({ disponible, boleta }) => {
  const { id } = useParams();
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
        p: 2,
        width: "250px",
        height: "auto",
        background: "#2D2B28",
        color: "#fff",
        boxShadow: 6,
        borderRadius: "1px",
      }}
    >
      <Box
        sx={{
          background: "#f5e1ce",
          boxShadow: 2,
          borderRadius: "10px",
          color: "#000",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", mt: 2, mb: 1, fontWeight: "bold" }}
          textAlign={"center"}
        >
          {boleta?.nombreEstructuraBoleta}
        </Typography>
        <Box
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          sx={{ p: 3 }}
        >
          <Typography textAlign={"center"}>{boleta?.municipio}</Typography>
          <Button
            disabled={!disponible}
            sx={{ mt: 2, background: "#2D2B28", color: "#fff" }}
            onClick={() => {
              goTo(
                "/resultados/result-formales/" +
                  id +
                  "/" +
                  boleta?.idEstructuraBoleta
              );
            }}
            variant="contained"
          >
            Ver resultados
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
