import BallotIcon from '@mui/icons-material/Ballot';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { onGetFoliosJornadas } from '../../store/verificacion-voto/verificacionThunks';
// import { onSetJornadaSelected } from '../../store/verificacion-voto/verificacionSlice';
import { useVerficacionStore } from '../hooks/useVerificacionStore';
// ----------- Bradcrumbs ----------
// import { experimentalStyled as styled } from '@mui/material/styles';
import { BotonBack } from './botonback';
import { BreadCrumbsCustom } from './BreadCrumbsCustom';

  export const Jornadas = () => {
      const navigate = useNavigate();
      const plantilla1 = (id) => {
          navigate("/verificacion/visualizacion/boleta/"+id);
        };
        const [searchJornada, setSearchJornada] = useState('');
        const params = useParams();
        const dispatch = useDispatch();
        //asdasd

        const { jornadasFolio } = useVerficacionStore();
      useEffect(() => {
          dispatch(onGetFoliosJornadas());
      }, []);
        const jornadasFiltradas = jornadasFolio.filter((jornada) =>
    jornada.jornadaModel.nombreJornada.toLowerCase().includes(searchJornada.toLowerCase())
    );
    //   console.log(jornadasFolio);
    //   console.log(params);

      //
	return (
		<Box pt="1.5rem"     
        sx={{						
            height: "auto",
            flexGrow: 1,
            overflowY: { sx: "none", md: "auto" },
          }}>
			<Container
				maxWidth="md"
				sx={{
					boxShadow: 1,
					backgroundColor: "white",
					borderRadius: { xs: "1rem", md: "2rem" },
                    overflowY: "auto",
					p: "2rem",    
				}}
			>
                {/* start Bradcrumbs */}
                        <BreadCrumbsCustom
						routes={[
							{
								name: "VERIFICACIÓN",
								url: "/verificacion",
							},
						]}
						currentRoute="JORNADAS ELECTORALES"
					></BreadCrumbsCustom>
                {/* end Bradcrumbs */}
                {jornadasFolio.length > 0 ? (
                    <>
					<Typography
						color="initial"
						align="center"
						sx={{
							fontSize: {
								xs: "1.3rem",
								sm: "1.4rem",
								md: "1.6rem",
								lg: "1.8rem",
								xl: "1.8rem",
							},
						}}
					>
                        A CONTINUACIÓN SE MUESTRAN LAS JORNADAS ELECTORALES DISPONIBLES
					</Typography>
                    <Box 
                    ml={{											
                        xs: 2,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                    }} 
                    mr={{											
                        xs: 2,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 4,
                    }} 
                    sx={{ 
                        display: 'flex', 
                        justifyContent:'flex-end' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Ingrese el nombre de la jornada a buscar"
                            sx={{ width: {
                                xs: "100%",
                                sm: "100%",
                                md: "50%",
                                lg: "45%",
                                xl: "45%",
                            } }}
                            size="normal"
                            placeholder="Ejemplo: Jornada..."
                            onChange={(e) => setSearchJornada(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />
                    </Box>
                    <Box ml={1} mr={1} mt={4} mb={1} align="center" display="flex" justifyContent="center">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {jornadasFiltradas.map((jornada) => (
                    <Grid item xs={4} sm={4} md={4} key={jornada.jornadaModel.idJornada}>
                        <Card 
                        sx={{ minWidth: 247 }} 
                        onClick={() => plantilla1(jornada.jornadaModel.idJornada)}
                        style={{ 
                          // border: "1px solid #D0D0D0", 
                          // background: "#373637"
                          backgroundColor: "#373736",
                      }} >
                          <CardContent>

                            <Typography variant="h6" component="div" color="white">
                            {jornada.jornadaModel.nombreJornada}	
                            </Typography>
                          </CardContent>
                          <CardActions >
                            <Box  align="center" display="flex" justifyContent="center" width="100%" mb={1}>
                            <Button 
                                onClick={() => plantilla1(jornada.jornadaModel.idJornada)}
                                startIcon = {<BallotIcon />}
                                sx={{
									// backgroundColor: "#eba302",
                                    backgroundColor: {
                                        xs: "#373736",
                                        sm: "#373736",
                                        md: "#eba302",
                                        lg: "#eba302",
                                        xl: "#eba302",
                                    },
									// color: "#fff",
                                    color:{
                                        xs: "#f0b91a",
                                        sm: "#f0b91a",
                                        md: "#fff",
                                        lg: "#fff",
                                        xl: "#fff",
                                    },
									fontSize: {
                                        xs: "1rem",
                                        sm: "1rem",
                                        md: "1rem",
                                        lg: "0.9rem",
                                        xl: "0.95rem",
									},
									textAlign: "center",
                                    width: {
                                        xs: "90%",
                                        sm: "85%",
                                        md: "85%",
                                        lg: "80%",
                                        xl: "87%",
                                    },
									"&:hover": {
										background: "linear-gradient(45deg, #fecd0d 30%, #f0b91a 90%)",
                                        color: "#FFFFFF",
									},
								}}>
                                Verificar boletas
                                </Button>
                                </Box>
                          
                          </CardActions>
                        </Card>

                            </Grid>
                            ))}
                        </Grid>
                </Box>
                </>
                ):
                (
                        <>
                    <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "#ff0000" }}>
                        No se encontraron jornadas por el momento, intente más tarde.
                    </Typography>
                    <BotonBack url='/verificacion'/>
                        </>
                )}

			</Container>
		</Box>
	);
};

