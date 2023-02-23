import { Box, Typography } from "@mui/material";
import React from "react";
import wait from "../img/wait.png";

export const NoDisponible = ({ titulo = "" }) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent="center"
      width={"100%"}
      sx={{ mt: 10 }}
    >
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        justifyContent="center"
        width={{ lg: "50%", md: "60%", xs: "70%" }}
        sx={{
          p: 4,
          background: "#fff",
          mt: 2,
          mb: 5,
          boxShadow: 7,
          borderRadius: "20px",
          height: "auto",
        }}
      >
        {titulo === "" ? (
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: { lg: "25px", md: "20px", xs: "18px" },
              fontWeight: "bold",
            }}
          >
            RESULTADOS NO DISPONIBLES
          </Typography>
        ) : (
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: { lg: "25px", md: "20px", xs: "18px" },
              fontWeight: "bold",
            }}
          >
            RESULTADOS NO DISPONIBLES DE "{titulo}"
          </Typography>
        )}

        <img
          width={"200px"}
          height="200px"
          src={
            "https://imagesvotacion.s3.eu-north-1.amazonaws.com/1676865671355_wait.png"
          }
        />
      </Box>
    </Box>
  );
};
