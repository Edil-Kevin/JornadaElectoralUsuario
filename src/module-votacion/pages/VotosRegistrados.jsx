import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Button, Container, Grid, IconButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { ModalEmitirVotos } from "../components/ModalEmitirVotos";
import { useDispatch, useSelector } from "react-redux";
import { onEmitirVoto, onEmitirVotoNoFormal } from "../../store/votante/votanteThunks";
import { VotoRegistrado } from "../components/VotoRegistrado";

export const VotosRegistrados = () => {
	const [modalStatus, setModalStatus] = useState(false);
	const { votos, boletas, jornadaFormal, jornadaActual, status, candidaturaNoRegistrada } =
		useSelector((state) => state.votante);
	const { username } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [coalicionInvalida, setCoalicionInvalida] = useState([]);
	console.log("STATUS COALICIONES", coalicionInvalida);

	const onSubmit = () => {
		setModalStatus(true);

		if (jornadaActual.tipoJornada === "JornadaFormal") {
			const votosObject = votos.map((boleta, indexBoleta) => {
				const boletaCurrent = boletas[indexBoleta];
				const partidos = boleta.map((idPartido) => {
					if (idPartido === 100)
						return {
							clavePartido: "CANORE",
							idCandidato: 99998,
							nombrePartido: "Candidatura no registrada",
							nombreCandidato: candidaturaNoRegistrada[indexBoleta],
						};
					else if (idPartido === 200)
						return {
							clavePartido: "NULO",
							idCandidato: 99999,
							nombrePartido: "Voto nulo",
							nombreCandidato: "Voto nulo",
						};
					else {
						const index = boletaCurrent.candidatos.findIndex((i) => i.id === idPartido);
						// return boletaCurrent.candidatos[index];
						return {
							// idSeleccion: boletaCurrent.candidatos[index].id,
							claveCoalicion: boletaCurrent.candidatos[index].claveCoalicion,
							clavePartido: boletaCurrent.candidatos[index].clavePartido,
							idCandidato: boletaCurrent.candidatos[index].idCandidato,
							nombrePartido: boletaCurrent.candidatos[index].nombrePartido,
							nombreCandidato: boletaCurrent.candidatos[index].nombre,
						};
					}
				});
				return {
					boletaModel: {
						idJornada: jornadaActual.idJornada,
						nombreEleccion: boletaCurrent.encabezado,
						municipio: boletaCurrent.municipio,
						distrito: boletaCurrent.distritoElectoral,
						jornadaElectoral: boletaCurrent.jornadaElectoral,
						idEstructuraBoleta: boletaCurrent.idEstructuraBoleta,
					},
					partidos: partidos,
				};
			});

			const votosObjectCoaliciones = verificarCoaliciones(votosObject);

			// console.log("VOTOS CORREGIDOS FORMALES", JSON.stringify(votosObjectCoaliciones));
			console.log("VOTOS CORREGIDOS FORMALES", votosObjectCoaliciones);

			dispatch(
				onEmitirVoto(votosObjectCoaliciones, jornadaActual.idJornada, username, () =>
					navigate("/votacion/folios")
				)
			);
		} else if (jornadaActual.tipoJornada === "JornadaNoFormal") {
			const votosObject = votos.map((boleta, indexBoleta) => {
				const boletaCurrent = boletas[indexBoleta];
				const partidos = boleta.map((idPartido) => {
					if (idPartido === 100)
						return {
							idCandAso: "CANORE",
							nombreCandidato: candidaturaNoRegistrada[indexBoleta],
						};
					else if (idPartido === 200)
						return {
							idCandAso: "NULO",
							nombreCandidato: "Voto nulo",
						};
					else {
						const index = boletaCurrent.candidatos.findIndex((i) => i.id === idPartido);
						const nomCandidato = boletaCurrent.candidatos[index].nombre;
						const nomPlanilla = boletaCurrent.candidatos[index].nombrePartido;
						// console.log("Nombre partidooo")
						return {
							idCandAso: idPartido,
							nombreCandidato:
								boletaCurrent.modalidad === "PLANILLA" ? nomPlanilla : nomCandidato,
						};
					}
				});
				return {
					boletaModel: {
						idJornada: jornadaActual.idJornada,
						nombreJornada: jornadaActual.nombreJornada,
						idEstructuraBoleta: boletaCurrent.idEstructuraBoleta,
						modalidad:
							boletaCurrent.modalidad === "REPRESENTANTE"
								? 1
								: boletaCurrent.modalidad === "COMITE"
								? 2
								: 3,
					},
					selecciones: partidos,
				};
			});

			// console.log("VOTOS NO FORMALES", votosObject);

			const votosObjectCoaliciones = verificarAsociaciones(votosObject);

			console.log("VOTOS FINALESSSSSSS NO FORMALES CORREGIDOS", votosObjectCoaliciones);

			dispatch(
				onEmitirVotoNoFormal(
					votosObjectCoaliciones,
					jornadaActual.idJornada,
					username,
					() => navigate("/votacion/folios")
				)
			);
		}
	};

	useEffect(() => {
		if (status === "noVotando") {
			navigate("/votacion/inicio");
		}
	}, []);

	useEffect(() => {
		if (jornadaActual.tipoJornada === "JornadaFormal") {
			const votosObject = votos.map((boleta, indexBoleta) => {
				const boletaCurrent = boletas[indexBoleta];
				const partidos = boleta.map((idPartido) => {
					if (idPartido === 100)
						return {
							clavePartido: "CANORE",
							idCandidato: 99998,
							nombrePartido: "Candidatura no registrada",
							nombreCandidato: candidaturaNoRegistrada[indexBoleta],
						};
					else if (idPartido === 200)
						return {
							clavePartido: "NULO",
							nombrePartido: "Voto nulo",
							idCandidato: 99999,
							nombreCandidato: "Voto nulo",
						};
					else {
						const index = boletaCurrent.candidatos.findIndex((i) => i.id === idPartido);
						return {
							// idSeleccion: boletaCurrent.candidatos[index].id,
							claveCoalicion: boletaCurrent.candidatos[index].claveCoalicion,
							clavePartido: boletaCurrent.candidatos[index].clavePartido,
							idCandidato: boletaCurrent.candidatos[index].idCandidato,
							nombrePartido: boletaCurrent.candidatos[index].nombrePartido,
							nombreCandidato: boletaCurrent.candidatos[index].nombre,
						};
					}
				});
				return {
					boletaModel: {
						nombreEleccion: boletaCurrent.encabezado,
						municipio: boletaCurrent.municipio,
						distrito: boletaCurrent.distritoElectoral,
						jornadaElectoral: boletaCurrent.jornadaElectoral,
						idEstructuraBoleta: boletaCurrent.idEstructuraBoleta,
						// jornadaElectoral: boletaCurrent.jornadaElectoral,
					},
					partidos: partidos,
				};
			});

			verificarCoalicionesPreEnvio(votosObject);
		} else {
			const votosObject = votos.map((boleta, indexBoleta) => {
				const boletaCurrent = boletas[indexBoleta];
				const partidos = boleta.map((idPartido) => {
					if (idPartido === 100)
						return {
							idCandAso: "CANORE",
							nombreCandidato: candidaturaNoRegistrada[indexBoleta],
						};
					else if (idPartido === 200)
						return {
							idCandAso: "NULO",
						};
					else {
						return {
							idCandAso: idPartido,
						};
					}
				});
				return {
					boletaModel: {
						jornadaElectoral: jornadaActual.nombreJornada,
						idEstructuraBoleta: boletaCurrent.idEstructuraBoleta,
						modalidad:
							boletaCurrent.modalidad === "REPRESENTANTE"
								? 1
								: boletaCurrent.modalidad === "COMITE"
								? 2
								: 3,
					},
					selecciones: partidos,
				};
			});
			console.log("VOTOS OBJECT USEEFFECT", votosObject);
			verificarAsociacionesPreEnvio(votosObject);
		}
	}, []);

	const verificarCoalicionesPreEnvio = (votos) => {
		const nuevos = [];
		const array = [];
		votos.forEach((voto) => {
			console.log("VOTO INDIVIDUAL", voto);
			const numero = voto.partidos[0].claveCoalicion;
			let nulo = voto.partidos.some((partido) => {
				// if (voto.partidos.length > 1) return partido.claveCoalicion === "SinCoalicion";
				// if (partido.claveCoalicion === "SinCoalicion")
				return partido.claveCoalicion !== numero;
			});

			if (nulo) {
				array.push(true);
			} else {
				array.push(false);
			}
		});
		setCoalicionInvalida(array);
		return nuevos;
	};

	const verificarCoaliciones = (votos) => {
		const nuevos = [];
		votos.forEach((voto) => {
			console.log("VOTO INDIVIDUAL", voto);
			const numero = voto.partidos[0].claveCoalicion;
			let nulo = voto.partidos.some((partido) => {
				// if (voto.partidos.length === 1) return partido.claveCoalicion === "SinCoalicion";
				return partido.claveCoalicion !== numero;
			});

			if (nulo) {
				nuevos.push({
					boletaModel: voto.boletaModel,
					partidos: [
						{
							clavePartido: "NULO",
							idCandidato: 99999,
							nombreCandidato: "Voto nulo",
							nombrePartido: "Voto nulo",
						},
					],
					seleccion: {
						idCandidato: 99999,
						nombreCandidato: "Voto nulo",
					},
				});
			} else {
				nuevos.push({
					boletaModel: voto.boletaModel,
					partidos: voto.partidos,
					seleccion: {
						idCandidato: voto.partidos[0].idCandidato,
						nombreCandidato: voto.partidos[0].nombreCandidato,
					},
				});
			}
		});
		return nuevos;
	};

	const verificarAsociacionesPreEnvio = (votos) => {
		const nuevos = [];
		const array = [];
		votos.forEach((voto, index) => {
			if (voto.boletaModel.modalidad != 3) array.push(false);
			else {
				if (voto.selecciones[0].idCandAso === "CANORE") {
					array.push(false);
					return;
				}
				if (voto.selecciones[0].idCandAso === "NULO") {
					array.push(false);
					return;
				}
				console.log("VOTO QUE LLEGA CANORE", voto);
				const idBoleta = voto.boletaModel.idEstructuraBoleta;

				const boletaCurrent = boletas.find(
					(boleta) => boleta.idEstructuraBoleta === idBoleta
				);

				const planillaCurrent = boletaCurrent.candidatos.find(
					(planilla) => planilla.id === voto.selecciones[0].idCandAso
				);

				const candidatosId = planillaCurrent.candidatos.map((candidato) => candidato.id);

				voto.selecciones.every((seleccion, indexSeleccion) => {
					const planillaAComparar = boletaCurrent.candidatos.find(
						(planilla) => planilla.id === seleccion.idCandAso
					);

					const candidatosAComparar = planillaAComparar.candidatos.map(
						(candidato) => candidato.id
					);

					console.log(`candidatosAComparar ${indexSeleccion}`, candidatosAComparar);

					candidatosId.every((candidato) => {
						const result = candidatosAComparar.some((candidatoX) => {
							return candidatoX == candidato;
						});

						if (result) {
							array[index] = false;
						} else {
							array[index] = true;
							return false;
						}
					});

					return !array[index];
				});
			}
		});
		setCoalicionInvalida(array);
	};
	const verificarAsociaciones = (votos) => {
		const nuevos = [];
		const array = [];
		votos.forEach((voto, index) => {
			if (voto.boletaModel.modalidad !== 3) nuevos[index] = voto;
			else {
				if (voto.selecciones[0].idCandAso === "CANORE") {
					nuevos[index] = voto;
					return;
				}
				const idBoleta = voto.boletaModel.idEstructuraBoleta;

				const boletaCurrent = boletas.find(
					(boleta) => boleta.idEstructuraBoleta === idBoleta
				);

				const planillaCurrent = boletaCurrent.candidatos.find(
					(planilla) => planilla.id === voto.selecciones[0].idCandAso
				);

				const candidatosId = planillaCurrent.candidatos.map((candidato) => candidato.id);

				const combi2 =
					voto.selecciones.length === 1
						? voto.selecciones[0].idCandAso + ""
						: voto.selecciones.reduce((acc, cur, index, array) => {
								console.log("Valores", index, acc, cur);
								if (index === 1) return acc.idCandAso + "::" + cur.idCandAso;
								else return acc + "::" + cur.idCandAso;
						  });

				voto.selecciones.every((seleccion, indexSeleccion) => {
					const planillaAComparar = boletaCurrent.candidatos.find(
						(planilla) => planilla.id === seleccion.idCandAso
					);

					const candidatosAComparar = planillaAComparar.candidatos.map(
						(candidato) => candidato.id
					);

					console.log(`candidatosAComparar ${indexSeleccion}`, candidatosAComparar);

					candidatosId.every((candidato) => {
						const result = candidatosAComparar.some((candidatoX) => {
							return candidatoX == candidato;
						});

						if (result) {
							console.log("ENTRA A GUARDAR VALIDA");

							const ordenados = candidatosId.sort();
							const soloIds = ordenados.map((id) => {
								return id.charAt(0);
							});
							console.log("CANDIATOS QUE ID CREADOS", soloIds);
							const string1 =
								soloIds.length === 1
									? soloIds[0] + ""
									: soloIds.reduce((acc, cur) => acc + "::" + cur);

							nuevos[index] = {
								boletaModel: voto.boletaModel,
								selecciones: voto.selecciones,
								combinacionPersona: string1,
								combinacionPlanilla: combi2,
							};
							array[index] = false;
						} else {
							console.log("ENTRA A GUARDAR INVALIDA");
							(nuevos[index] = {
								boletaModel: voto.boletaModel,
								selecciones: [
									{
										// clavePartido: "NULO",
										// idCandAso: 99999,
										idCandAso: "NULO",
										nombreCandidato: "Voto nulo",
										// nombrePartido: "Voto nulo",
									},
								],
							}),
								(array[index] = true);
							return false;
						}
					});

					return !array[index];
				});
			}
		});

		return nuevos;
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
						>
							Votos registrados
						</Typography>
						<Grid container spacing={3} height="100%">
							<Grid
								item
								xs={12}
								md={6}
								height="100%"
								sx={{ overflowY: "auto" }}
								display="flex"
								flexDirection="column"
								// justifyContent="center"
							>
								<Box pt="0rem">
									{boletas.map((boleta, index) => {
										return (
											<VotoRegistrado
												voto={votos[index]}
												boleta={boleta}
												noBoleta={index}
												key={boleta.encabezado + index}
												coalicionInvalida={coalicionInvalida[index]}
												modalidadBoleta={boleta.modalidad}
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
										// color="darkButton"
										onClick={onSubmit}
										sx={{
											boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
											transition: "all 0.5s ease",
											backgroundColor: "#388452",
											width: "100%",
											minHeight: { xs: "8rem", md: "10rem" },
											fontSize: { xs: "1.3rem", md: "1.5rem" },
											fontWeight: "bold",
											// borderRadius: "2rem 2rem 2rem 2rem",
											"&:hover": {
												backgroundColor: "#52bf77 !important",
												transform: "translate(-5px, -5px)",
												boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
											},
										}}
									>
										Emitir votos
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

const f = [
	{
		boletaModel: {
			nombreEleccion: "GOBERNADOR DEL ESTADO DE OAXACA",
			municipio: "SANTA LUCIA DEL CAMINO",
			distrito: "33",
			jornadaElectoral: "JORNADA ELECTORAL 2022",
			idEstructuraBoleta: 2,
		},
		partidos: [
			{
				claveCoalicion: 92,
				clavePartido: "PRD-01",
				idCandidato: 9,
				nombrePartido: "PARTIDO REVOLUCIONARIO DEMOCRATA",
				nombreCandidato: "ALEJANDRO AVILES ALVAREZ",
			},
			{
				claveCoalicion: 92,
				clavePartido: "PRD-99",
				idCandidato: 9,
				nombrePartido: "PARTIDO REVOLUCIONARIO DEMOCRATA",
				nombreCandidato: "ALEJANDRO AVILES ALVAREZ",
			},
		],
		seleccion: { idCandidato: 9, nombreCandidato: "ALEJANDRO AVILES ALVAREZ" },
	},
	{
		boletaModel: {
			nombreEleccion: "PRESIDENTE MUNICIPAL DE LA CIUDAD DE OAXACA DE JUAREZ",
			municipio: "OAXACA DE JUAREZ",
			distrito: "1",
			jornadaElectoral: "JORNADA ELECTORAL 2022",
			idEstructuraBoleta: 108,
		},
		partidos: [
			{
				clavePartido: "CANORE",
				idCandidato: 99998,
				nombrePartido: "Candidatura no registrada",
				nombreCandidato: "Pepe",
			},
		],
		seleccion: { idCandidato: 99998, nombreCandidato: "Pepe" },
	},
];

const f1 = {
	boletaModel: {
		nombreEleccion: "GOBERNADOR DEL ESTADO DE OAXACA",
		municipio: "SANTA LUCIA DEL CAMINO",
		distrito: "33",
		jornadaElectoral: "JORNADA ELECTORAL 2022",
		idEstructuraBoleta: 2,
	},
	partidos: [
		{
			claveCoalicion: 92,
			clavePartido: "PRD-01",
			idCandidato: 9,
			nombrePartido: "PARTIDO REVOLUCIONARIO DEMOCRATA",
			nombreCandidato: "ALEJANDRO AVILES ALVAREZ",
		},
		{
			claveCoalicion: 92,
			clavePartido: "PRD-99",
			idCandidato: 9,
			nombrePartido: "PARTIDO REVOLUCIONARIO DEMOCRATA",
			nombreCandidato: "ALEJANDRO AVILES ALVAREZ",
		},
	],
	seleccion: { idCandidato: 9, nombreCandidato: "ALEJANDRO AVILES ALVAREZ" },
};

const f2 = {
	boletaModel: {
		nombreEleccion: "PRESIDENTE MUNICIPAL DE LA CIUDAD DE OAXACA DE JUAREZ",
		municipio: "OAXACA DE JUAREZ",
		distrito: "1",
		jornadaElectoral: "JORNADA ELECTORAL 2022",
		idEstructuraBoleta: 108,
	},
	partidos: [
		{
			clavePartido: "CANORE",
			idCandidato: 99998,
			nombrePartido: "Candidatura no registrada",
			nombreCandidato: "Pepe",
		},
	],
	seleccion: { idCandidato: 99998, nombreCandidato: "Pepe" },
};
