import { Box, Button, Step, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLoginWithEmailAndPassword } from "../../store/auth/authThunks";

const steps = ["PASO 1: Establece tu contraseña", "PASO 2: Ingresa al módulo de votación"];

const validationSchema = object({
	curp: string("").required("Este campo es requerido"),
	contrasenia: string("").required("Este campo es requerido"),
});

export const PasosPage = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isStepOptional = (step) => {
		return step === 1;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = (values) => {
		console.log("VALORES", values);
		dispatch(
			onLoginWithEmailAndPassword(values.curp, values.contrasenia, () =>
				navigate("/votacion/inicio")
			)
		);
	};

	return (
		<Box pt="3rem">
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
						mb="2rem"
						align="center"
						sx={{
							fontSize: {
								xs: "1.5rem",
								sm: "1rem",
								md: "1rem",
								lg: "2rem",
								xl: "2rem",
							},
						}}
					>
						INGRESA AL MÓDULO DE VOTACIÓN
					</Typography>
					<Stepper activeStep={activeStep}>
						{steps.map((label, index) => {
							const stepProps = {};
							const labelProps = {};

							if (isStepSkipped(index)) {
								stepProps.completed = false;
							}
							return (
								<Step key={label} {...stepProps}>
									<StepLabel {...labelProps}>{label}</StepLabel>
								</Step>
							);
						})}
					</Stepper>

					<React.Fragment>
						{activeStep === 0 ? (
							<Box p={{ xs: "1rem", md: "2rem" }}>
								<Typography variant="body1" color="initial" align="justify">
									Para poder ingresar al módulo de votación y realizar tu voto o
									responder una consulta ciudadana, previamente debiste haber
									recibido un mensaje a tu correo electrónico con un enlace. Al
									dar click en este enlace, serás redireccionado a una pantalla en
									donde podrás establecer tu contraseña y acceder al módulo de
									votación en el siguiente paso. Si no recibiste el correo
									electrónico, puedes renviarlo dando click{" "}
									<Link to="/reenviarToken">aquí</Link>
								</Typography>
								<Typography
									variant="body1"
									color="initial"
									align="justify"
									mt="2rem"
								>
									Si ya has establecido tu contraseña, puedes ingresar al módulo
									de votación dando click en el botón "INGRESAR" que se encuentra
									en la parte superior derecha de la página, o bien puedes ir al
									siguiente paso e ingresar desde ahí
								</Typography>
								<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
									<Button
										color="inherit"
										disabled={activeStep === 0}
										onClick={handleBack}
										sx={{ mr: 1 }}
									>
										Regresar
									</Button>
									<Box sx={{ flex: "1 1 auto" }} />

									<Button onClick={handleNext}>Siguiente</Button>
								</Box>
							</Box>
						) : (
							<Box p={{ xs: "1rem", md: "2rem" }}>
								<Typography variant="body1" color="initial" align="justify">
									Si ya has establecido tu contraseña, rellena el siguiente
									formulario para ingresar.
								</Typography>

								<Box pt="2rem">
									<Formik
										initialValues={{
											curp: "",
											contrasenia: "",
										}}
										validationSchema={validationSchema}
										onSubmit={(values) => {
											handleSubmit(values);
										}}
									>
										{({
											values,
											handleSubmit,
											handleChange,
											errors,
											touched,
										}) => (
											<form onSubmit={handleSubmit}>
												<TextField
													name="curp"
													fullWidth
													size="small"
													// id={name}
													label="INGRESA TU CRUP"
													variant="filled"
													onChange={handleChange}
													value={values.curp}
													error={touched.curp && Boolean(errors.curp)}
													helperText={touched.curp && errors.curp}
												/>
												<TextField
													sx={{ marginTop: "2rem" }}
													name="contrasenia"
													fullWidth
													size="small"
													type="password"
													// id={name}
													label="INGRESA TU CONTRASEÑA"
													variant="filled"
													onChange={handleChange}
													value={values.contrasenia}
													error={
														touched.contrasenia &&
														Boolean(errors.contrasenia)
													}
													helperText={
														touched.contrasenia && errors.contrasenia
													}
												/>
												<Box
													sx={{ marginTop: "1rem" }}
													// display="flex"
													// justifyContent="right"
												>
													<Link color="base" to="/auth/restablecer">
														¿Olvidaste tu contraseña?
													</Link>
												</Box>

												{/* <Box>
													<Link color="base" to="/auth/restablecer">
														<Typography
															variant="body1"
															color="white"
															sx={{
																textDecoration: "underline white",
															}}
														>
															¿Olvidaste tu contraseña?
														</Typography>
													</Link>
												</Box> */}
												<Box
													sx={{
														display: "flex",
														flexDirection: "row",
														pt: 2,
													}}
												>
													<Button
														color="inherit"
														disabled={activeStep === 0}
														onClick={handleBack}
														sx={{ mr: 1 }}
													>
														Regresar
													</Button>
													<Box sx={{ flex: "1 1 auto" }} />

													<Button type="submit">
														{activeStep === 1
															? "Ingresar"
															: "Siguiente"}
													</Button>
												</Box>
											</form>
										)}
									</Formik>
								</Box>
							</Box>
						)}
					</React.Fragment>
				</Box>
			</Container>
		</Box>
	);
};
