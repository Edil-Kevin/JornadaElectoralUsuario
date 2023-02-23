import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Button, Container, Grid, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { VotoRegistrado } from "../components/VotoRegistrado";
import { ModalEmitirVotos } from "../components/ModalEmitirVotos";
import { PapeletaRegistrada } from "../components/PapeletaRegistrada";
import { onEmitirRespuestaConsulta } from "../../store/votante/votanteThunks";

export const RespuestasPapeletas = () => {
	const [modalStatus, setModalStatus] = useState(false);
	const { respuestasPapeletas, papeletas, jornadaActual } = useSelector((state) => state.votante);
	const { username } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = () => {
		setModalStatus(true);
		console.log("RESPUESTAS PAPELETAS", respuestasPapeletas);

		let votosPapeletas = [];

		papeletas.forEach((papeleta, index) => {
			votosPapeletas.push({
				boletaModel: {
					idJornada: jornadaActual.idJornada,
					nombreJornada: jornadaActual.nombreJornada,
					idPapeleta: papeleta.id,
					municipio: papeleta.municipio,
					distrito: papeleta.distritoElectoral,
				},
				sentidoModel: {
					idPregunta: papeleta.pregunta.idPregunta,
					respuesta: respuestasPapeletas[index].respuesta,
					noOpc: respuestasPapeletas[index].id,
				},
			});
		});

		console.log("ObjectVotosPapeletas", votosPapeletas);

		dispatch(
			onEmitirRespuestaConsulta(votosPapeletas, jornadaActual.idJornada, username, () =>
				navigate("/votacion/finalPapeletas")
			)
		);
	};
	return (
		<Box
			display="flex"
			height="100%"
			// alignItems="center"
			sx={{
				// height: "auto",
				flexGrow: 1,
				overflowY: { sx: "none", md: "auto" },
			}}
			pt="2rem"
			pb="2rem"
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						minHeight: "10rem",
						height: { xs: "auto", md: "100%" },
						boxShadow: 1,
						backgroundColor: "base.main",
						borderRadius: { xs: "0.5rem", md: "1rem" },
						p: { xs: "1rem", md: "2rem" },
						// overflowY: { xs: "unset", md: "hidden" },
					}}
				>
					<Box
						sx={{
							height: "100%",
							// overflowY: { xs: "unset", md: "hidden" },
						}}
						pb="3rem"
					>
						<Typography
							variant="h4"
							color="#323232"
							display="flex"
							justifyContent="center"
							mb="2rem"
							align="center"
						>
							Respuestas registradas
						</Typography>
						<Grid container spacing={3} height="100%">
							<Grid
								item
								xs={12}
								md={6}
								height="100%"
								width="100%"
								maxHeight="100%"
								sx={{ overflowY: "auto" }}
								display="flex"
								// flexDirection="column"
								justifyContent="center"
								alignContent="center"
							>
								<Box
									pt="1rem"
									width="100%"
									// display="flex"
									// height="100%"
									// maxHeight="100%"
									// flexDirection="column"
									// justifyContent="center"
									sx={{ margin: "auto" }}
								>
									{papeletas.map((papeleta, index) => {
										return (
											<PapeletaRegistrada
												// respuesta={respuestasPapeletas[index]}
												respuesta={respuestasPapeletas[index].respuesta}
												papeleta={papeleta}
												noPapeleta={index}
												key={papeleta.asunto}
											/>
										);
									})}
								</Box>
							</Grid>
							<Grid
								item
								xs={12}
								md={6}
								display="flex"
								flexDirection="column"
								justifyContent="center"
								alignContent="center"
								alignItems="center"
							>
								<Box width="50%">
									<Button
										variant="contained"
										size="large"
										color="darkButton"
										onClick={onSubmit}
										sx={{
											boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
											transition: "all 0.5s ease",
											// backgroundColor: "#543884",
											width: "100%",
											// borderRadius: "2rem 2rem 2rem 2rem",
											"&:hover": {
												// backgroundColor: "#7E328B !important",
												transform: "translate(-5px, -5px)",
												boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
											},
										}}
									>
										Emitir respuestas
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
			<ModalEmitirVotos modalStatus={modalStatus} />
		</Box>
	);
};
