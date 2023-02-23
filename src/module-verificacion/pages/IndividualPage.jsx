import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { onError } from "../../store/verificacion-voto/verificacionSlice";
import { onGetValidarVoto } from "../../store/verificacion-voto/verificacionThunks";
const validationSchema = object({
	folio: string("").required("Este campo es requerido").matches(/^[a-zA-Z0-9-]+$/, "Solo se permiten números, letras y guiones")
});

export const IndividualPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { status, errorMessage } = useSelector((state) => state.verificacion);
	const [ error, setError ] = useState();
	useEffect(() => {
		setError(errorMessage);
	  }, [errorMessage]);
	  
	const onSubmit = (values) => {
	  dispatch(onGetValidarVoto(
		values.folio,
		() => {
		  navigate(`/verificacion/individual/${values.folio}/FoundFolio`);
		},
	  ));
	};
	// console.log(error);
	const onCancel = () => {
	  navigate("/verificacion");
	  dispatch(onError());
	};
  
	
	return (
		<Box pt="1.5rem">
			<Container
				maxWidth="md"
				sx={{
					boxShadow: 1,
					backgroundColor: "white",
					borderRadius: { xs: "1rem", md: "2rem" },
					p: "4rem",
					pl: "2rem",
				}}
			>
				<Box sx={{ width: "100%" }}>
					<Typography
						color="initial"
						mb="1rem"
						align="center"
						sx={{
							fontSize: {
								xs: "1.5rem",
								sm: "1.3rem",
								md: "1.3rem",
								lg: "2rem",
								xl: "2rem",
							},
						}}
					>
						INGRESE EL FOLIO DE SU BOLETA ELECTRÓNICA
					</Typography>
                    <Formik
						initialValues={{
							folio: "",
						}}
						validationSchema={validationSchema}
						onSubmit={(values, {resetForm}) => {
							onSubmit(values);
							resetForm();
						}}
					>
						{({ values, handleSubmit, errors, touched, handleChange }) => (
							<Form onSubmit={handleSubmit}>

								<TextField
									name="folio"
									value={values.folio}
									onChange={handleChange}
									fullWidth
									focused
									placeholder="Ejemplo: ELECTORAL-000..."
									variant="outlined"
									label="Ingresa tu folio a verificar..."
									type="text"
									error={touched.folio && Boolean(errors.folio) ? errors.folio : error}
									// helperText={touched.folio && errors.folio}
									helperText={touched.folio && errors.folio ? errors.folio : error}
								></TextField>
										{/* {error && (
										<Box ml={2} mt={1} sx={{ fontSize: "12px", color: "#791010" }}>
											{error}
										</Box>
										)} */}
								<Box 
									sx={{ display: 'flex', 
										flexDirection: {
												xs: "column",
												sm: "row",
												md: "row",
												lg: "row",
												xl: "row",
											}, 
										pt: 2 }}
									>
								<Button
									onClick={onCancel}
									disabled={status === "checking" ? true : false}
									startIcon={<ReplyIcon size="large" fontSize="inherit"/>}
									color="inherit"
									sx={{ mr: 1,
										fontSize: {
											xl: "1rem",
											lg: "1rem",
											sm: "1rem",
											xs: "1rem",
										}, }}
									>
									Regresar
								</Button>
								<Box sx={{ flex: '1 1 auto' }} 
									marginBottom={{xs: "1rem"}}/>
									<Button 
									disabled={status === "checking" ? true : false}
									startIcon={
										status === "checking" ? (
											<CircularProgress color="base" />
										) : (
											""
										)
									}
									type="submit"
									endIcon={<SendIcon size="large" fontSize="inherit"/>}
									sx={{
										backgroundColor: "#511079",
										borderRadius: "10px 10px 10px 10px",
										color: "#fff",
										fontSize: {
											xl: "1rem",
											lg: "1rem",
											sm: "1rem",
											xs: "1rem",
										},
										textAlign: "center",
										width: {
											xs: "100%",
											sm: "70%",
											md: "50%",
											lg: "40%",
											xl: "40%",
										},
										"&:hover": {
											background: "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
											color: "#FFFFFF",
											boxShadow: "9px 10px 4px rgba(0, 0, 0, 0.37)",
											transform: "translate(-3px, -3px)",
											transition: "all 0.5s ease",
										},
									}}>
									verificar folio
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</Box>
			</Container>
		</Box>
	);
};
