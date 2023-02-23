
import { PhotoCamera } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	Modal,
	OutlinedInput,
	Typography,
	useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onVerificarCredencial } from "../../store/votante/votanteThunks";

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

export const ModalVerificarCuenta = ({
	statusModalVerificar,
	handleCloseModalVerificar,
	imagenes,
	setImagenes,
}) => {
	const { statusPeticion, verificado, errorMessage } = useSelector((state) => state.votante);
	const { username } = useSelector((state) => state.auth);
	const [isSubmitted, setisSubmitted] = useState(false);
	const dispatch = useDispatch();

	// console.log("Verificado", verificado);

	const handleVerificarCredencial = () => {
		setisSubmitted(true);
		dispatch(
			onVerificarCredencial({
				curp: username,
				credFrontalCrop: imagenes.credFrontalCrop,
				credTraseraCrop: imagenes.credTraseraCrop,
				selfieCrop: imagenes.selfieCrop,
			})
		);
	};
	const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));
  const smsize = useMediaQuery(theme.breakpoints.only("sm"));
  const mdsize = useMediaQuery(theme.breakpoints.only("md"));
  const lgsize = useMediaQuery(theme.breakpoints.only("lg"));
  const xlsize = useMediaQuery(theme.breakpoints.only("xl"));
	let img2= "https://media.discordapp.net/attachments/825115444800258088/1078083538785669180/image.png?width=528&height=480";
	let img1= "https://media.discordapp.net/attachments/825115444800258088/1078083844412026881/imageMostrar01.png";
	let img3= "https://media.discordapp.net/attachments/825115444800258088/1078084391907106846/image.png?width=510&height=480";

	return (
		<Modal
			open={verificado ? false : statusModalVerificar}
			onClose={handleCloseModalVerificar}
			sx={{ marginX: "1rem", zIndex: 9999, overflow: "auto" }}
		>
			<Container maxWidth="lg" sx={style}>
				<Box
					display="flex"
					flexDirection="column"
					sx={{
					  p: { xs: "0.5rem", md: "2rem" },
					  maxHeight: "80vh",
					  overflow: "auto"
					}}
				>
					<Typography
						variant="h5"
						color="#323232"
						display="flex"
						justifyContent="center"
						align="justify"
						mb="2rem"
					>
						Verificar mi cuenta
					</Typography>
					<Typography
						variant="body1"
						color="#323232"
						display="flex"
						justifyContent="center"
						align="justify"
						mb="1rem"	
					>
						Para garantizar la seguridad de tu cuenta y confirmar que eres su dueño legítimo, necesitamos que completes un proceso de verificación. 
						Para hacerlo, por favor sube tres fotos: una de la parte frontal de tu credencial, otra de la parte trasera y una foto de ti mismo. 
						Una vez que hayamos recibido y revisado tus fotos, podrás disfrutar de todos los beneficios de tu cuenta. 
						Gracias por tu colaboración en este proceso de seguridad.
					</Typography>
					<Typography
                        sx={{ fontSize: "15px", opacity: 0.8 }}
                        variant="subtitle2"
                        textAlign="left"
						color="red" // Utiliza el color "pink" en lugar de "red"

											  >
                        ALGUNAS RECOMENDACIONES QUE TE HACEMOS PARA UN REGISTRO EXITOSO SON:
                      </Typography>
					  <Typography
                        sx={{ fontSize: "15px", opacity: 0.8 }}
                        variant="subtitle2"
                        textAlign="left"
						color="red" // Utiliza el color "pink" en lugar de "red"

                      >
                        1.- TOMA LA FOTO EN UN LUGAR CON BUENA LUZ Y SIN REFLEJOS
                      </Typography>
					  <Typography
                        sx={{ fontSize: "15px", opacity: 0.8 }}
                        variant="subtitle2"
                        textAlign="left"
						color="red" // Utiliza el color "pink" en lugar de "red"

                      >
                        2.- FONDO DE UN COLOR DIFERENTE AL BLANCO
                      </Typography>
					  <Typography
                        sx={{ fontSize: "15px", opacity: 0.8 }}
                        variant="subtitle2"
                        textAlign="left"
						color="red" // Utiliza el color "pink" en lugar de "red"
                      >
                        3.- DALE UN MARGEN A LAS FOTOGRAFIAS AL MOMENTO DE TOMARLAS, COMO SE MUESTRA EN LA ILUSTRACIÓN SIGUIENTE
                      </Typography>
					  <br/>
					<Typography
                        sx={{ fontSize: "15px", fontWeight: "bold" }}
                        variant="subtitle2"
                        textAlign="center"
                        color="primary"
                      >
                        PASO 1.- ES NECESARIO UNA FOTO DE TU CREDENCIAL DE LA PARTE FRONTAL
                      </Typography>  
					  {xssize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						<a><img width="100%" height="100%" src={img1} alt="Logo coalición"/></a>
					  </Box>					  
      					)}
					  {smsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="70%" height="70%" src={img1} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {mdsize && (
												<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
											  >
						  <a><img width="75%" height="75%" src={img1} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {lgsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="80%" height="80%" src={img1} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {xlsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="80%" height="80%" src={img1} alt="Logo coalición"/></a>
						  </Box>
      					)}
						<Divider/>
					<Typography
					mt="1rem"
                        sx={{ fontSize: "15px", fontWeight: "bold" }}
                        variant="subtitle2"
                        textAlign="center"
                        color="primary"
						>
						  PASO 2.- ES NECESARIO UNA FOTO DE TU CREDENCIAL DE LA PARTE TRASERA 
                      </Typography>
					  {xssize && (
												<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
											  >
						  <a><img width="100%" height="100%" src={img2} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {smsize && (
												<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
											  >
						  <a><img width="70%" height="70%" src={img2} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {mdsize && (
												<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
											  >
						  <a><img width="75%" height="75%" src={img2} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {lgsize && (
												<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
											  >
						  <a><img width="80%" height="80%" src={img2} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {xlsize && (
												<Box
												display="flex"
												justifyContent="center"
												alignItems="center"
											  >
						  <a><img width="80%" height="80%" src={img2} alt="Logo coalición"/></a>
						  </Box>
      					)}
												<Divider/>
					<Typography
					mt="1rem"
                        sx={{ fontSize: "15px", fontWeight: "bold" }}
                        variant="subtitle2"
                        textAlign="center"
                        color="primary"
						>
						PASO 3.- ES NECESARIO UNA FOTO DE TI MISMO
                      </Typography>
					  {xssize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="100%" height="100%" src={img3} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {smsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="70%" height="70%" src={img3} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {mdsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="75%" height="75%" src={img3} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {lgsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="80%" height="8%" src={img3} alt="Logo coalición"/></a>
						  </Box>
      					)}
					  {xlsize && (
						<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
					  >
						  <a><img width="80%" height="80%" src={img3} alt="Logo coalición"/></a>
						  </Box>
      					)}
						<Divider/>
					<Box
						mt="1rem"
						display="flex"
						alignItems="center"
						sx={{ width: "100%" }}
						flexDirection="column"
					>
						<FormControl fullWidth sx={{ m: 1 }} size="small">
							<InputLabel htmlFor="credFrontal">
								Foto de la parte delantera de tu credencial
							</InputLabel>
							<OutlinedInput
								size="small"
								id="credFrontal"
								label="Foto de la parte delantera de tu credencial"
								disabled
								value={
									imagenes?.credFrontal?.name ||
									"Foto de la parte delantera de tu credencial"
								}
								endAdornment={
									<IconButton color="primary" component="label" size="medium">
										<input
											hidden
											accept="image/png,image/jpg,image/jpeg"
											type="file"
											value=""
											onChange={(e) =>
												setImagenes((i) => {
													return {
														...i,
														credFrontal: e.target.files[0] || {
															name: "",
														},
														current: !e.target.files[0]
															? ""
															: "credFrontal",
													};
												})
											}
										/>
										<PhotoCamera fontSize="" />
									</IconButton>
								}
							/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }} size="small">
							<InputLabel htmlFor="credTrasera">
								Foto de la parte trasera de tu credencial
							</InputLabel>
							<OutlinedInput
								id="credTrasera"
								label="Foto de la parte trasera de tu credencial"
								value={
									imagenes?.credTrasera?.name ||
									"Foto de la parte trasera de tu credencial"
								}
								disabled
								endAdornment={
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="label"
										size="medium"
									>
										<input
											hidden
											accept="image/png,image/jpg,image/jpeg"
											type="file"
											value=""
											onChange={(e) =>
												setImagenes((i) => {
													return {
														...i,
														credTrasera: e.target.files[0] || {
															name: "",
														},
														current: !e.target.files[0]
															? ""
															: "credTrasera",
													};
												})
											}
										/>
										<PhotoCamera fontSize="" />
									</IconButton>
								}
							/>
						</FormControl>
						<FormControl fullWidth sx={{ m: 1 }} size="small">
							<InputLabel htmlFor="selfie">Selfie tuya</InputLabel>
							<OutlinedInput
								id="selfie"
								label="Selfie tuya"
								value={imagenes?.selfie?.name || "Selfie tuya"}
								disabled
								endAdornment={
									<IconButton
										color="primary"
										aria-label="upload picture"
										component="label"
										size="medium"
									>
										<input
											hidden
											accept="image/png,image/jpg,image/jpeg"
											type="file"
											value=""
											onChange={(e) =>
												setImagenes((i) => {
													return {
														...i,
														selfie: e.target.files[0] || {
															name: "",
														},
														current: !e.target.files[0] ? "" : "selfie",
													};
												})
											}
										/>
										<PhotoCamera fontSize="" />
									</IconButton>
								}
							/>
						</FormControl>
					</Box>
					{statusPeticion === "ok" && isSubmitted && !verificado ? (
						<Box pt={2}>
							<Alert severity="error">
								Tu foto de credencial de lector no coincide con tu selfie. Intenta
								tomar fotos más parecidas y con buena iluminación y vuelve a
								intentarlo.
							</Alert>
						</Box>
					) : (
						<></>
					)}

					{statusPeticion === "fail" ? (
						<Box pt={2}>
							<Alert severity="error">{errorMessage}</Alert>
						</Box>
					) : (
						<></>
					)}

					{/* <Box
						// height="10%"
						sx={{
							display: "flex",
							flexDirection: "row",
							pt: 4,
							width: "100%",
						}}
					> */}
					<Grid
						container
						direction={{ xs: "column-reverse", md: "row" }}
						pt={{ xs: "1rem", md: "2rem" }}
					>
						<Grid item xs={12} md={5}>
							<Button
								color="error"
								variant="outlined"
								onClick={handleCloseModalVerificar}
								fullWidth
							>
								Regresar
							</Button>
						</Grid>

						<Grid item xs={12} md={2}></Grid>

						{/* <Box sx={{ flex: "1 1 auto" }} /> */}

						<Grid item xs={12} md={5} pb={{ xs: "2rem", md: "0" }}>
							<Button
								// sx={{
								// 	"&.Mui-disabled": {
								// 		color: "#f8f7f3 !important",
								// 		border: "1px solid #f8f7f3 !important",
								// 	},
								// }}
								// color="baseButton"
								variant="contained"
								// type="submit"
								fullWidth
								onClick={handleVerificarCredencial}
								disabled={
									imagenes.credFrontalCrop === null ||
									imagenes.credTraseraCrop === null ||
									imagenes.selfieCrop === null ||
									imagenes.credFrontal.name === "" ||
									imagenes.credTrasera.name === "" ||
									imagenes.selfie.name === "" ||
									statusPeticion === "checking"
								}
								// endIcon={<SendIcon />}
								endIcon={
									statusPeticion === "checking" ? (
										<CircularProgress />
									) : (
										<SendIcon />
									)
								}
							>
								{statusPeticion === "checking"
									? "Verificando"
									: "Verificar credencial"}
							</Button>
						</Grid>
						{/* </Box> */}
					</Grid>
				</Box>
			</Container>
		</Modal>
	);
};
