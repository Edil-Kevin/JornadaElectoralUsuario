import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, Divider, Grid, IconButton, LinearProgress, TextField } from "@mui/material";
import { TarjetaRepresentante } from "../components/TarjetaRepresentante";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { TarjetaCandidaturaNoRegistrada } from "../components/TarjetaCandidaturaNoRegistrada";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onGetBoletasDeVotante } from "../../store/votante/votanteThunks";
import {
	onAddCandidaturaNoRegistrada,
	onAddVoto,
	onSetBoletaActual,
} from "../../store/votante/votanteSlice";
import { VotoNulo } from "../components/VotoNulo";

export const EditarBoleta = () => {
	const { statusPeticion, boletaActual, votos, jornadaActual, status } = useSelector(
		(state) => state.votante
	);
	const params = useParams();
	// const [noBoleta, setNoBoleta] = useState(params.noBoleta + 1);
	const [candidaturaNoRegistrada, setCandidaturaNoRegistrada] = useState("");
	const [seleccionados, setSeleccionados] = useState([]);
	const [esNulo, setEsNulo] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === "noVotando") {
			navigate("/votacion/inicio");
		}
	}, []);

	console.log("SELECCIONADOS", seleccionados);

	const handleSubmit = () => {
		if (seleccionados.includes(100)) {
			console.log("HACE EL REGISTRO DE LA CANDIDATURA");
			dispatch(
				onAddCandidaturaNoRegistrada({
					candidaturaNoRegistrada,
					noBoleta: parseInt(parseInt(params.noBoleta) + 1, 10),
				})
			);
		}
		dispatch(onAddVoto({ seleccionados, noBoleta: parseInt(params.noBoleta, 10) + 1 }));
		navigate("/votacion/votosRegistrados");
	};

	const handleChange = (event) => {
		setCandidaturaNoRegistrada(event.target.value);
	};

	useEffect(() => {
		console.log("VOTOOOOS", params.noBoleta);
		if (votos[params.noBoleta] !== undefined) {
			setSeleccionados(votos[params.noBoleta]);
		}
	}, []);

	useEffect(() => {
		let partidos = [];
		if (jornadaActual.tipoJornada === "JornadaFormal") {
			if (seleccionados.length === 0) {
			} else {
				partidos = seleccionados.map((idPartido, indesBoleta) => {
					if (idPartido === 100)
						return {
							clavePartido: "CANORE",
							idCandidato: 99998,
						};
					else if (idPartido === 200)
						return {
							clavePartido: "NULO",
							idCandidato: 99999,
						};
					else {
						const index = boletaActual.candidatos.findIndex((i) => i.id === idPartido);
						return {
							claveCoalicion: boletaActual.candidatos[index].claveCoalicion,
							clavePartido: boletaActual.candidatos[index].clavePartido,
							idCandidato: boletaActual.candidatos[index].idCandidato,
						};
					}
				});
			}

			console.log("Cambia");
			const esNuloVer = verificarCoalicionesPreEnvio(partidos);

			console.log("ES NULO FINAL?", esNuloVer);

			setEsNulo(esNuloVer);
		} else {
			if (seleccionados.length === 0) {
			} else {
				const partidos = seleccionados.map((idPartido) => {
					if (idPartido === 100)
						return {
							idCandAso: "CANORE",
							modalidad:
								boletaActual.modalidad === "REPRESENTANTE"
									? 1
									: boletaActual.modalidad === "COMITE"
									? 2
									: 3,
							// nombreCandidato: candidaturaNoRegistrada[indexBoleta],
						};
					else if (idPartido === 200)
						return {
							idCandAso: "NULO",
							modalidad:
								boletaActual.modalidad === "REPRESENTANTE"
									? 1
									: boletaActual.modalidad === "COMITE"
									? 2
									: 3,
						};
					else {
						return {
							idCandAso: idPartido,
							modalidad:
								boletaActual.modalidad === "REPRESENTANTE"
									? 1
									: boletaActual.modalidad === "COMITE"
									? 2
									: 3,
						};
					}
				});
				console.log("PARTIDOS PLANILLAS", partidos);
				const esNuloFinal = verificarAsociacionesPreEnvio(partidos, boletaActual.modalidad);
				console.log("ES NULO?", esNuloFinal);
				const x = esNuloFinal;
				setEsNulo(x);
			}
		}
	}, [seleccionados]);

	const verificarAsociacionesPreEnvio = (partidos, modalidad) => {
		const nuevos = [];
		const array = [];
		let final = false;
		console.log("PARTIDOS QUE LLEGAN", partidos, modalidad);
		if (modalidad !== "PLANILLA") return false;
		else {
			console.log("entra primer else");
			if (partidos[0].idCandAso === "CANORE") {
				return false;
			}
			if (partidos[0].idCandAso === "NULO") {
				return false;
			}
			// const idBoleta = boletaActual.idEstructuraBoleta;

			// const boletaCurrent = boletas.find((boleta) => boleta.idEstructuraBoleta === idBoleta);

			const planillaCurrent = boletaActual.candidatos.find(
				(planilla) => planilla.id === partidos[0].idCandAso
			);

			const candidatosId = planillaCurrent.candidatos.map((candidato) => candidato.id);

			partidos.every((seleccion, indexSeleccion) => {
				const planillaAComparar = boletaActual.candidatos.find(
					(planilla) => planilla.id === seleccion.idCandAso
				);

				const candidatosAComparar = planillaAComparar.candidatos.map(
					(candidato) => candidato.id
				);

				console.log(`candidatosAComparar`, candidatosAComparar);

				let nulo = false;
				candidatosId.every((candidato) => {
					const result = candidatosAComparar.some((candidatoX) => {
						return candidatoX == candidato;
					});

					if (result) {
						// array[index] = false;
						nulo = true;
					} else {
						// array[index] = true;
						// return false;
						nulo = false;
					}
				});
				// console.log("nulooooo", nulo);
				final = nulo;
				return nulo;
			});
			// console.log("FINAL?", final);
			return !final;
		}
		// setCoalicionInvalida(array);
	};

	const verificarCoalicionesPreEnvio = (partidos) => {
		const nuevos = [];
		const array = [];
		console.log("Partidos", partidos);
		if (partidos.length === 0) return false;
		const numero = partidos[0].claveCoalicion;
		let nulo = partidos.some((partido) => {
			// if (voto.partidos.length > 1) return partido.claveCoalicion === "SinCoalicion";
			// if (partido.claveCoalicion === "SinCoalicion")
			return partido.claveCoalicion !== numero;
		});
		return nulo;
	};

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
										variant="h6"
										align="center"
										color="base.main"
										width="100%"
									>
										{/* PROCESO ELECTORAL ESTATAL 2022-2025 */}
										{boletaActual.encabezado}
									</Typography>
								</Box>
								<Box display="flex" justifyContent="center" mb="2rem">
									<Typography
										variant="h4"
										align="center"
										color="base.main"
										pl={{ xs: 2, md: 8 }}
										pr={{ xs: 2, md: 8 }}
										pb={1}
										sx={{ backgroundColor: "#423838" }}
									>
										{/* GOBERNADOR */}
										{jornadaActual?.tipoJornada !== "JornadaNoFormal"
											? ""
											: boletaActual.modalidad === "REPRESENTANTE"
											? "REPRESENTANTE"
											: boletaActual.modalidad === "COMITE"
											? "COMITÉ"
											: "PLANILLA"}
									</Typography>
								</Box>
								<Grid container spacing={3} pb="2rem">
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
												label="Entidad federativa"
												sx={{
													"& .MuiInputBase-input": {
														backgroundColor: "white !important",
													},
												}}
												defaultValue={boletaActual.entidad}
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
												label="Distrito Electoral"
												sx={{
													"& .MuiInputBase-input": {
														backgroundColor: "white !important",
													},
												}}
												defaultValue={boletaActual.distritoElectoral}
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
												label="Municipio o Alcaldia"
												sx={{
													"& .MuiInputBase-input": {
														backgroundColor: "white !important",
													},
												}}
												defaultValue={boletaActual.municipio}
												disabled
											/>
										</Grid>
									</Grid>
								</Grid>

								{jornadaActual?.tipoJornada === "JornadaNoFormal" && (
									<Box>
										<Box display="flex" justifyContent="center" pb="1rem">
											<Typography
												variant="body1"
												color="initial"
												align="center"
											>
												{boletaActual.modalidad === "COMITE"
													? `Seleccione ${boletaActual.maxOpciones} opciones`
													: boletaActual.modalidad === "REPRESENTANTE"
													? "Seleccione una opción"
													: "Seleccione las planillas por las que desea votar"}
											</Typography>
										</Box>
										<Divider />
									</Box>
								)}
								<Box
									sx={{ display: { xs: "none", lg: "flex" } }}
									justifyContent="center"
								>
									<Typography variant="body1" color="error" align="center">
										{esNulo
											? "Tu selección dará como resultado voto nulo por coalición invalida"
											: ""}
									</Typography>
								</Box>

								<Grid
									container
									spacing={{ xs: 2, md: 3 }}
									pb="2rem"
									pl={"1rem"}
									pr={"1rem"}
								>
									{boletaActual.candidatos.map((representante, index) => {
										return (
											<Grid
												item
												xs={12}
												sm={6}
												display="flex"
												key={representante.id}
												justifyContent="center"
											>
												<TarjetaRepresentante
													id={representante.id}
													nombre={representante.nombre}
													nombrePartido={representante.nombrePartido}
													clavePartido={representante.clavePartido}
													nombreSuplente={representante.nombreSuplente}
													logo={representante.logo}
													seleccionados={seleccionados}
													setSeleccionados={setSeleccionados}
													max={boletaActual.maxOpciones}
													tipoJornada={jornadaActual.tipoJornada}
													tipoBoletaActual={boletaActual.modalidad}
													candidatos={representante.candidatos}
												/>
											</Grid>
										);
									})}

									{boletaActual.candidaturaNoRegistrada && (
										<Grid
											item
											xs={12}
											sm={6}
											display="flex"
											justifyContent="center"
										>
											<TarjetaCandidaturaNoRegistrada
												id={100}
												seleccionados={seleccionados}
												setSeleccionados={setSeleccionados}
												max={boletaActual.maxOpciones}
												handleChange={handleChange}
												candidaturaNoRegistrada={candidaturaNoRegistrada}
												setCandidaturaNoRegistrada={
													setCandidaturaNoRegistrada
												}
												noBoleta={parseInt(params.noBoleta, 10)}
											/>
										</Grid>
									)}

									{boletaActual.votoNulo && (
										<Grid
											item
											xs={12}
											sm={6}
											display="flex"
											justifyContent="center"
										>
											<VotoNulo
												id={200}
												seleccionados={seleccionados}
												setSeleccionados={setSeleccionados}
												max={boletaActual.maxOpciones}
												// noBoleta={noBoleta}
											/>
										</Grid>
									)}
								</Grid>
								<Box
									display="flex"
									pb={2}
									sx={{ display: { xs: "flex", lg: "none" } }}
								>
									<Typography variant="body2" color="error" align="center">
										{esNulo
											? "Tu selección dará como resultado voto nulo por coalición invalida"
											: ""}
									</Typography>
								</Box>
							</Box>
							<Box
								sx={{
									display: { xs: "flex", lg: "none" },
									flexDirection: "row",
									pt: 2,
								}}
							>
								<Box sx={{ flex: "1 1 auto" }} />

								{/* <Button
									color="base"
									onClick={handleSubmit}
									variant="contained"
									disabled={!(seleccionados.length >= boletaActual.minOpciones)}
								>
									Terminar
								</Button> */}
								{seleccionados.includes(200) ? (
									<Button color="base" onClick={handleSubmit} variant="contained">
										Terminar
									</Button>
								) : (
									<Button
										color="base"
										onClick={handleSubmit}
										variant="contained"
										disabled={
											!(seleccionados.length >= boletaActual.minOpciones) ||
											(seleccionados.includes(100) &&
												candidaturaNoRegistrada === "")
										}
									>
										Terminar
									</Button>
								)}
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
						{seleccionados.length >= boletaActual.minOpciones && (
							<IconButton
								sx={{ display: "flex", flexDirection: "column" }}
								onClick={handleSubmit}
								color={
									seleccionados.includes(100) && candidaturaNoRegistrada === ""
										? "#f0f0f0"
										: "#388452"
								}
								disabled={
									!(seleccionados.length >= boletaActual.minOpciones) ||
									(seleccionados.includes(100) && candidaturaNoRegistrada === "")
								}
							>
								<>
									<CheckCircleOutlineOutlinedIcon
										sx={{
											// color: "#388452",
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
							</IconButton>
						)}
					</Box>
				</Box>
			</>
		);
};
