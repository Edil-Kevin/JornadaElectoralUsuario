import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import consultaImg from "../img/consulta.png";
import jornadaIMG from "../img/jornadaformal.png";
import jornadaNFIMG from "../img/jornadaNF.jpg";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import React from "react";
import { useNavigate } from "react-router-dom";

export const OptionCard = ({ type = 1, name = "", url = "", imagen = "" }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const goTo = (url) => {
    navigate(url);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { lg: "row", xs: "column" },
          height: { lg: "200", md: "300", xs: "350px" },
          width: {
            xl: "600px",
            lg: "550px",
            md: "500px",
            sm: "400px",
            xs: "200px",
          },
          borderRadius: "20px",
          boxShadow: 4,
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5">{name}</Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Ver resultados
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Button
              onClick={() => {
                goTo(url);
              }}
              variant="outlined"
            >
              Entrar
            </Button>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{
            height: { md: "400px", xs: "200px" },
            width: "100%",
          }}
          image={
            imagen
            // type === 1 ? jornadaIMG : type === 2 ? jornadaNFIMG : consultaImg
          }
          alt="img"
        />
      </Card>
    </ThemeProvider>
  );
};
