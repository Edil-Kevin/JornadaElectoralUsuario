import { Box, Typography } from "@mui/material";
import React from "react";
import { EleccionCard } from "./EleccionCard";
import { EleccionCardNF } from "./EleccionCardNF";

export const GridCardsNF = ({ more = false, jornadas = [] }) => {
  return (
    <Box
      className="animate__animated animate__fadeInUp"
      display={"flex"}
      gap="60px"
      flexWrap="wrap"
      justifyContent={"center"}
      width={"100%"}
    >
      {jornadas?.length > 0 ? (
        jornadas?.map((jornada) => <EleccionCardNF jornada={jornada} />)
      ) : (
        <Typography>No encontró resultados</Typography>
      )}
    </Box>
  );
};
