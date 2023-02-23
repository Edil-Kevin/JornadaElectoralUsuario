import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	LinearProgress,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { onLoginWithEmailAndPassword } from "../../store/auth/authThunks";
import { PasswordTextField } from "../components/PasswordTextField";
const validationSchema = object({
	curp: string("").required("Este campo es requerido"),
	password: string("").required("Este campo es requerido"),
});

export const LoginVotacionPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = (values) => {
		// Todo: dispatch(iniciarSesionConEmail())
		dispatch(
			onLoginWithEmailAndPassword(values.curp, values.password, () =>
				navigate("/votacion/inicio")
			)
		);
		// **exito
	};

	return (
		<Box display="flex" height="100%" alignItems="center">
			<Container maxWidth="sm">
				<Box
					sx={{
						minHeight: "10rem",
						height: "auto",
						boxShadow: 1,
						backgroundColor: "#323232",
						borderRadius: { xs: "0.5rem", md: "1rem" },
						p: "2rem",
						l: "0.5rem",
						mr: "0.5rem",
					}}
				>
					<Typography
						variant="h5"
						color="base.main"
						display="flex"
						justifyContent="center"
						mb="2rem"
					>
						INICIAR SESIÓN
					</Typography>

					<Formik
						initialValues={{
							curp: "",
							password: "",
						}}
						validationSchema={validationSchema}
						onSubmit={(values) => {
							// console.log(values);
							handleSubmit(values);
						}}
					>
						{({ values, handleSubmit, errors, touched, handleChange }) => (
							<form onSubmit={handleSubmit}>
								<Typography
									variant="h6"
									color="base.main"
									display="flex"
									justifyContent="center"
									mb="1rem"
								>
									Curp
								</Typography>
								<TextField
									name="curp"
									value={values.curp}
									onChange={handleChange}
									fullWidth
									color="base"
									focused
									variant="outlined"
									label="Ingresa tu CURP"
									type="text"
									error={touched.curp && Boolean(errors.curp)}
									helperText={touched.curp && errors.curp}
									sx={{
										// position: "sticky",
										"& .MuiInputBase-input": {
											// position: "relative",
											// zIndex: 0,
											color: "white !important",
											// backgroundColor: "black !important",
										},
									}}
								></TextField>
								<Typography
									variant="h6"
									color="base.main"
									display="flex"
									justifyContent="center"
									mt="2rem"
									mb="1rem"
								>
									Contraseña
								</Typography>

								{/* <TextField
									name="password"
									value={values.password}
									onChange={handleChange}
									fullWidth
									color="base"
									focused
									variant="outlined"
									label="Ingresa tu contraseña"
									type="password"
									error={touched.password && Boolean(errors.password)}
									helperText={touched.password && errors.password}
									sx={{
										"& .MuiInputBase-input": {
											color: "white !important",
										},
									}}
								></TextField> */}
								<FormControl
									variant="outlined"
									focused
									fullWidth
									error={touched.password && Boolean(errors.password)}
									helperText={touched.password && errors.password}
								>
									<InputLabel htmlFor="outlined-adornment-password" color="base">
										Ingresa tu contraseña
									</InputLabel>
									<OutlinedInput
										fullWidth
										name="password"
										value={values.password}
										onChange={handleChange}
										color="base"
										sx={{
											"& .MuiInputBase-input": {
												color: "white !important",
											},
										}}
										type={showPassword ? "text" : "password"}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
													color="base"
												>
													{showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										}
										label="Ingresa tu contraseña"
									/>
								</FormControl>
								{errorMessage !== "" ? (
									<Box pt="2rem">
										<Alert severity="error">{errorMessage}</Alert>
									</Box>
								) : (
									<></>
								)}

								<Box textAlign={"center"} mt={"1rem"}>
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
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										pt: 4,
									}}
								>
									{status === "checking" ? (
										<></>
									) : (
										<Button
											color="error"
											variant="outlined"
											disabled={status === "checking" ? true : false}
										>
											Regresar
										</Button>
									)}

									<Box sx={{ flex: "1 1 auto" }} />

									<Button
										sx={{
											"&.Mui-disabled": {
												color: "#f8f7f3 !important",
												border: "1px solid #f8f7f3 !important",
											},
										}}
										color="baseButton"
										variant="outlined"
										type="submit"
										disabled={status === "checking" ? true : false}
										startIcon={
											status === "checking" ? (
												<CircularProgress color="base" />
											) : (
												""
											)
										}
									>
										{status === "checking" ? "Ingresando..." : "Ingresar"}
									</Button>
								</Box>
							</form>
						)}
					</Formik>
				</Box>
			</Container>
		</Box>
	);
};
