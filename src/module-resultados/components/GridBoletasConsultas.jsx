import { Box, Typography } from "@mui/material";
import React from "react";
import { BoletaCard } from "./BoletaCard";
import { BoletaConsultaCard } from "./BoletaConsultaCard";
import { EleccionCard } from "./EleccionCard";

export const GridBoletasConsultas = ({
  disponible,
  more = false,
  papeletas = [],
}) => {
  return (
    <Box
      className="animate__animated animate__fadeInUp"
      display={"flex"}
      gap="60px"
      flexWrap="wrap"
      justifyContent={"center"}
      width={"100%"}
    >
      {papeletas?.length > 0 ? (
        papeletas.map((papeleta) => (
          <BoletaConsultaCard disponible={disponible} papeleta={papeleta} />
        ))
      ) : (
        <Typography> No se encontró información</Typography>
      )}
    </Box>
  );
};
