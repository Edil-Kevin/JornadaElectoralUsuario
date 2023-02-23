import { Box } from "@mui/material";
import React from "react";
import { getCandidatos } from "../../helpers/FakeAPI";
import { CardCandidatos } from "./CardCandidatos";

export const GridCandFormales = ({ total, candidatos }) => {
  // const candi = getCandidatos();
  return (
    <Box
      display={"flex"}
      alignItems="center"
      flexDirection={"column"}
      width={"100%"}
    >
      {candidatos?.map((candi) => {
        return <CardCandidatos total={total} candidato={candi} />;
      })}
    </Box>
  );
};
