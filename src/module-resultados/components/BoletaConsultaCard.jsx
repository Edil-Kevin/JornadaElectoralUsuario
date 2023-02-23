import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BoletaConsultaCard = ({ disponible, papeleta }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        p: 1.5,
        width: "250px",
        height: "280px",
        background: "#C80AAE",
        color: "#fff",
        boxShadow: 6,
        borderRadius: "1px",
      }}
    >
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        flexDirection={"column"}
        sx={{
          width: "100%",
          height: "250px",
          background: "#000",
          boxShadow: 2,
          borderRadius: "10px",
          color: "#fff",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", mt: 2, mb: 1, fontWeight: "bold" }}
          textAlign={"center"}
        >
          {papeleta?.nombre}
        </Typography>
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          flexDirection={"column"}
          sx={{ p: 3 }}
        >
          <Typography textAlign={"center"}>{papeleta?.municipio}</Typography>
          <Button
            disabled={!disponible}
            sx={{ mt: 2, background: "#fff", color: "#000" }}
            onClick={() =>
              goTo(
                "/resultados/result-consulta/" + id + "/" + papeleta?.idPapeleta
              )
            }
            color="inherit"
            variant="contained"
          >
            Ver rresultados
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
