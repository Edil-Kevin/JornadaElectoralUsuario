import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { object, string } from "yup";
import {
	onSetTokenSmsEnviadoFalse,
	onSetTokenSmsEnviadoTrue,
} from "../../store/votante/votanteSlice";
import { onComenzarVotacion, onEnviarTokenSms } from "../../store/votante/votanteThunks";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// width: "70rem",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	height: "auto",
};

const validationSchema = object({
	token: string("")
		.min(6, "El código debe tener un tamaño de 6 digitos")
		.max(6, "El código debe tener un tamaño máximo de 6 digitos")
		.required("Este campo es requerido"),
});

const tiempo = 120;

export const ModalTokenVotacion = ({ statusModal, handleCloseModal, isOnModalToken }) => {
	let time = new Date();
	time.setSeconds(time.getSeconds() + tiempo);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, errorMessage, tokenSmsEnviado, jornadaFormal } = useSelector(
		(state) => state.votante
	);
	const { username } = useSelector((state) => state.auth);
	const { seconds, minutes, isRunning, start, restart } = useTimer({
		expiryTimestamp: time,
	});

	const onCancel = () => {
		// setIsCerrada(false);
		// setQuestionsSelectedNull();
		handleCloseModal();
	};

	const reenviarToken = () => {
		dispatch(onEnviarTokenSms());
		console.log("TOKEN REENVIADO");
		dispatch(onSetTokenSmsEnviadoTrue());
		const time1 = new Date();
		time1.setSeconds(time1.getSeconds() + tiempo);
		restart(time1);
	};

	const handleSubmit = (values) => {
		dispatch(
			onComenzarVotacion(
				values.token,
				username,
				() => navigate("/votacion/boletas"),
				jornadaFormal
			)
		);
	};

	useEffect(() => {
		if (tokenSmsEnviado) {
			// restart(time);
			// start();
		}
	}, [tokenSmsEnviado]);

	useEffect(() => {
		if (isOnModalToken) {
			restart(time);
			start();
		}
	}, [isOnModalToken]);

	useEffect(() => {
		if (!isRunning) {
			dispatch(onSetTokenSmsEnviadoFalse());
		}
	}, [isRunning]);

	return (
		<Modal
			open={statusModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={{ zIndex: 9999 }}
		>
			<Container maxWidth="sm" sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						INGRESA TU CÓDIGO DE VERIFICACIÓN
					</Typography>
					<Box m={"2rem"}>
						<Typography variant="subtitle2" align="justify">
							El código de verificación es una pequeña secuencia de numeros que ha
							sido enviada como mensaje a tu teléfono. Para poder ingresar al módulo
							de votación, deberás copiar el código de verificación en el siguiente
							campo.
						</Typography>

						<Formik
							initialValues={{
								token: "",
							}}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								handleSubmit(values);
							}}
						>
							{({ values, handleSubmit, handleChange, errors, touched }) => (
								<form onSubmit={handleSubmit}>
									<TextField
										label="Código de verificación"
										name="token"
										onChange={handleChange}
										values={values.token}
										fullWidth
										// color="base"
										variant="outlined"
										type="text"
										error={touched.token && Boolean(errors.token)}
										helperText={touched.token && errors.token}
										sx={{ marginTop: "2rem" }}
									/>
									{errorMessage === "El código es incorrecto o ha caducado." ? (
										<Box pt={2}>
											<Alert severity="error">
												El código es incorrecto o ha caducado.
											</Alert>
										</Box>
									) : (
										<></>
									)}

									<Grid
										container
										pt={4}
										direction={{ xs: "column", md: "row-reverse" }}
									>
										<Grid item xs={12} md={5} pb={{ xs: "2rem", md: "0" }}>
											<Button
												color="darkButton"
												variant="outlined"
												type="submit"
												fullWidth
												sx={{
													"&.Mui-disabled": {
														color: "#f8f7f3 !important",
														border: "1px solid #f8f7f3 !important",
														flexGrow: "1",
													},
												}}
												disabled={status === "checking" ? true : false}
												startIcon={
													status === "checking" ? (
														<CircularProgress color="darkButton" />
													) : (
														""
													)
												}
											>
												{status === "checking" ? "" : "Ingresar"}
											</Button>
										</Grid>
										<Grid item xs={12} md={2}></Grid>

										<Grid item xs={12} md={5}>
											<Button
												fullWidth
												color="error"
												variant="outlined"
												disabled={
													status === "checking" || isRunning
														? true
														: false
												}
												sx={{ flexGrow: "1" }}
												onClick={reenviarToken}
											>
												{`Reenviar código`}
												{minutes > 0 && minutes < 10
													? ` 0${minutes}:`
													: minutes > 10
													? ` ${minutes}:`
													: ""}
												{seconds === 0 && seconds === 0
													? ""
													: seconds >= 0 && seconds < 10
													? ` 0${seconds}`
													: seconds > 10
													? ` ${seconds}`
													: ""}
											</Button>
										</Grid>
									</Grid>
									{/* </Box> */}
								</form>
							)}
						</Formik>
					</Box>
				</Box>
			</Container>
		</Modal>
	);
};
