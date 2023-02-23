import { Box } from "@mui/material";
import React from "react";
import { CardCandidatos } from "./CardCandidatos";
import { CardPlanilla } from "./CardPlanilla";

export const GridPlanilla = ({ total = 1, candidatos = [] }) => {
  console.log(candidatos);
  return (
    <Box
      display={"flex"}
      alignItems="center"
      flexDirection={"column"}
      width={"100%"}
    >
      {candidatos?.map((candi) => {
        return <CardPlanilla total={total} candidato={candi} />;
      })}
    </Box>
  );
};
