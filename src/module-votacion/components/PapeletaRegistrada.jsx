import { Box, IconButton, Typography } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import React from "react";
import { onSetBoletaActual, onSetPapeletaActual } from "../../store/votante/votanteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const escalaDeLikertRespuestas = {
	1: "Totalmente en desacuerdo",
	2: "En desacuerdo",
	3: "Neutral",
	4: "De acuerdo",
	5: "Totalmente de acuerdo",
};

const tresOpcionesRespuestas = { 1: "En desacuerdo", 2: "Neutral", 3: "De acuerdo" };

const dosOpcionesRespuestas = { 1: "Si", 2: "No" };

export const PapeletaRegistrada = ({ respuesta, papeleta, noPapeleta }) => {
	console.log("NOPAPELETA", noPapeleta);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let numeroResp = Number.parseInt(respuesta, 10);

	const personalizado1Resp = {
		1: papeleta.pregunta.opcion1,
		2: papeleta.pregunta.opcion2,
	};

	const personalizado2Resp = {
		1: papeleta.pregunta.opcion1,
		2: papeleta.pregunta.opcion2,
		3: papeleta.pregunta.opcion3,
	};

	const personalizado3Resp = {
		1: papeleta.pregunta.opcion1,
		2: papeleta.pregunta.opcion2,
		3: papeleta.pregunta.opcion3,
		4: papeleta.pregunta.opcion4,
		5: papeleta.pregunta.opcion5,
	};

	const handleEdit = () => {
		console.log("DA CLICK", noPapeleta);
		dispatch(onSetPapeletaActual(noPapeleta));
		navigate("/votacion/editarPapeleta/" + noPapeleta);
	};
	return (
		<Box
			width="100%"
			// height="auto"
			borderRadius="1rem"
			bgcolor="#323232"
			mb="2rem"
			// sx={{ overflowY: "auto", margin: "auto" }}
		>
			<Box p="1rem" width="100%" display="flex" flexDirection="column">
				<Box width="100%" display="flex" pl={{ xs: "0.5rem", md: "1rem" }}>
					<Box display="flex" flexDirection="column" flexGrow={3}>
						<Typography
							variant="body2"
							color="base.main"
							width="100%"
							align="center"
							gutterBottom
						>
							{papeleta.pregunta.descPregunta}
						</Typography>
						<Box
							bgcolor="base.main"
							borderRadius="1rem"
							p="1rem"
							align="center"
							sx={{
								width: "100%",
								wordBreak: "break-word",
							}}
						>
							<Typography
								sx={{
									fontSize: { xs: 12, md: 18 },
								}}
								color="initial"
								gutterBottom
							>
								{/* {papeleta.pregunta.tipoRespuesta === "abierta"
									? respuesta
									: papeleta.pregunta.subtipo === "escalaDeLikert"
									? escalaDeLikertRespuestas[respuesta]
									: papeleta.pregunta.subtipo === "2respuestas"
									? dosOpcionesRespuestas[respuesta]
									: papeleta.pregunta.subtipo === "3respuestas"
									? tresOpcionesRespuestas[respuesta]
									: papeleta.pregunta.subtipo === "personalizado1"
									? personalizado1Resp[respuesta]
									: papeleta.pregunta.subtipo === "personalizado2"
									? personalizado2Resp[respuesta]
									: papeleta.pregunta.subtipo === "personalizado3"
									? personalizado3Resp[respuesta]
									: " "} */}
								{respuesta}
								{/* {numeroResp} */}
							</Typography>
						</Box>
					</Box>
					<Box
						display="flex"
						flexGrow={1}
						// px="1rem"
						pl="1rem"
						justifyContent="center"
						alignContent="center"
						alignItems="center"
					>
						<Box>
							<IconButton
								onClick={handleEdit}
								sx={{
									backgroundColor: "base.main",
									":hover": {
										backgroundColor: "base.main",
									},
								}}
							>
								<ModeEditOutlineOutlinedIcon />
							</IconButton>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
