import { Box, Button, CardActionArea, CardActions, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { Container } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

export const VerificacionPage = () => {
	const navigate = useNavigate();
	const plantilla1 = () => {
		navigate("/verificacion/individual");
	};
	const plantilla2 = () => {
		navigate("/verificacion/visualizacion");
	};
	return (
		<Box pt="1.5rem">
			<Container
				maxWidth="lg"
				sx={{
					boxShadow: 1,
					backgroundColor: "white",
					borderRadius: { xs: "1rem", md: "2rem" },
					p: "2rem",
					pl: "2rem",
				}}
			>
				<Box sx={{ width: "100%" }}>
					<Typography
						color="initial"
						mb="1rem"
						align="center"
						sx={{
							fontSize: {
								xs: "1.6rem",
								sm: "1.7rem",
								md: "1.8rem",
								lg: "2rem",
								xl: "2rem",
							},
						}}
					>
						BIENVENIDO AL MÓDULO DE VERIFICACIÓN
					</Typography>
                    <Stack 
                    direction={{
                        xl: "row",
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "column",
                    }}
                    spacing={{
                        xl: 10,
                        lg: 10,
                        md: 7,
                        sm: 4,
                        xs: 4,
                    }}
                    justifyContent="center"
                    alignItems="center"
                    >	
                        <Card 
                        onClick={plantilla1}
                        sx={{ 
                            maxWidth: {
                                xl: 350,
                                lg: 350,
                                md: 350,
                                sm: 350,
                                xs: 400,
                            },
                            maxHeight: {
                                xl: 400,
                                lg: 400,
                                md: 400,
                                sm: 400,
                                xs: 415,
                            },
                            boxShadow: 4,
                            "&:hover": {
                                boxShadow: "9px 10px 4px rgba(0.37, 0.37, 0.37, 0.37)",
                                transform: "translate(-3px, -3px)",
                                transition: "all 0.5s ease",
                            },
                             }}
                        >
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="240"
                                image="https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824144_960_720.png"
                                alt="Team"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        VERIFICAR VOTO INDIVIDUAL
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        Verificar el sentido de mi propio voto
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button 
                                    onClick={plantilla1}
                                    sx={{
                                        backgroundColor: "#511079",
                                        color: "#fff",
                                        fontSize: {
                                            xl: "0.9rem",
                                            lg: "0.9rem",
                                            sm: "0.9rem",
                                            xs: "0.9rem",
                                        },
                                        textAlign: "center",
                                        width: "100%",
                                        height: "100%",
                                        "&:hover": {
                                            background: "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                                            color: "#FFFFFF",
                                        },
                                    }}>
                                    Verificar voto
                                </Button>
                            </CardActions>
                        </Card>

                        <Card 
                        onClick={plantilla2}
                        sx={{ maxWidth: {
                            xl: 350,
                            lg: 350,
                            md: 350,
                            sm: 350, 
                            xs: 350,
                        },
                            maxHeight: {
                                xl: 400,
                                lg: 400,
                                md: 400,
                                sm: 400,
                                xs: 415,
                            },
                            boxShadow: 4,
                            "&:hover": {
                                boxShadow: "9px 10px 4px rgba(0.37, 0.37, 0.37, 0.37)",
                                transform: "translate(-3px, -3px)",
                                transition: "all 0.5s ease",
                            },
                             }}
                        >
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                height="180"
                                image="https://cdn.pixabay.com/photo/2019/08/05/15/18/people-4386248_960_720.png"
                                alt="Team"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        VERIFICAR TODOS LOS VOTOS
                                    </Typography>
                                    <Typography variant="body1" color="text.primary">
                                        Verificar el sentido de todos los votos de las personas participantes
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Button 
                                onClick={plantilla2}
                                sx={{
									backgroundColor: "#511079",
									color: "#fff",
									fontSize: {
										xl: "0.9rem",
										lg: "0.9rem",
										sm: "0.9rem",
										xs: "0.9rem",
									},
									textAlign: "center",
                                    width: "100%",
                                    height: "100%",
									"&:hover": {
										background: "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                                        color: "#FFFFFF",
									},
								}}>
                                Verificar en grupo
                                </Button>
                            </CardActions>
                        </Card>
                    </Stack>    
				</Box>
			</Container>
		</Box>
	);
};
