import { Box, Typography } from "@mui/material";
import React from "react";

export const Resumen = ({
  acumulados = 0,
  candReg = 0,
  nulos = 0,
  total = 0,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      flexDirection={"column"}
      alignItems={"center"}
      bgcolor="#f2f2f2"
      borderRadius={"7px"}
      border="1px solid"
      borderColor={"#BEBDBD"}
      boxShadow={5}
      mb={3}
      width={{ lg: "70%", md: "80%", xs: "100%" }}
      height="auto"
      p={2}
    >
      <Typography
        variant="h6"
        color="#543884"
        sx={{
          fontWeight: "bold",
          pb: 3,
          fontSize: { lg: "25px", md: "18px", xs: "15px" },
        }}
      >
        RESUMEN
      </Typography>
      <Box
        display={"flex"}
        justifyContent="center"
        flexDirection={{ sm: "row", xs: "column" }}
        alignItems={"center"}
      >
        <Box display={"flex"} alignItems="center" flexDirection="column">
          <Typography
            sx={{
              fontWeight: "bold",
              pb: 1,
              fontSize: { lg: "15px", md: "12px", xs: "10px" },
            }}
          >
            VOTOS ACUMULADOS
          </Typography>
          <Typography sx={{ pb: 0, fontSize: "1rem" }}>{acumulados}</Typography>
        </Box>
        <Box sx={{ fontWeight: "bold", p: 2 }}>+</Box>
        <Box display={"flex"} alignItems="center" flexDirection="column">
          <Typography
            sx={{
              fontWeight: "bold",
              pb: 1,
              fontSize: { lg: "15px", md: "12px", xs: "10px" },
            }}
          >
            VOTOS NULOS
          </Typography>
          <Typography sx={{ pb: 0, fontSize: "1rem" }}>{nulos}</Typography>
        </Box>
        <Box sx={{ p: 3 }}>+</Box>
        <Box display={"flex"} alignItems="center" flexDirection="column">
          <Typography
            sx={{
              fontWeight: "bold",
              pb: 1,
              fontSize: { lg: "15px", md: "12px", xs: "10px" },
            }}
          >
            CAND. NO REGISTRADAS
          </Typography>
          <Typography sx={{ pb: 0, fontSize: "1rem" }}>{candReg}</Typography>
        </Box>
        <Box sx={{ p: 3 }}>=</Box>
        <Box display={"flex"} alignItems="center" flexDirection="column">
          <Typography
            sx={{
              fontWeight: "bold",
              pb: 1,
              fontSize: { lg: "20px", md: "18px", xs: "12px" },
            }}
          >
            TOTAL
          </Typography>
          <Typography sx={{ pb: 0, fontWeight: "bold", fontSize: "1.5rem" }}>
            {total}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
