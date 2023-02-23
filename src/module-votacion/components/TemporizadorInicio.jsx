import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";

export const TemporizadorInicio = ({
	fechaInicio,
	fechaFin,
	setStatusBoton,
	statusBoton,
	boton,
}) => {
	// console.log("TIPO DE BOTON INICIO", boton);
	// const time = new Date();
	const time = new Date(fechaInicio);
	// time.setSeconds(time.getSeconds() + 5);
	const { seconds, minutes, hours, days, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp: time,
		onExpire: () => {
			setStatusBoton({ ...statusBoton, [boton]: "activado" });
			console.log("ha expirado");
		},
	});
	useEffect(() => {
		let fechaLocal1 = new Date(Date.now());
		let fechaInicio1 = new Date(fechaInicio);

		if (fechaInicio1 - fechaLocal1 < 0) setStatusBoton({ ...statusBoton, [boton]: "activado" });
		else {
			console.log("ENTRA EN ESPERA");
			setStatusBoton({ ...statusBoton, [boton]: "en espera" });
		}

		// console.log("DIFERENCIA", fechaInicio - fechaLocal);
	}, []);

	return (
		<Box>
			{isRunning ? (
				<Typography
					variant="body2"
					color="error"
					display="flex"
					justifyContent="center"
					align="center"
					mb="1rem"
				>
					Comienza en {days > 0 ? `${days} dias ` : ""}
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
