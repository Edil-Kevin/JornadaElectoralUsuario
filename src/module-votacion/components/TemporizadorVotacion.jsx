import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { onDeleteJornadaFormal, onNoVotando } from "../../store/votante/votanteSlice";
import {
	tiempoAgotadoJornada,
	tiempoAgotadoJornadaEnVotacion,
} from "../../store/votante/votanteThunks";

export const TemporizadorVotacion = ({
	tiempoVoto,
	horaComienzoVotacion,
	time,
	idProceso,
	tipoJornada,
	curp,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			// dispatch(tiempoAgotadoJornada(idProceso, curp));
			dispatch(onNoVotando());
			if (tipoJornada === "JornadaFormal") dispatch(onDeleteJornadaFormal());
			// else if (tipoJornada === "JornadaNoFormal") dispatch(onDeleteJornadaNoFormal());
			// else (tipoJornada === "ConsultaCiudadana") dispatch(onDeleteConsultaCiudadana());
			dispatch(
				tiempoAgotadoJornadaEnVotacion(idProceso, curp, () => navigate("/votacion/inicio"))
			);
		},
	});

	return (
		<Box>
			{isRunning ? (
				<Typography
					pl={{ xs: "1rem", md: "2rem" }}
					display="flex"
					// flexDirection="column"
					height="100%"
					variant="subtitle1"
					color="base.main"
					justifyContent="center"
					alignContent="center"
					alignItems="center"
				>
					{days > 0 ? `${days}:` : ""}
					{hours > 0 && hours < 10 ? `0${hours}:` : hours > 10 ? `${hours}:` : ""}
					{minutes > 0 && minutes < 10
						? `0${minutes}:`
						: minutes > 10
						? `${minutes}:`
						: ""}
					{/* {seconds > 0 && minutes === 0 ? `${minutes + 1} minuto ` : ""} */}
					{seconds >= 0 && seconds < 10
						? `0${seconds}`
						: seconds > 10
						? `${seconds}`
						: ""}
				</Typography>
			) : (
				""
			)}
		</Box>
	);
};
