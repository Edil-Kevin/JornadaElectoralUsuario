import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	onGetDataVotantePassword,
	onReenviarTokenEmail,
	onRegistrarUsuario,
} from "../../store/password/passwordThunks";

const validationSchema = object({
	email: string("").required("Este campo es requerido"),
	curp: string().required("El correo electrónico no coincide"),
});

export const RestablecerContrasenia = () => {
	const navigate = useNavigate();
	const params = useParams();
	const dispatch = useDispatch();
	const { curp, email, status } = useSelector((state) => state.password);

	const handleSubmit = (values) => {
		console.log("ME ENVIOOOOOOOOOOO", values);
		dispatch(
			onReenviarTokenEmail(values.email, values.curp, () => navigate("/auth/succesToken"))
		);
	};

	return (
		<Box display="flex" height="100%" alignItems="center">
			<Container
				maxWidth="lg"
				sx={{
					minHeight: "10rem",
					height: "auto",
					boxShadow: 1,
					backgroundColor: "#323232",
					borderRadius: { xs: "0.5rem", md: "1rem" },
					p: "2rem",
					// pl: "2rem",
				}}
			>
				<Box>
					{status === "checking" ? (
						<Box
							height="100%"
							sx={{
								display: "flex",
								justifyContent: "center",
								alignContent: "center",
							}}
						>
							<CircularProgress size={80} color="base" />
						</Box>
					) : (
						<>
							{" "}
							<Typography
								variant="h5"
								color="base.main"
								display="flex"
								justifyContent="center"
								mb="2rem"
							>
								Restablecer contraseña
							</Typography>
							<Typography
								variant="caption"
								color="#f0f0f0"
								display="flex"
								justifyContent="center"
								align="center"
								mb="2rem"
							>
								Ingresa los siguientes datos para que podamos enviarte un enlace a
								tu correo y puedas restablecer tu contraseña.
							</Typography>
							<Formik
								initialValues={{
									email: "",
									curp: "",
								}}
								validationSchema={validationSchema}
								onSubmit={(values) => {
									// console.log(values);
									handleSubmit(values);
								}}
							>
								{({ values, handleSubmit, errors, touched, handleChange }) => (
									<form onSubmit={handleSubmit}>
										<TextField
											name="email"
											value={values.email}
											onChange={handleChange}
											fullWidth
											color="base"
											focused
											variant="outlined"
											label="Ingresa tu correo electrónico"
											type="email"
											error={touched.email && Boolean(errors.email)}
											helperText={touched.email && errors.email}
											sx={{
												"& .MuiInputBase-input": {
													color: "white !important",
												},
											}}
										></TextField>
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
												marginTop: "2rem",
												"& .MuiInputBase-input": {
													color: "white !important",
												},
											}}
										></TextField>

										<Box
											sx={{
												display: "flex",
												flexDirection: "row",
												pt: 2,
											}}
										>
											{/* <Button color="base">Regresar</Button> */}

											<Box sx={{ flex: "1 1 auto" }} />

											<Button color="base" type="submit">
												Confirmar
											</Button>
										</Box>
									</form>
								)}
							</Formik>
						</>
					)}
				</Box>
			</Container>
		</Box>
	);
};
