import { Box, Typography } from "@mui/material";
import React from "react";
import { BoletaCard } from "./BoletaCard";
import { EleccionCard } from "./EleccionCard";

export const GridBoletas = ({ disponible, more = false, boletas = [] }) => {
  return (
    <Box
      className="animate__animated animate__fadeInUp"
      display={"flex"}
      gap="60px"
      flexWrap="wrap"
      justifyContent={"center"}
      width={"100%"}
    >
      {boletas?.length > 0 ? (
        boletas?.map((boleta) => (
          <BoletaCard disponible={disponible} boleta={boleta}></BoletaCard>
        ))
      ) : (
        <Typography>No se encontró información</Typography>
      )}
    </Box>
  );
};
