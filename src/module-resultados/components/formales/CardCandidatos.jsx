import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";

const card = {
  width: "100%",
  backgroundColor: "#fff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
  borderRadius: "20px",
  overFlow: "hidden",
  mb: 5,
};

const header = {
  display: "flex",
  backgroundColor: "#333",
  width: "100%",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  borderRadius: "5px",
  fontSize: "18px",
};

const skill = {
  display: "flex",
  alignItems: "center",
  marginBottom: " 20px",
};

const skillName = {
  width: "120px",
  fontSize: "16px",
};

const skillLevel = {
  width: "160px",
  height: "10px",
  backgroundColor: "#eee",
  borderRadius: "10px",
  overFlow: "hidden",
  marginLeft: "20px",
};

const skillPercent = {
  backgroundColor: "#333",
  height: "100%",
};
const userPhoto = {
  width: "4.5rem",
  overFlow: "hidden",
  padding: 0,
  borderRadius: "50%",
  border: "1px solid rgb(231, 227, 227)",
  boxShadow: "2px 2px 10px lightslategray",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const CardCandidatos = ({ total, candidato }) => {
  const [porncentaje, setPorncentaje] = useState(
    (100 * candidato.candidad) / total
  );
  return (
    <Box sx={card}>
      <Box sx={header} className="header">
        <Box sx={userPhoto} className="header">
          <img
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "50%" }}
            src={candidato.foto}
            class="photo"
          />
        </Box>
        <Typography sx={{ m: 1 }}>{candidato?.nombre}</Typography>
      </Box>
      <Box sx={{ padding: "20px" }} className="body">
        <Box sx={skill}>
          <Box sx={skillName}>Porcentaje</Box>
          <Box sx={skillLevel}>
            <Box sx={skillPercent} width={porncentaje + "%"}></Box>
          </Box>
          <Box sx={{ marginLeft: "20px", fontSize: "16px" }}>
            {porncentaje.toFixed(2)}%
          </Box>
        </Box>

        <Box sx={skill}>
          <Box sx={skillName}>Total votos</Box>
          <Box sx={{ marginLeft: "20px", fontSize: "16px" }}>
            {candidato?.candidad} votos
          </Box>
        </Box>

        <Divider></Divider>
        <Box
          display={"flex"}
          alignItems="center"
          flexDirection="column"
          sx={{ mt: 2, width: "100%" }}
        >
          <Typography
            mb={"10px"}
            sx={{ fontWeight: "bold" }}
            textAlign={"center"}
          >
            Partido(s)
          </Typography>

          <Box>
            {candidato?.partidos.map((partido) => {
              return <img width={"50px"} height="50px" src={partido.logo} />;
            })}
          </Box>
        </Box>
        <Box sx={skill}></Box>
      </Box>
    </Box>
  );
};
