import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { tiempoAgotadoJornada } from "../../store/votante/votanteThunks";

export const TemporizadorFin = ({
	fechaInicio,
	fechaFin,
	setStatusBoton,
	statusBoton,
	boton,
	idProceso,
	curp,
}) => {
	const dispatch = useDispatch();
	// const time = new Date();
	const time = new Date(fechaFin);
	// time.setSeconds(time.getSeconds() + 5);
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			setStatusBoton({ ...statusBoton, [boton]: "terminada" });
			dispatch(tiempoAgotadoJornada(idProceso, curp));
		},
	});
	useEffect(() => {
		let fechaLocal1 = new Date(Date.now());
		let fechaFin1 = new Date(time);

		if (fechaFin1 - fechaLocal1 < 0) {
			dispatch(tiempoAgotadoJornada(idProceso, curp));
			setStatusBoton({ ...statusBoton, [boton]: "terminada" });
		} else setStatusBoton({ ...statusBoton, [boton]: "activado" });

		// console.log("DIFERENCIA", fechaInicio - fechaLocal);
	}, []);

	return (
		<Box>
			{isRunning ? (
				<Typography
					variant="body2"
					color="#388452"
					display="flex"
					justifyContent="center"
					align="center"
					mb="1rem"
				>
					Termina en {days > 0 ? `${days} dias ` : ""}
					{hours > 0 ? `${hours} horas ` : ""}
					{minutes > 0 ? `${minutes} minutos ` : ""}
					{/* {seconds > 0 && minutes === 0 ? `${minutes + 1} minuto ` : ""} */}
					{seconds > 0 ? `${seconds} segundos ` : ""}
				</Typography>
			) : (
				""
			)}
		</Box>
	);
};
