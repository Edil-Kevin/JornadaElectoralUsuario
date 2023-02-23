import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { onGetData } from "../../store/verificacion-voto/verificacionThunks";
import { useVerficacionStore } from '../hooks/useVerificacionStore';
// import { ModalBoleta } from "./ModalBoleta";


export const FolioFound = () => {

	const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const plantilla2 = () => {
      navigate("/verificacion/individual");
    };
    const { votos } = useVerficacionStore();

    // console.log("VOTOOOOOOOOOOS",votos);

    // const [statusModal, setStatusModal] = useState(false);
    // const handleCloseModal = () => setStatusModal(false);
    // const handleOpenModal = () => {
    //     // toastOffOperation();
    //     setStatusModal(true);
    //     };
	return (
		<Box pt="1.5rem"
        sx={{						
            height: "auto",
            flexGrow: 1,
            overflowY: { sx: "none", md: "auto" },
          }}>
			<Container
				maxWidth="lg"
                sx={{
                    boxShadow: 1,
                    backgroundColor: "white",
                    borderRadius: { xs: "1rem", md: "2rem" },
                              overflowY: "auto",
                    p: "2rem",    
                  }}
			>
				<Box sx={{ width: "100%" }}>
                    <Box 
                    align="center">


					<Typography
						color="initial"
						mb="0.5rem"
						align="center"
						sx={{
							fontSize: {
								xs: "1.2rem",
                                sm: "1.2rem",
								md: "1.2rem",
								lg: "1.2rem",
								xl: "1.2rem",
							},
						}}
					>
						LA BOLETA ELECTORAL CON FOLIO:
                        </Typography>
                    <Typography
                        color="primary"
                        mb="1rem"
                        align="center"
                        sx={{
                            fontSize: {
                                xs: "1.3rem",
                                sm: "1.3rem",
                                md: "1.4rem",
                                lg: "1.4rem",
                                xl: "1.4rem",
                            },
                        }}
                    > 
                        {params.folio}
                    </Typography>
                    <Typography
                        color="initial"
                            mb="0.5rem"
                            align="center"
                            sx={{
                                fontSize: {
                                    xs: "1.2rem",
                                    sm: "1.2rem",
                                    md: "1.2rem",
                                    lg: "1.2rem",
                                    xl: "1.2rem",
                                },
                            }}
                        > 
                        PRESENTA LOS SIGUIENTES DATOS:
					</Typography>
                    <Typography
                        color="initial"
                            mb="0.5rem"
                            align="center"
                            sx={{
                                fontSize: {
                                    xs: "1rem",
                                    sm: "1rem",
                                    md: "1rem",
                                    lg: "1rem",
                                    xl: "1rem",
                                },
                            }}
                        > 
                        PARTIDOS CON SU RESPECTIVO CANDIDATO VOTADO
					</Typography>


                    <Grid container spacing={2}>
  {votos.map((voto, index) => (
    <Grid item key={index} xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%' }} background="#FFFDD0">
        {/* <CardMedia
          component="img"
          height="140"
          image={`https://source.unsplash.com/400x400/?${voto.nombrePartido}`}
          alt={voto.nombrePartido}
        /> */}
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {voto.nombrePartido}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {voto.nombreCandidato}
          </Typography>
          <Typography color="textSecondary">
            ID de selección: {voto.idSeleccion}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>









                    {/* <Box
                    mb={2}>
                    <Button 
                        startIcon={<PreviewIcon size="Large"/>}
                        onClick={handleOpenModal}
                        sx={{
                            backgroundColor: "#511079",
                            color: "#fff",
                            fontSize: {
                                xs: "1rem",
                                sm: "1rem",
                                md: "1rem",
                                lg: "1rem",
                                xl: "1rem",
                            },
                            textAlign: "center",
                            width: {
                                xs: "80%",
                                sm: "70%",
                                md: "60%",
                                lg: "50%",
                                xl: "50%",
                            },
                            // height: "10%",
                            "&:hover": {
                                background: "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                                color: "#FFFFFF",
                            },
                        }}>
                        MOSTRAR BOLETA
                        </Button>
                    </Box> */}
<Box mt={5}>
  <Stack direction="column" alignItems="center">
    <Button 
      startIcon={<PersonSearchIcon size="Large"/>}
      onClick={plantilla2}
      sx={{
        fontSize: "1.3rem",
        // width: "200px",
        width: {
            xs: "200px",
            sm: "200px",
            md: "350px",
            lg: "350px",
            xl: "350px",
        },
        height: "50px",
        "&:hover": {
          background: "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
          color: "#FFFFFF",
        },
      }}>
      Ingresar otro folio
    </Button>
  </Stack>
</Box>
                    </Box>
				</Box>
			</Container>
            {/* <ModalBoleta statusModal={statusModal} handleToggleModal={handleCloseModal} /> */}
		</Box>
	);
};
