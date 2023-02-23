import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const Topbar = () => {
  return (
    <Grid container p="1rem">
      <Grid
        item
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
        xs={2}
      >
        <Box>
          <img
            alt="logo"
            // src="../../images/CEE600x321.png"
            src="./images/CEE600x321.png"
            style={{
              transition: "width 0.5s, height 0.5s",
              width: "8rem",
              // width: isCollapsed ? "75px" : "139px",
              // height: isCollapsed ? "40px" : "73.99px",
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        display="flex"
        alignItems={"center"}
        justifyContent={"space-evenly"}
        xs={8}
      >
        <Typography variant="subtitle1" color="initial">
          <Link style={{ textDecoration: "none", color: "black" }}>Inicio</Link>
        </Typography>
        <Typography variant="subtitle1" color="initial">
          <Link style={{ textDecoration: "none", color: "black" }}>
            Resultados
          </Link>
        </Typography>
        <Typography variant="subtitle1" color="initial">
          <Link style={{ textDecoration: "none", color: "black" }}>
            Verificación
          </Link>
        </Typography>
        <Typography variant="subtitle1" color="initial">
          <Link style={{ textDecoration: "none", color: "black" }}>
            Información
          </Link>
        </Typography>
      </Grid>
      <Grid
        item
        display={"flex"}
        alignItems={"center"}
        justifyContent="center"
        xs={2}
      >
        <Box>
          <Button
            variant="contained"
            size="large"
            sx={{
              boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
              transition: "all 0.5s ease",
              backgroundColor: "#543884",
              width: "100%",
              // borderRadius: "2rem 2rem 2rem 2rem",
              "&:hover": {
                backgroundColor: "#7E328B !important",
                transform: "translate(-5px, -5px)",
                boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            Ingresar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
