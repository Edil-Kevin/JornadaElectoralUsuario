import {
	Button,
	Divider,
	Grid,
	IconButton,
	LinearProgress,
	TextField,
	Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAddRespuesta, onSetPapeletaActual } from "../../store/votante/votanteSlice";
import {
	onEmitirRespuestaConsulta,
	onGetConsultasDeVotante,
} from "../../store/votante/votanteThunks";
import { CuadroRespuesta } from "../components/CuadroRespuesta";
export const Papeletas = () => {
	const { statusPeticion, consulta, papeletaActual, papeletas, respuestasPapeletas, status } =
		useSelector((state) => state.votante);
	const [noPapeleta, setNoPapeleta] = useState(0);
	const [respuesta, setRespuesta] = useState("");

	console.log("noPapeleta", noPapeleta + 1, "Length", papeletas.length);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	console.log("Respuesta: ", respuesta);

	const handleChange = (event) => {
		setRespuesta(event.target.value);
	};

	const handleSubmit = () => {
		// console.log("RESPUESTA GUARDADA", respuesta);
		dispatch(onAddRespuesta({ respuesta, noPapeleta }));
		if (noPapeleta + 1 === papeletas.length) {
			navigate("/votacion/respuestasPapeletas");
		} else {
			setRespuesta("");
			setNoPapeleta((n) => n + 1);
		}
	};

	const handleBack = () => {
		setNoPapeleta((n) => n - 1);
	};

	useEffect(() => {
		// dispatch(onGetBoletasDeVotante());
		if (status === "noVotando") {
			navigate("/votacion/inicio");
		}
	}, []);

	useEffect(() => {
		if (respuestasPapeletas[noPapeleta] !== undefined) {
			setRespuesta(respuestasPapeletas[noPapeleta]);
		}
	}, [noPapeleta]);

	useEffect(() => {
		if (papeletas.length !== 0) {
			console.log("ENTRA A DESPACHAR LA PAPELETA");
			dispatch(onSetPapeletaActual(noPapeleta));
		}
	}, [papeletas, noPapeleta]);

	if (statusPeticion === "checking") return <LinearProgress color="linearProgress" />;
	else
		return (
			<>
				<Box
					display={"flex"}
					sx={{
						height: "auto",
						flexGrow: 1,
						overflowY: { sx: "none", md: "auto" },
					}}
					mt="2rem"
					mb="2rem"
					zIndex={9998}
				>
					<Container maxWidth="md">
						<Box
							bgcolor="#423838"
							m={0}
							width="100%"
							height="auto"
							p={{ xs: "1rem", md: "2rem" }}
						>
							<Box bgcolor="base.main">
								<Box pb={1} display="flex" flexDirection="column" bgcolor="#423838">
									<Typography
										variant="h5"
										align="center"
										color="base.main"
										width="100%"
									>
										{/* PROCESO ELECTORAL ESTATAL 2022-2025 */}
										{consulta.nombre}
									</Typography>
								</Box>
								{/* <Box display="flex" justifyContent="center" mb="2rem">
								<Typography
									variant="h4"
									align="center"
									color="base.main"
									pl={{ xs: 2, md: 8 }}
									pr={{ xs: 2, md: 8 }}
									pb={1}
									sx={{ backgroundColor: "#423838" }}
								>
									GOBERNADOR
									{boletaActual.maxOpciones === 1 ? "GOBERNADOR" : "COMITÉ"}
								</Typography>
							</Box> */}
								<Grid container spacing={3} pb="2rem" pt="2rem">
									<Grid container item xs={12} md={7} display="flex">
										<Grid item xs={12} md={3}>
											<Typography
												variant="body1"
												color="initial"
												align="center"
											>
												Entidad Federativa
											</Typography>
										</Grid>
										<Grid item xs={12} md={9} px="1rem">
											<TextField
												fullWidth
												size="small"
												label="Entidad federativa"
												sx={{
													"& .MuiInputBase-input": {
														backgroundColor: "white !important",
													},
												}}
												value={consulta.entidad}
												disabled
											/>
										</Grid>
									</Grid>
									<Grid container item xs={12} md={5}>
										<Grid item xs={12} md={3} justifyContent="center">
											<Typography
												variant="body1"
												color="initial"
												align="center"
											>
												Distrito Electoral
											</Typography>
										</Grid>
										<Grid item xs={12} md={9} px="1rem">
											<TextField
												fullWidth
												size="small"
												// label="Distrito Electoral"
												sx={{
													"& .MuiInputBase-input": {
														backgroundColor: "white !important",
													},
												}}
												// defaultValue=""
												value={papeletaActual.distritoElectoral}
												disabled
											/>
										</Grid>
									</Grid>
									<Grid container item columns={21}>
										<Grid item xs={21} md={3} justifyContent="center">
											<Typography
												variant="body1"
												color="initial"
												align="center"
											>
												Municipio o Alcaldia
											</Typography>
										</Grid>
										<Grid item xs={21} md={18} px="1rem">
											<TextField
												fullWidth
												size="small"
												label="Municipio o Alcaldia"
												sx={{
													"& .MuiInputBase-input": {
														backgroundColor: "white !important",
													},
												}}
												value={papeletaActual.municipio}
												disabled
											/>
										</Grid>
									</Grid>
								</Grid>

								<Box
									// container
									// spacing={{ xs: 2, md: 3 }}
									pb="2rem"
									pl={"1rem"}
									pr={"1rem"}
								>
									<Box>
										<Divider />
										<Box display="flex" justifyContent="center" pt={2}>
											<Typography
												variant="body1"
												color="initial"
												align="center"
											>
												Marque la respuesta de su preferencia para la
												pregunta
											</Typography>
										</Box>
									</Box>

									<Box>
										<Box display="flex" pt="2rem">
											<Typography
												variant="h6"
												color="initial"
												textAlign="justify"
											>
												{papeletaActual.pregunta.descPregunta}
											</Typography>
										</Box>
									</Box>

									<Box pt="2rem">
										<Grid
											container
											spacing={2}
											columns={15}
											display="flex"
											justifyContent="center"
										>
											{papeletaActual.pregunta.subtipo ===
											"escalaDeLikert" ? (
												<>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"Totalmente en desacuerdo"}
															id={1}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"En desacuerdo"}
															id={2}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"Neutral"}
															id={3}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"De acuerdo"}
															id={4}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"Totalmente deacuerdo"}
															id={5}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
												</>
											) : papeletaActual.pregunta.subtipo ===
											  "2respuestas" ? (
												<>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"Si"}
															id={1}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"No"}
															id={2}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
												</>
											) : papeletaActual.pregunta.subtipo ===
											  "3respuestas" ? (
												<>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"En desacuerdo"}
															id={1}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"Neutral"}
															id={2}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={"De acuerdo"}
															id={3}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
												</>
											) : papeletaActual.pregunta.subtipo ===
											  "personalizado1" ? (
												<>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion1
															}
															id={1}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion2
															}
															id={2}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
												</>
											) : papeletaActual.pregunta.subtipo ===
											  "personalizado2" ? (
												<>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion1
															}
															id={1}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion2
															}
															id={2}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion3
															}
															id={3}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
												</>
											) : papeletaActual.pregunta.subtipo ===
											  "personalizado3" ? (
												<>
													{" "}
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion1
															}
															id={1}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion2
															}
															id={2}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion3
															}
															id={3}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion4
															}
															id={4}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
													<Grid item xs={12} md={3}>
														<CuadroRespuesta
															respuesta={
																papeletaActual.pregunta.opcion5
															}
															id={5}
															eleccion={respuesta}
															setEleccion={setRespuesta}
														/>
													</Grid>
												</>
											) : papeletaActual.pregunta.tipoRespuesta ===
											  "abierta" ? (
												<>
													<TextField
														name="respuestaAbierta"
														value={respuesta}
														onChange={handleChange}
														// fullWidth
														variant="outlined"
														label="Ingresa tu respuesta"
														type="text"
														error={respuesta === ""}
														helperText={
															respuesta === "" &&
															"Escribe una respuesta"
														}
														sx={{
															zIndex: 9999,
															width: "90%",
														}}
													></TextField>
												</>
											) : (
												<></>
											)}
										</Grid>
									</Box>
								</Box>
							</Box>
							<Box
								sx={{
									display: { xs: "flex", lg: "none" },
									flexDirection: "row",
									pt: 2,
								}}
							>
								{noPapeleta !== 0 && (
									<Button color="base" onClick={handleBack} variant="outlined">
										Regresar
									</Button>
								)}

								<Box sx={{ flex: "1 1 auto" }} />

								<Button
									color="base"
									onClick={handleSubmit}
									variant="contained"
									disabled={respuesta === ""}
								>
									{noPapeleta + 1 === papeletas.length ? "Terminar" : "Siguiente"}
								</Button>
							</Box>
						</Box>
					</Container>
				</Box>
				<Box
					display={{ xs: "none", lg: "flex" }}
					width="100%"
					height="100%"
					// flexDirection="column"
					justifyContent="right"
					alignContent="center"
					alignItems="center"
					justifyItems="center"
					pr="5%"
					pt="4rem"
					position="absolute"
				>
					<Box sx={{ zIndex: 9999 }}>
						{respuesta !== "" && (
							<IconButton
								sx={{ display: "flex", flexDirection: "column" }}
								onClick={handleSubmit}
								disabled={respuesta === ""}
							>
								{noPapeleta + 1 === papeletas.length ? (
									<>
										<CheckCircleOutlineOutlinedIcon
											sx={{
												color: "#388452",
												height: {
													xs: "7rem",
													sm: "8rem",
													md: "8rem",
													lg: "8rem",
													xl: "8rem",
												},
												width: "auto",
											}}
										/>
										<Typography variant="body1" color="initial">
											Terminar
										</Typography>
									</>
								) : (
									<>
										<ArrowCircleRightOutlinedIcon
											sx={{
												height: {
													xs: "7rem",
													sm: "8rem",
													md: "8rem",
													lg: "8rem",
													xl: "8rem",
												},
												width: "auto",
											}}
										/>
										<Typography variant="body1" color="initial">
											Siguiente
										</Typography>
									</>
								)}
							</IconButton>
						)}
					</Box>
				</Box>

				{noPapeleta !== 0 && (
					<Box
						display={{ xs: "none", lg: "flex" }}
						width="100%"
						height="100%"
						// flexDirection="column"
						justifyContent="left"
						alignContent="center"
						alignItems="center"
						justifyItems="center"
						pl="5%"
						pt="4rem"
						position="absolute"
					>
						<Box sx={{ zIndex: 9999 }}>
							<IconButton
								sx={{ display: "flex", flexDirection: "column" }}
								onClick={handleBack}
							>
								<ArrowCircleLeftOutlinedIcon
									sx={{
										height: {
											xs: "7rem",
											sm: "8rem",
											md: "8rem",
											lg: "8rem",
											xl: "8rem",
										},
										width: "auto",
									}}
								/>
								<Typography variant="body1" color="initial">
									Regresar
								</Typography>
							</IconButton>
						</Box>
					</Box>
				)}
			</>
		);
};
